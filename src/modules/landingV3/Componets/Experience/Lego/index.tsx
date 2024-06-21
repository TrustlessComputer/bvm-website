import { Decal, Float, Outlines, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { ReactElement, useEffect, useState } from 'react';
import { easing } from 'maath';
import { Euler } from 'three';

export default function Lego(props: any): ReactElement {
  const { nodes, materials } = useGLTF('/LEGO_3.glb');
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(state.pointer.x / 4) * 9,
        1.25 + state.pointer.y,
        Math.cos(state.pointer.x / 4) * 9,
      ],
      0.5,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = './glb/render_2_1.mp4';
    vid.crossOrigin = 'Anonymous';
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  useEffect(() => {
    setTimeout(() => {
      video.play();
    }, 5000);
  }, []);

  const CustomMesh = (): ReactElement => {
    return (
      <>
        <meshStandardMaterial color={'#C7D5E1'} />
        <Outlines thickness={0.002} color={'#686A6C'} />
      </>
    );
  };

  const textMap = useTexture('/glb/logo.jpg');
  return (
    <Float position={[1.6, 0, 0]}>
      <group {...props} scale={0.8} rotation={[0.1, -2.5, -0.1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube as any).geometry}
          material={materials.mat12}
        >
          <CustomMesh />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.VIDEO_MESH as any).geometry}
          material={materials.mat12}
        >
          <CustomMesh />
          <Decal
            position={[0, 0, -1]}
            scale={[-2, 1, 1]}
            rotation={new Euler(0, 0, 0)}
          >
            <meshStandardMaterial
              transparent
              polygonOffset
              polygonOffsetFactor={-10}
            >
              <videoTexture attach="map" args={[video]} />
            </meshStandardMaterial>
          </Decal>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.LOGO_MESH as any).geometry}
          material={materials.mat12}
        >
          <CustomMesh />
          <Decal
            castShadow={false}
            receiveShadow={false}
            position={[1, 0, 0]}
            scale={1.1}
            rotation={Math.PI as any}
          >
            <meshStandardMaterial
              color={'#C7D5E1'}
              polygonOffset
              polygonOffsetFactor={-1}
              map={textMap}
              map-flipY={false}
            />
          </Decal>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder002 as any).geometry}
          material={materials.mat12}
          position={[0.654, 0.705, 0.236]}
          scale={1.162}
        >
          <CustomMesh />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder003 as any).geometry}
          material={materials.mat12}
          position={[0.654, 0.705, -0.237]}
          scale={1.162}
        >
          <CustomMesh />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder001 as any).geometry}
          material={materials.mat12}
          position={[0.005, 0.705, 0.236]}
          scale={1.162}
        >
          <CustomMesh />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder004 as any).geometry}
          material={materials.mat12}
          position={[0.005, 0.705, -0.237]}
          scale={1.162}
        >
          <CustomMesh />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder005 as any).geometry}
          material={materials.mat12}
          position={[-0.76, 0.705, 0.236]}
          scale={1.162}
        >
          <CustomMesh />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder006 as any).geometry}
          material={materials.mat12}
          position={[-0.76, 0.705, -0.237]}
          scale={1.162}
        >
          <CustomMesh />
        </mesh>
      </group>
    </Float>
  );
}
useGLTF.preload('/LEGO_3.glb');
