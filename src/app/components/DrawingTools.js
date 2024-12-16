"use client";

import { Square, Circle, Type } from "lucide-react";

const tools = [
  { id: "rectangle", icon: Square, label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "text", icon: Type, label: "Text" },
];

export default function DrawingTools({ selectedTool, setSelectedTool }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-900 mb-3">Drawing Tools</h2>
      <div className="flex gap-2">
        {tools.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setSelectedTool(id)}
            className={`
              flex-1 flex flex-col items-center justify-center p-3 rounded-lg
              transition-all duration-150 group relative
              ${
                selectedTool === id
                  ? "bg-blue-500 shadow-sm"
                  : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }
            `}
          >
            <Icon
              className={`w-5 h-5 mb-1 ${
                selectedTool === id
                  ? "text-white"
                  : "text-gray-600 group-hover:text-gray-900"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                selectedTool === id
                  ? "text-white"
                  : "text-gray-600 group-hover:text-gray-900"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
