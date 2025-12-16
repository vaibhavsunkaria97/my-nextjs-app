"use client";
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, RoundedBox, Instances, Instance, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// --- Types ---
type ChipMode = 'legacy' | 'ift';

// --- 1. The Logic Cores (The Visual Storyteller) ---
const LogicCores = ({ mode }: { mode: ChipMode }) => {
  const isLegacy = mode === 'legacy';
  
  // We generate the grid ONCE.
  // In Legacy mode: ALL cores are active (High Power).
  // In IFT mode: Only random cores are active (Sparse).
  const cores = useMemo(() => {
    const temp = [];
    const gridSize = 8; // Dense 8x8 grid
    const spacing = 1.8 / gridSize;
    const offset = 1.8 / 2 - (spacing / 2);
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Sparse logic: In IFT mode, only ~20% of cores are active
        const isActive = isLegacy ? true : Math.random() > 0.75; 
        
        temp.push({
          pos: [(x * spacing) - offset, 0.25, (y * spacing) - offset],
          active: isActive
        });
      }
    }
    return temp;
  }, [mode, isLegacy]); // Re-calculate when mode changes

  return (
    <group>
      {cores.map((core, i) => (
        <CoreMesh key={i} position={core.pos as [number, number, number]} active={core.active} mode={mode} />
      ))}
    </group>
  );
};

// Individual Core to handle animation
const CoreMesh = ({ position, active, mode }: { position: [number, number, number], active: boolean, mode: ChipMode }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Animation Logic
    const t = state.clock.getElapsedTime();
    
    if (mode === 'legacy') {
      // Legacy: Pulse heavily (Heat stress)
      const pulse = Math.sin(t * 5) * 0.2 + 0.8; 
      // @ts-ignore
      mesh.current.material.emissiveIntensity = pulse * 2;
    } else {
      // IFT: Gentle, efficient glow
      if (active) {
        // @ts-ignore
        mesh.current.material.emissiveIntensity = 1; 
      } else {
         // @ts-ignore
        mesh.current.material.emissiveIntensity = 0; // Completely off (Power Gating)
      }
    }
  });

  const color = mode === 'legacy' ? '#ef4444' : '#10b981'; // Red vs Emerald
  const baseColor = mode === 'legacy' ? '#7f1d1d' : '#064e3b'; // Dark Red vs Dark Green base

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[0.18, 0.04, 0.18]} />
      <meshStandardMaterial 
        color={active ? color : '#1e293b'} 
        emissive={active ? color : '#000000'}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

// --- 2. SMD Components (Detail) ---
const SMDComponents = () => {
  const smds = useMemo(() => {
    const temp = [];
    for (let i = -1.2; i <= 1.2; i += 0.15) {
      if (Math.abs(i) < 0.2) continue;
      temp.push({ position: [i, 0.12, -1.2], rotation: [0, 0, 0] });
      temp.push({ position: [i, 0.12, 1.2], rotation: [0, 0, 0] });
      temp.push({ position: [-1.2, 0.12, i], rotation: [0, Math.PI / 2, 0] });
      temp.push({ position: [1.2, 0.12, i], rotation: [0, Math.PI / 2, 0] });
    }
    return temp;
  }, []);

  return (
    <Instances range={smds.length}>
      <boxGeometry args={[0.08, 0.05, 0.15]} />
      <meshStandardMaterial color="#d4d4d8" roughness={0.5} metalness={0.5} />
      {smds.map((data, i) => (
        <Instance key={i} position={data.position as any} rotation={data.rotation as any} />
      ))}
    </Instances>
  );
};

// --- 3. The Main Chip Assembly ---
const SiliconDie = ({ mode }: { mode: ChipMode }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Rotate faster in legacy mode (instability/stress metaphor)
      group.current.rotation.y += mode === 'legacy' ? 0.005 : 0.002;
    }
  });

  return (
    <group ref={group}>
      {/* Substrate */}
      <RoundedBox args={[3.5, 0.2, 3.5]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </RoundedBox>

      {/* Gold Pins */}
      <mesh position={[0, -0.05, 0]}>
         <boxGeometry args={[3.55, 0.1, 3.55]} />
         <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.3} />
      </mesh>

      {/* Die Surface */}
      <RoundedBox args={[2, 0.1, 2]} radius={0.01} smoothness={2} position={[0, 0.15, 0]}>
        <meshPhysicalMaterial 
          color="#000000"
          roughness={0.1}
          metalness={1}
          envMapIntensity={2}
          clearcoat={1}
        />
      </RoundedBox>

      <SMDComponents />
      <LogicCores mode={mode} />
      
      {/* 3D Label Floating Above */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <Text 
          position={[0, 1.5, 0]} 
          fontSize={0.2} 
          color={mode === 'legacy' ? '#ef4444' : '#10b981'}
          anchorX="center" 
          anchorY="middle"
        >
          {mode === 'legacy' ? 'MONOLITHIC: 350W' : 'SPARSE: 75W'}
        </Text>
      </Float>
    </group>
  );
};

// --- 4. Main Component with UI ---
export const ChipModel = () => {
  const [mode, setMode] = useState<ChipMode>('ift');

  return (
    <div className="relative w-full h-[500px]">
      
      {/* --- UI OVERLAY --- */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900/80 backdrop-blur p-1 rounded-full border border-slate-700 flex">
        <button
          onClick={() => setMode('legacy')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            mode === 'legacy' 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.4)]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          LEGACY ARCHITECTURE
        </button>
        <button
          onClick={() => setMode('ift')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            mode === 'ift' 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          IFT ENERGY FABRIC
        </button>
      </div>

      {/* --- 3D SCENE --- */}
      <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={40} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={mode === 'legacy' ? 2 : 0.5} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        
        {/* Dynamic Lighting based on Mode */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[-5, 5, 5]} intensity={2} color="#ffffff" />
        
        {/* Mood Light (Red or Green) */}
        <spotLight 
          position={[5, 10, 5]} 
          angle={0.5} 
          penumbra={1} 
          intensity={mode === 'legacy' ? 20 : 10} 
          color={mode === 'legacy' ? '#ef4444' : '#10b981'} 
          distance={20} 
        />

        <Environment preset="city" blur={0.8} />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <SiliconDie mode={mode} />
        </Float>
      </Canvas>
    </div>
  );
};