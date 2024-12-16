"use client";

import { useState, useEffect } from "react";
import { Square, Circle, Type, Minus, Palette } from "lucide-react";

export default function CanvasBuilder() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [canvasId, setCanvasId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentColor, setCurrentColor] = useState("#FF0000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [previewKey, setPreviewKey] = useState(0);

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#000000",
    "#FFFFFF",
    "#808080",
  ];

  useEffect(() => {
    initializeCanvas();
  }, []);

  const initializeCanvas = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:6969/canvas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `canvas-${Date.now()}`,
          width: 800,
          height: 600,
          backgroundColor: "white",
          metadata: {
            createdBy: "CanvasBuilder",
            version: "1.0",
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to initialize canvas");
      const data = await response.json();
      setCanvasId(data.id);
    } catch (err) {
      setError("Failed to initialize canvas. Please try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const addShape = async (e) => {
    if (!selectedTool || !canvasId) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let shape;
    switch (selectedTool) {
      case "rectangle":
        shape = {
          type: "rectangle",
          properties: {
            x,
            y,
            width: 100,
            height: 50,
            color: currentColor,
            strokeColor: "#000000",
            strokeWidth,
            rounded: 5,
          },
        };
        break;
      case "circle":
        shape = {
          type: "circle",
          properties: {
            centerX: x,
            centerY: y,
            radius: 30,
            fillColor: currentColor,
            strokeColor: "#000000",
            strokeWidth,
          },
        };
        break;
      case "text": {
        const text = prompt("Enter text:");
        if (!text) return;

        const fontSize = Math.max(12, strokeWidth * 10);
        shape = {
          type: "text",
          properties: {
            x,
            y,
            text,
            textColor: currentColor,
            font: `${fontSize}px Arial`,
            align: "center",
            baseline: "middle",
            maxWidth: 400, // Add a maximum width to prevent text from going off canvas
          },
        };
        break;
      }
      case "line":
        shape = {
          type: "line",
          properties: {
            startX: x,
            startY: y,
            endX: x + 100,
            endY: y,
            lineColor: currentColor,
            lineWidth: strokeWidth,
          },
        };
        break;
      default:
        return;
    }

    try {
      const response = await fetch(
        `http://localhost:6969/canvas/${canvasId}/elements`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(shape),
        }
      );

      if (!response.ok) throw new Error("Failed to add shape");

      // Force preview refresh after adding shape
      setPreviewKey((prev) => prev + 1);
    } catch (err) {
      setError("Failed to add shape. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col gap-4">
          {/* Main Toolbar */}
          <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
            {/* Drawing Tools */}
            <div className="flex gap-2 p-2 bg-white rounded-md shadow-sm">
              <button
                onClick={() => setSelectedTool("rectangle")}
                className={`p-3 rounded-md transition-all ${
                  selectedTool === "rectangle"
                    ? "bg-blue-500 text-white shadow-inner"
                    : "hover:bg-gray-100"
                }`}
                title="Rectangle Tool"
              >
                <Square className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedTool("circle")}
                className={`p-3 rounded-md transition-all ${
                  selectedTool === "circle"
                    ? "bg-blue-500 text-white shadow-inner"
                    : "hover:bg-gray-100"
                }`}
                title="Circle Tool"
              >
                <Circle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedTool("text")}
                className={`p-3 rounded-md transition-all ${
                  selectedTool === "text"
                    ? "bg-blue-500 text-white shadow-inner"
                    : "hover:bg-gray-100"
                }`}
                title="Text Tool"
              >
                <Type className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedTool("line")}
                className={`p-3 rounded-md transition-all ${
                  selectedTool === "line"
                    ? "bg-blue-500 text-white shadow-inner"
                    : "hover:bg-gray-100"
                }`}
                title="Line Tool"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>

            {/* Color Picker */}
            <div className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm">
              <Palette className="w-5 h-5 text-gray-500" />
              <div className="flex flex-wrap gap-1 max-w-xs">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-6 h-6 rounded-md transition-transform ${
                      currentColor === color ? "scale-125 shadow-lg" : ""
                    }`}
                    style={{
                      backgroundColor: color,
                      border:
                        color === "#FFFFFF" ? "1px solid #E5E7EB" : "none",
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Width */}
            <div className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm">
              <span className="text-sm text-gray-600">Width:</span>
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-gray-600">{strokeWidth}px</span>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() =>
                  window.open(
                    `http://localhost:6969/canvas/${canvasId}/export/html`,
                    "_blank"
                  )
                }
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!canvasId || isLoading}
              >
                HTML
              </button>
              <button
                onClick={() =>
                  window.open(
                    `http://localhost:6969/canvas/${canvasId}/export/svg`,
                    "_blank"
                  )
                }
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!canvasId || isLoading}
              >
                SVG
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="relative bg-white rounded-lg shadow-lg">
            <div
              onClick={addShape}
              className="border-2 border-gray-200 rounded-lg cursor-crosshair bg-white relative overflow-hidden"
              style={{ width: 800, height: 600 }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div className="text-gray-600">Initializing canvas...</div>
                  </div>
                </div>
              )}
              {canvasId && !isLoading && (
                <img
                  key={previewKey} // Add key to force refresh
                  src={`http://localhost:6969/canvas/${canvasId}/preview`}
                  alt="canvas"
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
