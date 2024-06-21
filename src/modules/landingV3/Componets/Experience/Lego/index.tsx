import { Decal, Float, Outlines, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { easing } from 'maath';
import {
  Euler,
  LinearFilter,
  LinearMipmapLinearFilter,
  LinearMipmapNearestFilter,
  NearestMipmapLinearFilter,
} from 'three';

export default function Lego(props: any): ReactElement {
  const refGroup = useRef(null);
  const [scale, setScale] = useState(1.6);
  const [position, setPosition] = useState<any>([1.8, -.2, 0]);

  const { nodes, materials } = useGLTF('/LEGO_4.glb');
  useFrame((state, delta) => {
    refGroup.current && easing.damp3((refGroup.current as any).rotation, [.1 + Math.sin(state.pointer.x / 4) * .1, -2.5 + state.pointer.y * .1, -.1 + Math.cos(state.pointer.x / 4) * .1], 0.5, delta);
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


    return <>
      <meshStandardMaterial color={'#C7D5E1'} />
      <Outlines thickness={0.002} color={'#686A6C'} />
    </>;
  };

  useEffect(() => {

    const resize = () => {
      if (window.innerWidth < 1200 && window.innerWidth >= 768) {
        setScale(1);
        setPosition([0, .8, 0]);
      } else if (window.innerWidth < 768) {
        setScale(1);
        setPosition([0, .8, 0]);
      } else {
        setScale(1.7);
        setPosition([1.8, -.25, 0]);
      }
    };

    resize();
    window.addEventListener('resize', resize);
  }, []);

  const textMap = useTexture('/glb/logo.jpg', () => {
    textMap.minFilter = LinearFilter;
  });

  return <Float position={position}>
    <group ref={refGroup} {...props} scale={scale} rotation={[.1, -2.5, -.1]}>
      <mesh castShadow receiveShadow geometry={(nodes.Cube as any).geometry} material={materials.mat12}>
        <CustomMesh />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cylinder002 as any).geometry}
          material={materials.mat12}
          position={[0.57, 0.705, 0.243]}
          scale={1.162}
        >
          <CustomMesh />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.LOGO_MESH as any).geometry}
          material={materials.mat12}
        >
          <CustomMesh />
          <Decal castShadow={false} receiveShadow={false} position={[1, 0.15, 0]} scale={1.1} rotation={Math.PI as any}>
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
          geometry={(nodes.VIDEO_MESH as any).geometry}
          material={materials.mat12}
        >
          <CustomMesh />
          <Decal position={[0, .12, -.8]} scale={[-1.8, .8, .8]} rotation={new Euler(0, 0, 0)}>
            <meshStandardMaterial
              transparent
              polygonOffset
              polygonOffsetFactor={-10}
              color={'#d7e8f3'}
            >
              <videoTexture attach="map" args={[video]} />
            </meshStandardMaterial>
          </Decal>
        </mesh>
      </mesh>
    </group>
  </Float>;
}
useGLTF.preload('/LEGO_4.glb');
