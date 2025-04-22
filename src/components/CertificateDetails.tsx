import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Certificate {
  certificateId: string;
  templateId: string;
  data: Record<string, any>;
}

const CertificateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCertificate = async () => {
      const token = localStorage.getItem('authToken');

      // Check if the token is valid
      if (!token || token.split('.').length !== 3) {
        setError('Invalid token. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:2000/issuer/certificates/${id}`, {
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
  }, [id]);

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
      <p>Template ID: {certificate.templateId}</p>
      <p>Data: {JSON.stringify(certificate.data)}</p>
    </div>
  );
};

export default CertificateDetails; 