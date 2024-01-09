import Chain from './Componets/Chain';
import Hero from './Componets/Hero';
import Tool from './Componets/Tool';
import s from './styles.module.scss';

export default function Landing() {
  return (
    <div className={s.landing}>
      <Hero />
      <Chain />
      <Tool />
    </div>
  );
}
