import { useState, useEffect } from "react";

export type VectorPath = {
  id: string;
  d: string;
};

export function useImageVectorizer(imageUrl: string | null) {
  const [paths, setPaths] = useState<VectorPath[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!imageUrl) {
      setPaths([]);
      return;
    }

    setLoading(true);

    const img = new Image();
    img.crossOrigin = "Anonymous"; // Prevent canvas tainting if external
    
    img.onload = () => {
      // 1. Grid Resolution (Downsampling)
      // A 100x100 grid prevents SVG path explosion while preserving geometric detail
      const GRID_SIZE = 100;
      
      const canvas = document.createElement("canvas");
      canvas.width = GRID_SIZE;
      canvas.height = GRID_SIZE;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw image to canvas, stretching to fit the grid
      ctx.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE);
      
      // Extract raw pixel data
      const imageData = ctx.getImageData(0, 0, GRID_SIZE, GRID_SIZE);
      const data = imageData.data;
      
      // 2. Grayscale Conversion
      const grayscale = new Float32Array(GRID_SIZE * GRID_SIZE);
      for (let i = 0; i < data.length; i += 4) {
        // Luminance formula
        grayscale[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }

      // 3. Sobel Edge Detection
      const edges = new Uint8Array(GRID_SIZE * GRID_SIZE);
      // We look for strong contrast changes
      const threshold = 50; 

      for (let y = 1; y < GRID_SIZE - 1; y++) {
        for (let x = 1; x < GRID_SIZE - 1; x++) {
          const i = y * GRID_SIZE + x;
          
          // Surrounding pixels
          const tl = grayscale[i - GRID_SIZE - 1];
          const tc = grayscale[i - GRID_SIZE];
          const tr = grayscale[i - GRID_SIZE + 1];
          const l  = grayscale[i - 1];
          const r  = grayscale[i + 1];
          const bl = grayscale[i + GRID_SIZE - 1];
          const bc = grayscale[i + GRID_SIZE];
          const br = grayscale[i + GRID_SIZE + 1];

          // Sobel Kernels
          const gx = (tr + 2 * r + br) - (tl + 2 * l + bl);
          const gy = (bl + 2 * bc + br) - (tl + 2 * tc + tr);
          
          const magnitude = Math.sqrt(gx * gx + gy * gy);
          
          if (magnitude > threshold) {
            edges[i] = 1; // Mark as edge
          }
        }
      }

      // 4. Vector Path Generation
      // Convert the 100x100 grid edges into SVG paths mapped to a [-150, 150] coordinate space
      const newPaths: VectorPath[] = [];
      const scale = 300 / GRID_SIZE;
      const offset = -150;

      // Simple grid-marching: connect adjacent edge pixels to form continuous geometric circuits
      let pathCount = 0;
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const i = y * GRID_SIZE + x;
          if (edges[i]) {
            const svgX = x * scale + offset;
            const svgY = y * scale + offset;

            // Check right neighbor
            if (x < GRID_SIZE - 1 && edges[i + 1]) {
              newPaths.push({
                id: `p-${pathCount++}`,
                d: `M ${svgX},${svgY} L ${(x + 1) * scale + offset},${svgY}`
              });
            }
            // Check bottom neighbor
            if (y < GRID_SIZE - 1 && edges[i + GRID_SIZE]) {
              newPaths.push({
                id: `p-${pathCount++}`,
                d: `M ${svgX},${svgY} L ${svgX},${(y + 1) * scale + offset}`
              });
            }
            // Check diagonal (bottom-right) for some organic flow
            if (x < GRID_SIZE - 1 && y < GRID_SIZE - 1 && edges[i + GRID_SIZE + 1]) {
               newPaths.push({
                 id: `p-${pathCount++}`,
                 d: `M ${svgX},${svgY} L ${(x + 1) * scale + offset},${(y + 1) * scale + offset}`
               });
            }
          }
        }
      }

      setPaths(newPaths);
      setLoading(false);
    };

    img.src = imageUrl;
  }, [imageUrl]);

  return { paths, loading };
}
