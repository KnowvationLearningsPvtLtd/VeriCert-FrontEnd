import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as fabric from 'fabric';

interface Certificate {
  certificateId: string;
  templateId: string;
  data: Record<string, any>;
}

const CertificateDetails: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      const token = localStorage.getItem('authToken');

      // Check if the token is valid
      if (!token || token.split('.').length !== 3) {
        setError('Invalid token. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:2000/issuer/certificates/${certificateId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCertificate(response.data.certificate);
      } catch (err) {
        setError('Failed to fetch certificate. Please try again later.');
        console.error('Error fetching certificate:', err);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  useEffect(() => {
    let fabricCanvas: fabric.Canvas | undefined;

    if (certificate && canvasRef.current) {
      fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
      });

      const templateUrl = `/templates/template${certificate.data.templateId}.png`;
      const imgElement = document.createElement('img');
      imgElement.crossOrigin = 'anonymous';
      imgElement.src = templateUrl;

      imgElement.onload = () => {
        const fabricImg = new fabric.Image(imgElement, {
          scaleX: 800 / imgElement.width,
          scaleY: 600 / imgElement.height,
          selectable: false,
          evented: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingX: true,
          lockScalingY: true,
          hasBorders: false,
          hasControls: false,
        });

        if (fabricCanvas) {
          fabricCanvas.add(fabricImg);
          fabricCanvas.renderAll();

          // Add certificate data as text
          Object.entries(certificate.data.data).forEach(([key, value], index) => {
            const text = new fabric.Text(`${key}: ${value}`, {
              left: 100,
              top: 150 + index * 30,
              fontSize: 20,
              fill: '#000',
              selectable: false,
              evented: false,
            });
            fabricCanvas.add(text);
          });
        }

        // Add a console log to verify the template image URL
        console.log('Template URL:', templateUrl);
      };

      imgElement.onerror = (error) => {
        console.error('Error loading template image:', error);
      };
    }

    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    };
  }, [certificate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!certificate) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Certificate Details</h1>
      <p>ID: {certificate.certificateId}</p>
      <p>Template ID: {certificate.data.templateId}</p>
      <p>Data: {JSON.stringify(certificate.data)}</p>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CertificateDetails; 