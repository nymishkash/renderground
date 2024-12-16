"use client";

import { Download } from "lucide-react";

export default function ExportTools({ canvasId, isLoading }) {
  const handleExport = async () => {
    if (!canvasId || isLoading) return;

    try {
      const response = await fetch(
        `http://localhost:6969/canvas/${canvasId}/export`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `canvas-${canvasId}.html`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export canvas");
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleExport}
        className="flex items-center justify-center gap-2 px-4 py-2 
                 bg-green-500 text-white rounded text-sm font-medium
                 hover:bg-green-600 transition-colors 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 w-full"
        disabled={!canvasId || isLoading}
      >
        <Download className="w-4 h-4" />
        Export HTML
      </button>
    </div>
  );
}
