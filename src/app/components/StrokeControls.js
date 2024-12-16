"use client";

import { Square } from "lucide-react";

export default function StrokeControls({
  isOutlined,
  setIsOutlined,
  strokeWidth,
  setStrokeWidth,
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Style Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsOutlined(false)}
          className={`flex-1 p-2 rounded text-sm ${
            !isOutlined
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Fill Only
        </button>
        <button
          onClick={() => setIsOutlined(true)}
          className={`flex-1 p-2 rounded text-sm ${
            isOutlined
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Fill + Outline
        </button>
      </div>

      {/* Stroke Width (only shown when outline is selected) */}
      {isOutlined && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 min-w-[80px]">
            Outline Width
          </span>
          <input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 w-8">{strokeWidth}px</span>
        </div>
      )}
    </div>
  );
}
