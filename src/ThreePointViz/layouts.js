import { useEffect, useRef } from "react";
import { useSpring } from "react-spring/three";

const gridLayout = (data) => {
  const numPoints = data.length;
  const numCols = Math.ceil(Math.sqrt(numPoints));
  const numRows = numCols;

  for (let i = 0; i < numPoints; ++i) {
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

const useSourceTargetLayout = ({ data, layout }) => {
  // prep for animation by stouring source
  useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].sourceX = data[i].x || 0;
      data[i].sourceY = data[i].y || 0;
      data[i].sourceZ = data[i].z || 0;
    }
  }, [data, layout]);

  // run layout
  useLayout({ data, layout });

  //store target
  useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].targetX = data[i].x || 0;
      data[i].targetY = data[i].y || 0;
      data[i].targetZ = data[i].z || 0;
    }
  }, [data, layout]);
};

const interpolateSourceTarget = (data, progress) => {
  for (let i = 0; i < data.length; ++i) {
    data[i].x =
      data[i].sourceX + (data[i].targetX - data[i].sourceX) * progress;
    data[i].y =
      data[i].sourceY + (data[i].targetY - data[i].sourceY) * progress;
    data[i].z =
      data[i].sourceZ + (data[i].targetZ - data[i].sourceZ) * progress;
  }
};

export const useAnimatedLayout = ({ data, layout, onFrame }) => {
  // compute layout remembering initial position as source and end position as target
  useSourceTargetLayout({ data, layout });

  // do the actual animation when layout changes
  const prevLayout = useRef(layout);
  useSpring({
    animationProgress: 1,
    from: { animationProgress: 0 },
    reset: layout !== prevLayout.current,
    onFrame: ({ animationProgress }) => {
      // interpolate based on progress
      interpolateSourceTarget(data, animationProgress);
      // callback to indicate that data has updated
      onFrame({ animationProgress });
    },
  });
  prevLayout.current = layout;
};
