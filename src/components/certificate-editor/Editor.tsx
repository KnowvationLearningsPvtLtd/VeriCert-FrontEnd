import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as fabric from 'fabric';
import jsPDF from 'jspdf';

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #f5f5f5;
  padding: 20px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CanvasContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToolButton = styled.button`
  width: 100%;
  background-color: #5C4033;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ColorPicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;

const ColorLabel = styled.label`
  font-size: 14px;
  color: #333;
`;

const ColorInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FontSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;

const FontLabel = styled.label`
  font-size: 14px;
  color: #333;
`;

const FontSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
`;

const FontOption = styled.option<{ fontFamily: string }>`
  font-family: ${props => props.fontFamily};
  padding: 5px;
`;

const FontSizeControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;

const FontSizeLabel = styled.label`
  font-size: 14px;
  color: #333;
`;

const FontSizeSlider = styled.input`
  width: 100%;
  height: 10px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #04AA6D;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-track {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 5px;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #04AA6D;
    cursor: pointer;
    border-radius: 50%;
  }

  &:focus {
    outline: none;
  }
`;

const Editor: React.FC = () => {
  const { templateId } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const templateRef = useRef<fabric.Image | null>(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(20);

  // List of formal and stylish fonts
  const fontOptions = [
    { name: 'Arial', value: 'Arial' },
    { name: 'Times New Roman', value: 'Times New Roman' },
    { name: 'Georgia', value: 'Georgia' },
    { name: 'Garamond', value: 'Garamond' },
    { name: 'Palatino', value: 'Palatino' },
    { name: 'Baskerville', value: 'Baskerville' },
    { name: 'Crimson Text', value: 'Crimson Text' },
    { name: 'Playfair Display', value: 'Playfair Display' },
    { name: 'Lora', value: 'Lora' },
    { name: 'Merriweather', value: 'Merriweather' }
  ];

  // Initialize canvas
  useEffect(() => {
    // Clean up previous canvas
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    // Create new canvas
    if (canvasRef.current) {
      try {
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
          width: 800,
          height: 600,
          backgroundColor: '#ffffff',
        });
        fabricCanvasRef.current = fabricCanvas;

        // Validate template ID
        const templateIdNum = parseInt(templateId || '0', 10);
        if (isNaN(templateIdNum) || templateIdNum < 1 || templateIdNum > 10) {
          console.error('Invalid template ID:', templateId);
          // Set a default template ID if the provided one is invalid
          const defaultTemplateId = 1;
          console.log(`Using default template ID: ${defaultTemplateId}`);
          
          // Load template image with default ID
          const templateUrl = `/templates/template${defaultTemplateId}.png`;
          console.log('Attempting to load template:', templateUrl);
          
          // Create a new image element
          const imgElement = document.createElement('img');
          imgElement.crossOrigin = 'anonymous';
          imgElement.src = templateUrl;
          
          imgElement.onload = () => {
            console.log('Image loaded successfully, creating fabric image');
            // Create a fabric image from the loaded image element
            const fabricImg = new fabric.Image(imgElement, {
              scaleX: 800 / imgElement.width,
              scaleY: 800 / imgElement.width,
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
            
            // Store the template reference
            templateRef.current = fabricImg;
            
            // Add the template
            fabricCanvas.add(fabricImg);
            fabricCanvas.renderAll();
            
            console.log('Template added and locked');
          };
          
          imgElement.onerror = (error) => {
            console.error('Error loading template image:', error);
            // Try without crossOrigin as fallback
            imgElement.crossOrigin = '';
            imgElement.src = templateUrl;
          };
          
          return;
        }

        // Load template image
        const templateUrl = `/templates/template${templateIdNum}.png`;
        console.log('Attempting to load template:', templateUrl);
        
        // Create a new image element
        const imgElement = document.createElement('img');
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = templateUrl;
        
        imgElement.onload = () => {
          console.log('Image loaded successfully, creating fabric image');
          // Create a fabric image from the loaded image element
          const fabricImg = new fabric.Image(imgElement, {
            scaleX: 800 / imgElement.width,
            scaleY: 800 / imgElement.width,
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
          
          // Store the template reference
          templateRef.current = fabricImg;
          
          // Add the template
          fabricCanvas.add(fabricImg);
          fabricCanvas.renderAll();
          
          console.log('Template added and locked');
        };
        
        imgElement.onerror = (error) => {
          console.error('Error loading template image:', error);
          // Try without crossOrigin as fallback
          imgElement.crossOrigin = '';
          imgElement.src = templateUrl;
        };
      } catch (error) {
        console.error('Error initializing canvas:', error);
      }
    }

    // Cleanup function
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [templateId]); // Only re-run when templateId changes

  const addText = () => {
    if (fabricCanvasRef.current) {
      const text = new fabric.IText('Double click to edit', {
        left: 100,
        top: 100,
        fontFamily: selectedFont,
        fontSize: fontSize,
        fill: selectedColor,
        selectable: true,
        evented: true,
        lockMovementX: false,
        lockMovementY: false,
        lockRotation: false,
        lockScalingX: false,
        lockScalingY: false,
        hasBorders: true,
        hasControls: true,
        width: 600, // Set width to 600 pixels
        textAlign: 'left',
        splitByGrapheme: true, // Better text wrapping for different languages
        editable: true, // Ensure text is editable
      });
      fabricCanvasRef.current.add(text);
      fabricCanvasRef.current.setActiveObject(text);
      fabricCanvasRef.current.renderAll();
    }
  };

  const addLogo = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && fabricCanvasRef.current) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgElement = document.createElement('img');
          imgElement.src = event.target?.result as string;
          
          imgElement.onload = () => {
            console.log('Image loaded successfully, creating fabric image');
            // Create a fabric image from the loaded image element
            const fabricImg = new fabric.Image(imgElement, {
              scaleX: 200 / imgElement.width,
              scaleY: 200 / imgElement.width,
              selectable: true,
              evented: true,
              lockMovementX: false,
              lockMovementY: false,
              lockRotation: false,
              lockScalingX: false,
              lockScalingY: false,
              hasBorders: true,
              hasControls: true,
            });
            
            fabricCanvasRef.current?.add(fabricImg);
            fabricCanvasRef.current?.setActiveObject(fabricImg);
            fabricCanvasRef.current?.renderAll();
            console.log('Fabric image added to canvas');
          };
          
          imgElement.onerror = (error) => {
            console.error('Error loading image:', error);
          };
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addSignature = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && fabricCanvasRef.current) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgElement = document.createElement('img');
          imgElement.src = event.target?.result as string;
          
          imgElement.onload = () => {
            console.log('Image loaded successfully, creating fabric image');
            // Create a fabric image from the loaded image element
            const fabricImg = new fabric.Image(imgElement, {
              scaleX: 150 / imgElement.width,
              scaleY: 150 / imgElement.width,
              selectable: true,
              evented: true,
              lockMovementX: false,
              lockMovementY: false,
              lockRotation: false,
              lockScalingX: false,
              lockScalingY: false,
              hasBorders: true,
              hasControls: true,
            });
            
            fabricCanvasRef.current?.add(fabricImg);
            fabricCanvasRef.current?.setActiveObject(fabricImg);
            fabricCanvasRef.current?.renderAll();
            console.log('Fabric image added to canvas');
          };
          
          imgElement.onerror = (error) => {
            console.error('Error loading image:', error);
          };
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const deleteSelected = () => {
    if (fabricCanvasRef.current) {
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject && activeObject !== templateRef.current) {
        fabricCanvasRef.current.remove(activeObject);
        fabricCanvasRef.current.renderAll();
      }
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    if (fabricCanvasRef.current) {
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fill', newColor);
        fabricCanvasRef.current.renderAll();
      }
    }
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = e.target.value;
    setSelectedFont(newFont);
    if (fabricCanvasRef.current) {
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fontFamily', newFont);
        fabricCanvasRef.current.renderAll();
      }
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    if (fabricCanvasRef.current) {
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fontSize', newSize);
        fabricCanvasRef.current.renderAll();
      }
    }
  };

  const downloadPDF = async () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        multiplier: 1,
      });
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [800, 600],
      });
      
      pdf.addImage(dataURL, 'PNG', 0, 0, 800, 600);
      pdf.save('certificate.pdf');
    }
  };

  return (
    <EditorContainer>
      <Sidebar>
        <ToolButton onClick={addText}>Add Text</ToolButton>
        <ToolButton onClick={addLogo}>Upload Logo</ToolButton>
        <ToolButton onClick={addSignature}>Upload Signature</ToolButton>
        <ToolButton onClick={deleteSelected}>Delete Selected</ToolButton>
        
        <ColorPicker>
          <ColorLabel>Text Color</ColorLabel>
          <ColorInput
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
          />
        </ColorPicker>
        
        <FontSelector>
          <FontLabel>Font Family</FontLabel>
          <FontSelect value={selectedFont} onChange={handleFontChange}>
            {fontOptions.map((font) => (
              <FontOption key={font.value} value={font.value} fontFamily={font.value}>
                {font.name}
              </FontOption>
            ))}
          </FontSelect>
        </FontSelector>

        <FontSizeControl>
          <FontSizeLabel>Font Size: {fontSize}px</FontSizeLabel>
          <FontSizeSlider
            type="range"
            min="8"
            max="72"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
        </FontSizeControl>
        
        <ToolButton onClick={downloadPDF}>Download PDF</ToolButton>
      </Sidebar>
      <CanvasContainer>
        <canvas ref={canvasRef} />
      </CanvasContainer>
    </EditorContainer>
  );
};

export default Editor; 