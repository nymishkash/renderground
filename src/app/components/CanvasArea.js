"use client";

import { useState, useEffect } from "react";

export default function CanvasArea({
  canvasId,
  isLoading,
  onClick,
  showGrid,
  gridSize,
  previewKey,
}) {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (!canvasId) return;

    // Create a new image offscreen
    const newImage = new Image();

    newImage.onload = () => {
      // Only update the visible image once the new one is fully loaded
      setCurrentImage(newImage.src);
    };

    // Start loading the new image
    newImage.src = `http://localhost:6969/canvas/${canvasId}/preview?v=${Date.now()}`;
  }, [canvasId, previewKey]);

  return (
    <div className="relative bg-white rounded-lg shadow-lg w-full h-full flex items-center justify-center">
      <div
        onClick={onClick}
        className="relative bg-white border-2 border-gray-200 rounded-lg cursor-crosshair"
        style={{
          width: "800px",
          height: "600px",
        }}
      >
        {/* Current Canvas Image */}
        {currentImage && (
          <img src={currentImage} alt="canvas" className="w-full h-full" />
        )}

        {/* Grid Overlay */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: `${gridSize}px ${gridSize}px`,
            }}
          />
        )}

        {/* Initial Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-gray-600">Initializing canvas...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
