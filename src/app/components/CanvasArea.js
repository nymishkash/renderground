"use client";

import rendergroundAPI from "@/lib/apiInstance";
import { useState, useEffect } from "react";

export default function CanvasArea({
  canvasId,
  isLoading,
  showGrid,
  gridSize,
  previewKey,
  onShapeCreate,
  selectedTool,
}) {
  const [currentImage, setCurrentImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);

  useEffect(() => {
    if (!canvasId) return;

    const newImage = new Image();
    newImage.onload = () => {
      setCurrentImage(newImage.src);
    };
    newImage.src = `${
      rendergroundAPI.defaults.baseURL
    }/canvas/${canvasId}/preview?v=${Date.now()}`;
  }, [canvasId, previewKey]);

  const handleMouseDown = (e) => {
    if (selectedTool === "text") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const text = prompt("Enter text:");
      if (text?.trim()) {
        onShapeCreate({
          type: "text",
          x,
          y,
          text: text.trim(),
        });
      }
      return;
    }

    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPoint({ x, y });
    setCurrentPoint({ x, y });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isDragging || selectedTool === "text") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPoint({ x, y });
  };

  const getDragStyles = () => {
    if (!isDragging || !startPoint || !currentPoint) return null;

    if (selectedTool === "circle") {
      const dx = currentPoint.x - startPoint.x;
      const dy = currentPoint.y - startPoint.y;
      const diameter = Math.sqrt(dx * dx + dy * dy) * 2;

      return {
        left: `${startPoint.x}px`,
        top: `${startPoint.y}px`,
        width: `${diameter}px`,
        height: `${diameter}px`,
        position: "absolute",
        border: "2px dashed #000",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
      };
    }

    const left = Math.min(startPoint.x, currentPoint.x);
    const top = Math.min(startPoint.y, currentPoint.y);
    const width = Math.abs(currentPoint.x - startPoint.x);
    const height = Math.abs(currentPoint.y - startPoint.y);

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      position: "absolute",
      border: "2px dashed #000",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      pointerEvents: "none",
    };
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    if (!isDragging || selectedTool === "text") return;

    if (startPoint && currentPoint) {
      if (selectedTool === "circle") {
        const dx = currentPoint.x - startPoint.x;
        const dy = currentPoint.y - startPoint.y;
        const radius = Math.sqrt(dx * dx + dy * dy);

        if (radius > 5) {
          onShapeCreate({
            x: startPoint.x,
            y: startPoint.y,
            width: radius * 2,
          });
        }
      } else {
        const width = Math.abs(currentPoint.x - startPoint.x);
        const height = Math.abs(currentPoint.y - startPoint.y);

        if (width > 5 || height > 5) {
          const x = Math.min(startPoint.x, currentPoint.x);
          const y = Math.min(startPoint.y, currentPoint.y);
          onShapeCreate({ x, y, width, height });
        }
      }
    }

    setIsDragging(false);
    setStartPoint(null);
    setCurrentPoint(null);
  };

  const getCursorStyle = () => {
    switch (selectedTool) {
      case "text":
        return "text";
      case "circle":
      case "rectangle":
        return "crosshair";
      default:
        return "default";
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg w-full h-full flex items-center justify-center">
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative bg-white border-2 border-gray-200 rounded-lg"
        style={{
          width: "800px",
          height: "600px",
          cursor: getCursorStyle(),
          WebkitUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
      >
        {currentImage && (
          <img
            src={currentImage}
            alt="canvas"
            className="w-full h-full pointer-events-none"
            draggable="false"
          />
        )}

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

        {isDragging && selectedTool !== "text" && (
          <div style={getDragStyles()} />
        )}

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
