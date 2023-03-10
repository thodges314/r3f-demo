import { useEffect, useRef } from "react";
import { Object3D } from "three";
import { useAnimatedLayout } from "./layouts";

const scratchObject3D = new Object3D();

const updateInstancedMeshMatricies = ({ mesh, data }) => {
  if (!mesh) return;
  for (let i = 0; i < data.length; ++i) {
    const { x, y, z } = data[i];

    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
};

const InstancedPoints = ({ data, layout }) => {
  const meshRef = useRef();
  const numPoints = data.length;

  useAnimatedLayout({
    data,
    layout,
    onFrame: () =>
      updateInstancedMeshMatricies({ mesh: meshRef.current, data }),
  });

  useEffect(
    () => updateInstancedMeshMatricies({ mesh: meshRef.current, data }),
    [data, layout]
  );

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}
    >
      <cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
      <meshPhongMaterial attach="material" color="#fff" />
    </instancedMesh>
  );
};

export default InstancedPoints;
