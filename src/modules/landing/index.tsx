import Chain from './Componets/Chain';
import Hero from './Componets/Hero';
import s from './styles.module.scss';
import Scalable from '@/modules/landing/Componets/Scalable';

export default function Landing() {
  return (
    <div className={s.landing}>
      <Hero />
      <Chain />
      <Scalable />
    </div>
  );
}
