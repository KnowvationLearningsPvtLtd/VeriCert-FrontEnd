import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

interface Template {
  id: number;
  image: string;
}

// This would typically come from an API or database
const templates: Template[] = [
  {
    id: 1,
    image: '/templates/template1.png',
  },
  {
    id: 2,
    image: '/templates/template2.png',
  },
  {
    id: 3,
    image: '/templates/template3.png',
  },
  {
    id: 4,
    image: '/templates/template4.png',
  },
  {
    id: 5,
    image: '/templates/template5.png',
  },
  {
    id: 6,
    image: '/templates/template6.png',
  },
  {
    id: 7,
    image: '/templates/template7.png',
  },
  {
    id: 8,
    image: '/templates/template8.png',
  },
  {
    id: 9,
    image: '/templates/template9.png',
  },
];

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: number) => {
    navigate(`/issuer/certificate-editor/${templateId}`);
  };

  return (
    <Container>
      <Title>Select a Certificate Template</Title>
      <TemplateGrid>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <TemplateImage src={template.image} />
          </TemplateCard>
        ))}
      </TemplateGrid>
    </Container>
  );
};

export default TemplateSelection; 