"use client";

import { Download, FileImage, Code, Share2 } from "lucide-react";

export default function ExportTools({ canvasId, isLoading, exportCanvas }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Export Options Group */}
      <div className="grid grid-cols-3 gap-1">
        {[
          { id: "png", label: "PNG", icon: FileImage },
          { id: "svg", label: "SVG", icon: Code },
          { id: "html", label: "HTML", icon: Code },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => exportCanvas(id)}
            className="flex items-center justify-center gap-1 px-2 py-1.5 
                     bg-green-500 text-white rounded text-sm
                     hover:bg-green-600 transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canvasId || isLoading}
            title={`Export as ${label}`}
          >
            <Icon className="w-3 h-3" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>

      {/* Share Button */}
      <button
        onClick={() => {
          const url = `http://localhost:6969/canvas/${canvasId}/preview`;
          navigator.clipboard.writeText(url);
          alert("Preview URL copied to clipboard!");
        }}
        className="w-full flex items-center justify-center gap-1 px-2 py-1.5
                 bg-blue-500 text-white rounded text-sm
                 hover:bg-blue-600 transition-colors"
        disabled={!canvasId || isLoading}
      >
        <Share2 className="w-3 h-3" />
        <span className="text-xs">Share</span>
      </button>
    </div>
  );
}
