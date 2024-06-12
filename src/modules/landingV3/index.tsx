import { useEffect } from 'react';
import s from './styles.module.scss';
import useWhiteBackground from '@/hooks/useWhiteBackground';
import HeroV3 from '@/modules/landingV3/Componets/Hero';
import Experience from './Componets/Experience';

export default function LandingV3() {
  useWhiteBackground();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      <HeroV3 />
      <Experience />
    </div>
  );
}
