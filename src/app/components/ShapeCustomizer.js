"use client";

import { GridIcon } from "lucide-react";

export default function ShapeCustomizer({
  selectedTool,
  customWidth,
  setCustomWidth,
  customHeight,
  setCustomHeight,
  showGrid,
  setShowGrid,
  snapToGrid,
  setSnapToGrid,
  gridSize,
  setGridSize,
  fontControls,
}) {
  const renderShapeControls = () => {
    switch (selectedTool) {
      case "rectangle":
        return (
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(parseInt(e.target.value))}
                className="w-20 px-2 py-1 border rounded"
                min="1"
                placeholder="Width"
              />
              <span className="text-sm text-gray-600">W</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(parseInt(e.target.value))}
                className="w-20 px-2 py-1 border rounded"
                min="1"
                placeholder="Height"
              />
              <span className="text-sm text-gray-600">H</span>
            </div>
          </div>
        );

      case "circle":
        return (
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={customWidth}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setCustomWidth(value);
                setCustomHeight(value); // Keep circle proportional
              }}
              className="w-20 px-2 py-1 border rounded"
              min="1"
              placeholder="Diameter"
            />
            <span className="text-sm text-gray-600">Diameter</span>
          </div>
        );

      case "text":
        return (
          <div className="flex gap-2">
            <select
              value={fontControls.fontFamily}
              onChange={(e) => fontControls.setFontFamily(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
            <select
              value={fontControls.fontWeight}
              onChange={(e) => fontControls.setFontWeight(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
            <input
              type="number"
              value={fontControls.fontSize}
              onChange={(e) =>
                fontControls.setFontSize(parseInt(e.target.value))
              }
              className="w-16 px-2 py-1 border rounded"
              min="8"
              max="72"
              placeholder="Size"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Shape-specific controls */}
      {renderShapeControls()}

      {/* Grid Controls */}
      <div className="flex items-center gap-2">
        <GridIcon className="w-4 h-4 text-gray-500" />
        <div className="flex gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2 py-1 text-sm rounded ${
              showGrid ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Show Grid
          </button>
          <button
            onClick={() => setSnapToGrid(!snapToGrid)}
            className={`px-2 py-1 text-sm rounded ${
              snapToGrid
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Snap to Grid
          </button>
          <input
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value))}
            className="w-16 px-2 py-1 border rounded text-sm"
            min="5"
            max="100"
            step="5"
          />
        </div>
      </div>
    </div>
  );
}
