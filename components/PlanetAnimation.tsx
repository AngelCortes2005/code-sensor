"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function PlanetAnimaion() {
  const planetRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0006;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y +=  0.0006;
    }
  });

  return (
    <>

      <ambientLight intensity={0.4} />
      <pointLight position={[15, 15, 15]} intensity={2} color="#2ECC71" />
      <pointLight position={[-15, -15, 10]} intensity={1} color="#3498DB" />
      <pointLight position={[0, 0, -10]} intensity={0.5} color="#E74C3C" />
      
      <Sphere ref={planetRef} args={[3, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0d1117"
          roughness={0.3}
          metalness={0.9}
          emissive="#010E09"
          emissiveIntensity={5}
        />
      </Sphere>

      <mesh ref={wireframeRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3.02, 32, 32]} />
        <meshBasicMaterial
          color="#00D15E"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3498DB" transparent opacity={0.2} />
      </mesh>

      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        fade
        speed={0.2}
      />
    </>
  );
}

export default function PlanetHero() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        camera={{
          position: [0, 3, 9],  
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          alpha: true 
        }}
        style={{ background: 'transparent' }}
      >
        <PlanetAnimaion />
      </Canvas>
    </div>
  );
}