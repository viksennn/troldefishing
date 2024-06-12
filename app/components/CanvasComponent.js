"use client"

import React, { useRef, useEffect, useState } from 'react';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Define initial box positions using an object
  const initialBoxPositions = {
    boxGedde: { type: 'image', image: '/ach/pike.png', x: 100, y: 100, width: 100, height: 100, text: '' },
    boxAborre: { type: 'image', image: '/ach/aborre.png', x: 100, y: 300, width: 100, height: 100, text: '' },
    boxSkalle: { type: 'image', image: '/ach/skalle.png', x: 100, y: 500, width: 100, height: 100, text: '' },
  };
  const [boxes, setBoxes] = useState(initialBoxPositions);

  // Define connections between boxes
  const boxConnections = [
    { from: 'boxGedde', to: 'boxAborre', color: 'gray', width: 2 },
    { from: 'boxAborre', to: 'boxSkalle', color: 'gray', width: 2}, 
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const loadImage = async (imagePath) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = imagePath;
      });
    };

    const draw = async () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;

      if (context) {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw lines between boxes
        boxConnections.forEach(connection => {
          const fromBox = boxes[connection.from];
          const toBox = boxes[connection.to];

          context.strokeStyle = connection.color;
          context.lineWidth = connection.width;
          context.beginPath();
          context.moveTo(fromBox.x + fromBox.width / 2, fromBox.y + fromBox.height / 2);
          context.lineTo(toBox.x + toBox.width / 2, toBox.y + toBox.height / 2);
          context.stroke();
        });

        // Draw each box
        Object.values(boxes).forEach(async (box) => {
          if (box.type === 'image') {
            const img = await loadImage(box.image);
            context.drawImage(img, box.x, box.y, box.width, box.height);

            // Add text under the image
            context.fillStyle = 'black';
            context.font = '16px Arial';
            context.textAlign = 'center';
            context.fillText(box.text, box.x + box.width / 2, box.y + 100);
          }
        });
      }
    };

    draw();

    // Clean-up: remove event listeners or anything if needed
    return () => {
      // Clean-up logic if necessary
    };
  }, [boxes]);

  const handleMouseDown = (event) => {
    setDragging(true);
    setOffset({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      const deltaX = event.clientX - offset.x;
      const deltaY = event.clientY - offset.y;

      // Update all box positions
      const updatedBoxes = Object.keys(boxes).reduce((acc, key) => {
        acc[key] = { ...boxes[key], x: boxes[key].x + deltaX, y: boxes[key].y + deltaY };
        return acc;
      }, {});

      setBoxes(updatedBoxes);

      setOffset({
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', cursor: 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default CanvasComponent;
