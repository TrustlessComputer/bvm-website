import s from './styles.module.scss';
import { useEffect } from 'react';
import SectionTitle from '@/modules/landingV2/Componets/SectionTitle';
import Modules from './Componets/Modules';
import Solutions from './Componets/Solutions';
import HeroV2 from '@/modules/landingV2/Componets/Hero';
import Section_7 from '../home/Section_7';
import Learning from './Componets/Learning';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      <HeroV2 />
      <Learning />
      <Solutions />
      <Modules />
      {/* <Section_7 /> */}
    </div>
  );
}
