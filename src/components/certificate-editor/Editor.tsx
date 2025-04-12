import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const CanvasContainer = styled.div`
  border: 1px solid #ccc;
  margin: 0 auto;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Editor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
      });
      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

  const addText = () => {
    if (canvas) {
      const text = new fabric.IText('Edit this text', {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fontSize: 20,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
    }
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (canvas && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          fabric.Image.fromURL(event.target.result as string, (img) => {
            img.scaleToWidth(200);
            canvas.add(img);
            canvas.setActiveObject(img);
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const exportPDF = async () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width!, canvas.height!],
      });

      pdf.addImage(dataURL, 'PNG', 0, 0, canvas.width!, canvas.height!);
      pdf.save('certificate.pdf');
    }
  };

  return (
    <EditorContainer>
      <CanvasContainer>
        <canvas ref={canvasRef} />
      </CanvasContainer>
      <ControlsContainer>
        <Button onClick={addText}>Add Text</Button>
        <input
          type="file"
          accept="image/*"
          onChange={addImage}
          style={{ display: 'none' }}
          id="imageInput"
        />
        <Button as="label" htmlFor="imageInput">
          Add Image
        </Button>
        <Button onClick={exportPDF}>Export PDF</Button>
      </ControlsContainer>
    </EditorContainer>
  );
};

export default Editor; 