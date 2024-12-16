"use client";

import { useState } from "react";

export const useShapes = () => {
  const [selectedTool, setSelectedTool] = useState("rectangle");
  const [currentColor, setCurrentColor] = useState("#FF0000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [opacity, setOpacity] = useState(100);
  const [isOutlined, setIsOutlined] = useState(false);
  const [customWidth, setCustomWidth] = useState(100);
  const [customHeight, setCustomHeight] = useState(50);
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(20);

  const createShape = (e, rect) => {
    if (!selectedTool) return null;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const currentOpacity = opacity / 100;

    switch (selectedTool) {
      case "rectangle":
        return {
          type: "rectangle",
          properties: {
            x,
            y,
            width: customWidth,
            height: customHeight,
            color: currentColor,
            strokeColor: isOutlined ? "#000000" : "transparent",
            strokeWidth: isOutlined ? strokeWidth : 0,
            opacity: currentOpacity,
          },
        };

      case "circle":
        return {
          type: "circle",
          properties: {
            centerX: x,
            centerY: y,
            radius: customWidth / 2,
            fillColor: currentColor,
            strokeColor: isOutlined ? "#000000" : "transparent",
            strokeWidth: isOutlined ? strokeWidth : 0,
            opacity: currentOpacity,
          },
        };

      case "text":
        const text = window.prompt("Enter text:");
        if (!text) return null;

        return {
          type: "text",
          properties: {
            x,
            y,
            text,
            textColor: currentColor,
            font: `20px Arial`,
            align: "center",
            baseline: "middle",
            opacity: currentOpacity,
          },
        };

      default:
        return null;
    }
  };

  return {
    selectedTool,
    setSelectedTool,
    currentColor,
    setCurrentColor,
    strokeWidth,
    setStrokeWidth,
    opacity,
    setOpacity,
    isOutlined,
    setIsOutlined,
    showGrid,
    setShowGrid,
    gridSize,
    setGridSize,
    customWidth,
    setCustomWidth,
    customHeight,
    setCustomHeight,
    createShape,
  };
};
