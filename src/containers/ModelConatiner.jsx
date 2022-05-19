import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import HoseModel from '../components/HoseModel.js';
import moment from 'moment';

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
const PointLightHelper = () => {
  const pl = new THREE.PointLight('#fca903', 1, 100);
  return (
    <group>
      <PointLightHelper arg={[pl]} />
    </group>
  );
};
const Animation = (props) => {
  const myPointLight = useRef();
  const myModel = useRef();

  useFrame(({ clock }) => {
    const animation = clock.getElapsedTime() / 4;
    myModel.current.rotation.y = animation;
  });
  useFrame(({ clock }) => {
    const dla = clock.getElapsedTime() / 60;
    myPointLight.current.position.y = 10 + 10 * Math.sin(dla);
    myPointLight.current.position.z = 10 + 10 * Math.cos(dla);
    myPointLight.current.intensity = Math.sin(dla) * (5 * Math.cos(dla - 2));
  });
  return (
    <mesh ref={myModel}>
      <pointLight ref={myPointLight} color={'#fca903'} far={1000} />
      <ambientLight intensity={0.2} />
      <HoseModel position={[0, -2, 0]} rotation={[0, -1.5, 0]} />
    </mesh>
  );
};
const ModelConatiner = () => {
  return (
    <div className="Model__container">
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
          <Animation />
          {/* <CameraHelper /> */}
          <Controls />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ModelConatiner;
