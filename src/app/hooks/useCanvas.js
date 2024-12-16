"use client";

import { useState, useEffect } from "react";
import rendergroundAPI from "@/lib/apiInstance";

export const useCanvas = () => {
  const [canvasId, setCanvasId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);

  const initializeCanvas = async () => {
    try {
      console.log("Initializing canvas...");
      setIsLoading(true);
      const response = await rendergroundAPI.post("/canvas", {
        id: `canvas-${Date.now()}`,
        width: 800,
        height: 600,
        backgroundColor: "white",
      });

      const data = response.data;
      console.log("Canvas initialized:", data);
      setCanvasId(data.id);
    } catch (err) {
      console.error("Canvas initialization error:", err);
      setError("Failed to initialize canvas. Please try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const addShape = async (shape) => {
    if (!canvasId) return;

    try {
      console.log("Adding shape:", shape);
      await rendergroundAPI.post(`/canvas/${canvasId}/elements`, shape);

      // If we reach here, the request was successful
      setPreviewKey((prev) => prev + 1);
      return true;
    } catch (err) {
      console.error("Add shape error:", err);
      setError("Failed to add shape. Please try again.");
      return false;
    }
  };

  useEffect(() => {
    initializeCanvas();
  }, []);

  return {
    canvasId,
    error,
    isLoading,
    addShape,
    previewKey,
  };
};
