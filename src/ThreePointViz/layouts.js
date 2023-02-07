import { useEffect } from "react";

const gridLayout = (data) => {
  const numPoints = data.length;
  const numCols = Math.ceil(Math.sqrt(numPoints));
  const numRows = numCols;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];
    const col = (i % numCols) - numCols / 2;
    const row = Math.floor(i / numCols) - numRows / 2;

    datum.x = col * 1.05;
    datum.y = row * 1.05;
    datum.z = 0;
  }
};

const spiralLayout = (data) => {
  let theta = 0;
  for (let i = 0; i < data.length; i++) {
    const datum = data[i];
    const radius = Math.max(1, Math.sqrt(i + 1) * 0.8);
    theta += Math.asin(1 / radius) * 1;
    datum.x = Math.cos(theta) * radius;
    datum.y = Math.sin(theta) * radius;
    datum.z = 0;
  }
};

export const useLayout = ({ data, layout = "grid" }) => {
  useEffect(() => {
    switch (layout) {
      case "spiral":
        spiralLayout(data);
        break;
      case "grid":
      default: {
        gridLayout(data);
      }
    }
  }, [data, layout]);
};
