import Hero from './Componets/Hero';
import s from './styles.module.scss';

export default function Landing() {
  return (
    <div className={s.landing}>
      <Hero />
    </div>
  );
}
