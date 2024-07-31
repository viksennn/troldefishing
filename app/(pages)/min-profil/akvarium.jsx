"use client"

import React, { useRef, useEffect, useState } from 'react';

// Helper function to create a random number within a range
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

// Helper function to create a fish object
const createFish = (canvasWidth, canvasHeight) => ({
  x: getRandomNumber(0, canvasWidth),
  y: getRandomNumber(0, canvasHeight),
  dx: getRandomNumber(-2, 2),
  dy: getRandomNumber(-2, 2),
  size: getRandomNumber(40, 60), // Adjust size to fit image
  rotation: getRandomNumber(0, Math.PI * 2), // rotation in radians
  type: getFishType() // Add type to each fish
});

// Helper function to get fish type
const getFishType = () => {
  const fishTypes = [
    "Regnbue Ørred", "Gedde", "Laks", "Aborre", "Hornfisk",
    "Makrel", "Skalle", "Guld Ørred", "Rødspætte", "Skrubbe",
    "Bækørred", "Comber"
  ];
  return fishTypes[Math.floor(Math.random() * fishTypes.length)];
};

// Helper function to get image URL based on fish type
const getFishImage = (fishType) => {
  switch (fishType) {
    case "Regnbue Ørred": return "/ach/rainbow-trout.png";
    case "Gedde": return "/ach/pike.png";
    case "Laks": return "/ach/salmon.png";
    case "Aborre": return "/ach/aborre.png";
    case "Hornfisk": return "/ach/hornfisk.png";
    case "Makrel": return "/ach/makrel.png";
    case "Skalle": return "/ach/skalle.png";
    case "Guld Ørred": return "/ach/golden-trout.png";
    case "Rødspætte": return "/ach/fladfisk.png";
    case "Skrubbe": return "/ach/fladfisk.png";
    case "Bækørred": return "/ach/browntrout.png";
    case "Comber": return "/ach/comber.png";
    default: return "/ach/defaultfisk.png";
  }
};

export const Aquarium = () => {
  const canvasRef = useRef(null);
  const fishArray = useRef([]);
  const [fishImages, setFishImages] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Preload images
    const preloadImages = async () => {
      const imagePromises = [
        "Regnbue Ørred", "Gedde", "Laks", "Aborre", "Hornfisk",
        "Makrel", "Skalle", "Guld Ørred", "Rødspætte", "Skrubbe",
        "Bækørred", "Comber"
      ].map(fishType => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = getFishImage(fishType);
          img.onload = () => {
            setFishImages(prevImages => ({ ...prevImages, [fishType]: img }));
            resolve();
          };
        });
      });
      await Promise.all(imagePromises);
      startAnimation();
    };

    // Initialize fish
    fishArray.current = Array.from({ length: 10 }, () => createFish(width, height));
    preloadImages();

    const startAnimation = () => {
      const drawFish = () => {
        ctx.clearRect(0, 0, width, height);
        
        fishArray.current.forEach(fish => {
          const img = fishImages[fish.type];
          if (img) {
            ctx.save();
            ctx.translate(fish.x, fish.y); // Move to fish position
            ctx.rotate(fish.rotation); // Rotate the fish
            
            // Draw the fish image
            ctx.drawImage(img, -fish.size / 2, -fish.size / 2, fish.size, fish.size);
            
            ctx.restore();

            // Move fish
            fish.x += fish.dx;
            fish.y += fish.dy;
            
            // Update rotation based on direction
            fish.rotation = Math.atan2(fish.dy, fish.dx);
            
            // Bounce off edges
            if (fish.x < 0 || fish.x > width) fish.dx *= -1;
            if (fish.y < 0 || fish.y > height) fish.dy *= -1;
          }
        });

        requestAnimationFrame(drawFish);
      };

      drawFish();
    };

  }, [fishImages]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '2px solid black' }}
    />
  );
};