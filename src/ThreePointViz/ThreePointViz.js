import { Canvas } from "react-three-fiber";
import Controls from "./Controls";
import InstancedPoints from "./InstancedPoints";

const ThreePointViz = ({ data, layout }) => {
  return (
    <Canvas camera={{ position: [0, 0, 40] }}>
      <Controls />
      <ambientLight color="#fff" intensity={0.1} />
      <hemisphereLight
        color="#fff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1}
      />
      <InstancedPoints data={data} layout={layout} />
    </Canvas>
  );
};

export default ThreePointViz;
