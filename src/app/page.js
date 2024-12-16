"use client";

import { useCanvas } from "./hooks/useCanvas";
import { useShapes } from "./hooks/useShapes";
import DrawingTools from "./components/DrawingTools";
import ColorPicker from "./components/ColorPicker";
import StrokeControls from "./components/StrokeControls";
import ExportTools from "./components/ExportTools";
import CanvasArea from "./components/CanvasArea";

export default function Page() {
  const { canvasId, error, isLoading, addShape, exportCanvas, previewKey } =
    useCanvas();

  const shapeControls = useShapes();

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const shape = shapeControls.createShape(e, rect);
    if (shape) {
      addShape(shape);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Left Panel - Controls */}
      <div className="w-[320px] bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col">
        {error && (
          <div className="p-3 m-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Tools Section - Now with more prominence */}
        <div className="p-4 border-b border-gray-200">
          <DrawingTools
            selectedTool={shapeControls.selectedTool}
            setSelectedTool={shapeControls.setSelectedTool}
          />
        </div>

        <div className="flex-1 p-4 space-y-4">
          {/* Color Section */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Color</h2>
            <ColorPicker
              currentColor={shapeControls.currentColor}
              setCurrentColor={shapeControls.setCurrentColor}
            />
          </div>

          {/* Style Section */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Style</h2>
            <StrokeControls
              isOutlined={shapeControls.isOutlined}
              setIsOutlined={shapeControls.setIsOutlined}
              strokeWidth={shapeControls.strokeWidth}
              setStrokeWidth={shapeControls.setStrokeWidth}
            />
          </div>

          {/* Size Controls */}
          {shapeControls.selectedTool !== "text" && (
            <div className="bg-gray-50 rounded-lg p-3">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Size</h2>
              <div className="flex gap-2">
                {shapeControls.selectedTool === "circle" ? (
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm text-gray-600">Diameter:</span>
                    <input
                      type="number"
                      value={shapeControls.customWidth}
                      onChange={(e) =>
                        shapeControls.setCustomWidth(parseInt(e.target.value))
                      }
                      className="flex-1 px-2 py-1.5 border rounded bg-white"
                      min="1"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm text-gray-600">W:</span>
                      <input
                        type="number"
                        value={shapeControls.customWidth}
                        onChange={(e) =>
                          shapeControls.setCustomWidth(parseInt(e.target.value))
                        }
                        className="w-full px-2 py-1.5 border rounded bg-white"
                        min="1"
                      />
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm text-gray-600">H:</span>
                      <input
                        type="number"
                        value={shapeControls.customHeight}
                        onChange={(e) =>
                          shapeControls.setCustomHeight(
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-2 py-1.5 border rounded bg-white"
                        min="1"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Grid Controls */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Grid</h2>
            <button
              onClick={() => shapeControls.setShowGrid(!shapeControls.showGrid)}
              className={`w-full py-1.5 px-3 rounded text-sm transition-colors ${
                shapeControls.showGrid
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {shapeControls.showGrid ? "Hide Grid" : "Show Grid"}
            </button>
          </div>
        </div>

        {/* Export Section - Fixed at bottom */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <ExportTools
            canvasId={canvasId}
            isLoading={isLoading}
            exportCanvas={exportCanvas}
          />
        </div>
      </div>

      {/* Right Panel - Canvas */}
      <div className="flex-1 p-6 bg-gray-100 flex items-center justify-center">
        <CanvasArea
          canvasId={canvasId}
          isLoading={isLoading}
          onClick={handleCanvasClick}
          showGrid={shapeControls.showGrid}
          gridSize={shapeControls.gridSize}
          previewKey={previewKey}
        />
      </div>
    </div>
  );
}
