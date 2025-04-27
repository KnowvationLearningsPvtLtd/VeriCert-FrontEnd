import PageWrapper from "../features/dashboard/components/PageWrapper";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as fabric from 'fabric';

interface Certificate {
  certificateId: string;
  templateId: string;
  data: Record<string, any>;
}

const IssuerCertificates = () => {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [inputCertificateId, setInputCertificateId] = useState('');

  useEffect(() => {
    if (certificate && canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
      });

      const templateUrl = `/templates/template${certificate.templateId}.png`;
      console.log('Template URL:', templateUrl);
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

        fabricCanvas.add(fabricImg);

        // Add certificate data as text
        Object.entries(certificate.data).forEach(([key, value], index) => {
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

        fabricCanvas.renderAll();
      };

      imgElement.onerror = (error) => {
        console.error('Error loading template image:', error);
      };
    }
  }, [certificate]);

  const handleViewCertificate = async () => {
    const fetchCertificate = async () => {
      const token = localStorage.getItem('authToken');

      if (!token || token.split('.').length !== 3) {
        setError('Invalid token. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:2000/issuer/certificates/${inputCertificateId}`, {
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

    await fetchCertificate();
    window.location.href = `/issuer/certificates/${inputCertificateId}`;
  };

  return (
    <PageWrapper
      title="Issuer Certificates"
      description="Manage certificates issued by you."
    >
      <div className="mb-8 bg-[#f5e7dd] p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-brown-900">Issued Certificates</h2>
          <Link
            to="/issuer/certificate-editor"
            className="px-5 py-2 bg-[#5C4033] text-[#f5e7dd] font-semibold rounded-lg hover:bg-[#4E3227] hover:text-white transition-all duration-300 shadow-sm"
          >
            Create Certificate
          </Link>
        </div>
        <p className="text-brown-600">No certificates have been issued yet.</p>
        <div className="mt-4">
          <input
            type="text"
            value={inputCertificateId}
            onChange={(e) => setInputCertificateId(e.target.value)}
            placeholder="Enter Certificate ID"
            className="px-2 py-1 border rounded-lg mr-2"
          />
          <button
            onClick={handleViewCertificate}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            View Certificate
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </PageWrapper>
  );
};

export default IssuerCertificates;
