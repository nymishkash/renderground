"use client";

import { Palette, Plus } from "lucide-react";

export default function ColorPicker({ currentColor, setCurrentColor }) {
  const colors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#800080", // Purple
    "#008000", // Dark Green
    "#000000", // Black
    "#FFFFFF", // White
    "#808080", // Gray
  ];

  const customColors = [
    "#FFD700", // Gold
    "#4B0082", // Indigo
    "#F0F8FF", // AliceBlue
    "#8B4513", // SaddleBrown
  ];

  return (
    <div className="flex flex-col gap-2 p-2 bg-white rounded-md shadow-sm">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-gray-500" />
        <span className="text-sm text-gray-600">Colors</span>
      </div>
      
      <div className="flex flex-wrap gap-1 max-w-xs">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setCurrentColor(color)}
            className={`w-6 h-6 rounded-md transition-transform hover:scale-110 ${
              currentColor === color ? "scale-125 shadow-lg" : ""
            }`}
            style={{
              backgroundColor: color,
              border: color === "#FFFFFF" ? "1px solid #E5E7EB" : "none",
            }}
            title={color}
          />
        ))}
      </div>

      <div className="mt-2 border-t border-gray-200 pt-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-600">Custom</span>
          <button
            onClick={() => {
              const color = window.prompt("Enter hex color (e.g. #FF0000):");
              if (color && /^#[0-9A-F]{6}$/i.test(color)) {
                setCurrentColor(color);
              }
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Add custom color"
          >
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {customColors.map((color) => (
            <button
              key={color}
              onClick={() => setCurrentColor(color)}
              className={`w-6 h-6 rounded-md transition-transform hover:scale-110 ${
                currentColor === color ? "scale-125 shadow-lg" : ""
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}