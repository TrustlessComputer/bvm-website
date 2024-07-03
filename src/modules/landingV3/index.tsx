import { useEffect } from 'react';
import s from './styles.module.scss';
import useWhiteBackground from '@/hooks/useWhiteBackground';
import { HOME_DATA_SECTIONS } from '@/modules/landingV3/data-sections';
import SectionContent from '@/modules/landingV3/Componets/SectionContent';
import HeroV2 from '@/modules/landingV3/Componets/HeroV2';

export default function LandingV3() {
  useWhiteBackground();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      <HeroV2 />
      <div className={s.bottom}>
        {HOME_DATA_SECTIONS.map((data) => {
          return <SectionContent {...data} />;
        })}
      </div>
    </div>
  );
}
