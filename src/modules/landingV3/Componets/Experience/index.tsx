
import { Canvas } from '@react-three/fiber';
import { MutableRefObject, ReactElement } from 'react';
import s from './styles.module.scss';
import Lego from '@/modules/landingV3/Componets/Experience/Lego';

export default function Experience({ refParent }: { refParent: MutableRefObject<any> }): ReactElement {

  return (<div className={s.wrapper}>
    <Canvas flat shadows camera={{ position: [0, 0, 10], fov: 25 }} eventSource={refParent}>
      <fog attach="fog" args={['#FAF4ED', 15, 22.5]} />
      <color attach="background" args={['#FAF4ED']} />
      <Lego />
      <ambientLight intensity={2.5} color={'#ffffff'} />
      <directionalLight intensity={1.2} color={'#fff'} position={[2, 5, 5]} />
    </Canvas>
  </div>);
}
