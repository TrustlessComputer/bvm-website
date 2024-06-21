import { useEffect } from 'react';
import s from './styles.module.scss';
import useWhiteBackground from '@/hooks/useWhiteBackground';
import HeroV3 from '@/modules/landingV3/Componets/Hero';
import Experience from './Componets/Experience';
import { HOME_DATA_SECTIONS } from '@/modules/landingV3/data-sections';
import SectionContent from '@/modules/landingV3/Componets/SectionContent';
import Brand from './Componets/Brand';

export default function LandingV3() {
  useWhiteBackground();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      <HeroV3 />

      <div className={s.bottom}>
        {HOME_DATA_SECTIONS.map((data) => {
          return <SectionContent {...data} />;
        })}
      </div>
    </div>
  );
}
