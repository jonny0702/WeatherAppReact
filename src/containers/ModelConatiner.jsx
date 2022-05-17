import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import * as THREE from 'three';
// import Model from '../components/Building.js';
import HoseModel from '../components/HoseModel.js';
const Controls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return <OrbitControls args={[camera, domElement]} />;
};
const CameraHelper = () => {
  const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
  return (
    <group position={[3, 2, 7]}>
      <cameraHelper args={[camera]} />
    </group>
  );
};
const Animation = () => {
  // const myModel = useRef();
  // useFrame(({ clock }) => {
  //   const animation = clock.getElapsedTime();
  //   myModel.current.rotation.y = animation;
  // });
  return (
    <mesh>
      <HoseModel position={[0, -2, 0]} />
    </mesh>
  );
};
const ModelConatiner = (props) => {
  const { isOpen } = props;

  return (
    <div
      className="Model__container"
      style={{
        filter: `${isOpen ? 'blur(1)' : 'blur(0)'}`,
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{
            fov: 20,
            aspect: 100 / 100,
            near: 0.1,
            far: 1000,
            position: [8, 20, 85],
          }}
        >
          <directionalLight intensity={1} />
          <ambientLight intensity={0.3} />
          <Animation />
          {/* <CameraHelper /> */}
          <Controls />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ModelConatiner;
