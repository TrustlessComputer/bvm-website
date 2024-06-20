import { Environment, Lightformer, OrbitControls, Outlines } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing';
import { MutableRefObject, ReactElement } from 'react';
import s from './styles.module.scss';
import { Euler } from 'three';
import Lego from '@/modules/landingV3/Componets/Experience/Lego';

export default function Experience({ refParent }: { refParent: MutableRefObject<any> }): ReactElement {

  return (<div className={s.wrapper}>
    <Canvas flat shadows camera={{ position: [0, 0, 10], fov: 25 }} eventSource={refParent}>
      <fog attach="fog" args={['#FAF4ED', 15, 22.5]} />
      <color attach="background" args={['#FAF4ED']} />
      <Lego />
      <ambientLight intensity={2} color={'#ffffff'} />
      <directionalLight intensity={1.2} color={'#fff'} position={[2, 5, 5]} />
      {/*<EffectComposer enableNormalPass={false}>*/}
      {/*<Bloom luminanceThreshold={.1} mipmapBlur />*/}
      {/*<ToneMapping />*/}
      {/*<Outlines />*/}
      {/*</EffectComposer>*/}
      {/*<OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2}*/}
      {/*               maxPolarAngle={Math.PI / 2} />*/}
      {/*<Environment resolution={256} environmentRotation={new Euler(Math.PI / 2)} preset={'studio'} blur={1} environmentIntensity={.25}>*/}
      {/*  <group rotation={[-Math.PI / 3, 0, 1]}>*/}
      {/*    <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />*/}
      {/*    <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />*/}
      {/*    <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />*/}
      {/*    <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />*/}
      {/*    <Lightformer form="ring" color="#4060ff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)}*/}
      {/*                 position={[10, 10, 0]} scale={10} />*/}
      {/*  </group>*/}
      {/*</Environment>*/}
    </Canvas>
  </div>);
}
