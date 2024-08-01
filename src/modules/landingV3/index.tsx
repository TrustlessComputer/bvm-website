import React, { useEffect } from 'react';
import s from './styles.module.scss';
import useWhiteBackground from '@/hooks/useWhiteBackground';
import { HOME_DATA_SECTIONS, TEAM } from '@/modules/landingV3/data-sections';
import SectionContent from '@/modules/landingV3/Componets/SectionContent';
import CaseStudy from '@/modules/landingV3/Componets/CaseStudy';
import { useL2ServiceTracking } from '@hooks/useL2ServiceTracking';
import { useRouter } from 'next/navigation';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import HeroVideo from '@/modules/landingV3/Componets/HeroVideo';
import Section_7 from '@/modules/landingV3/Componets/Section_7';
import HeadingSection from '@/modules/landingV3/Componets/HeadingSection';
import VideoSection from '@/modules/landingV3/Componets/VideoSection';
import ScrollingSection from '@/modules/landingV3/Componets/ScrollingSection';
import useWindowResize, { useIsMobile } from '@hooks/useWindowResize';

export default function LandingV3() {
  useWhiteBackground();
  const { tracking } = useL2ServiceTracking();
  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isMobile = useIsMobile();

  return (
    <div className={s.landing}>
      <HeroVideo />
      <VideoSection />
      <HeadingSection title={'Why builders choose BVM'} showBtn>Whether you're an indie developer or a large-scale
        project, BVM makes it easy
        and affordable to create your own ZK rollup — secured by Bitcoin.</HeadingSection>

      {
        isMobile ? <>
          <div className={s.bottom}>
            {HOME_DATA_SECTIONS.map((data) => {
              return <SectionContent {...data} />;
            })}
          </div>
          <div className={s.caseStudy}>
            <CaseStudy />
          </div>
        </> : <div className={s.bottom}>
          <ScrollingSection />
        </div>
      }
      <div className={s.teamSection}>
        <SectionContent {...TEAM} />
      </div>

      <Section_7 />
    </div>
  );
}
