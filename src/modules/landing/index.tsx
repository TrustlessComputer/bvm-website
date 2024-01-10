import Chain from './Componets/Chain';
import Comunity from './Componets/Comunity';
import Hero from './Componets/Hero';
import Tool from './Componets/Tool';
import s from './styles.module.scss';
import Scalable from '@/modules/landing/Componets/Scalable';

export default function Landing() {
  return (
    <div className={s.landing}>
      <Hero />
      <Chain />
      <Tool />
      <Comunity />
      <Scalable />
    </div>
  );
}
