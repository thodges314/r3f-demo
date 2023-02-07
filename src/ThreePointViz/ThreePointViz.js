import { Canvas } from "react-three-fiber";
import Controls from "./Controls";

const ThreePointViz = ({ data }) => {
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
      {/* <mesh position={[0, 0, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
        <meshStandardMaterial attach="material" color="#fff" />
      </mesh> */}
      {data.map((d, i) => {
        const x = (i % 30) * 1.05;
        const y = Math.floor(i / 30) * 1.05;
        const z = 0;
        return (
          <mesh
            position={[x, y, z]}
            rotation={[Math.PI * 0.5, 0, 0]}
            key={d.id}
          >
            <cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
            <meshStandardMaterial attach="material" color="#fff" />
          </mesh>
        );
      })}
    </Canvas>
  );
};

export default ThreePointViz;
