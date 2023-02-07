import { useRef } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import * as THREE from "three";

extend({ TrackballControls });

const ALT_KEY = 18;
const CTRL_KEY = 17;
const SUPER_KEY = 91;

const Controls = () => {
  const controls = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    //update the view as the vis is interacted with
    controls.current.update();
  });

  return (
    <trackballControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.1}
      keys={[ALT_KEY, CTRL_KEY, SUPER_KEY]}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.ZOOM,
      }}
    />
  );
};

export default Controls;
