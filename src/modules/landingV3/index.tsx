import React, { useEffect } from 'react';
import s from './styles.module.scss';
import useWhiteBackground from '@/hooks/useWhiteBackground';
import { HOME_DATA_SECTIONS } from '@/modules/landingV3/data-sections';
import SectionContent from '@/modules/landingV3/Componets/SectionContent';
import HeroV2 from '@/modules/landingV3/Componets/HeroV2';
import CaseStudy from '@/modules/landingV3/Componets/CaseStudy';
import { useL2ServiceTracking } from '@hooks/useL2ServiceTracking';
import { useRouter } from 'next/navigation';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import HeroVideo from '@/modules/landingV3/Componets/HeroVideo';
import Section_7 from '@/modules/landingV2/Componets/Section_7';
import HeadingSection from '@/modules/landingV3/Componets/HeadingSection';

export default function LandingV3() {
  useWhiteBackground();
  const { tracking } = useL2ServiceTracking();
  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      <HeroVideo />
      <HeadingSection title={'Built for builders'} isVideo bgColor={'#f4f4f4'}>With Bitcoin as the base layer, your ZK rollup inherits Bitcoin’s security and you can tap into the $1 trillion Bitcoin economy..</HeadingSection>
      <HeadingSection title={'Why builders choose BVM'}  >Whether you're an indie developer or a large-scale project, BVM makes it easy
        and affordable to create your own ZK rollup — secured by Bitcoin.</HeadingSection>
      <div className={s.bottom}>
        {/*<div className={`${s.bottom_top} containerV3`}>*/}
        {/*  <p className={s.bottom_top_heading}>Why builders choose BVM</p>*/}
        {/*  <p className={s.bottom_top_desc}>Whether you're an indie developer or a large-scale project, BVM makes it easy*/}
        {/*    and affordable to create your own ZK rollup — secured by Bitcoin.</p>*/}
        {/*  <div className={s.wrapperBtn}>*/}
        {/*    <div className={`${s.btn} ${s.btn__primary}`} onClick={() => {*/}
        {/*      tracking('GET_STARTED');*/}
        {/*      router.push('/rollups/customizev2');*/}
        {/*    }}>*/}
        {/*      <p>Build now</p>*/}
        {/*    </div>*/}
        {/*    <div className={`${s.btn} ${s.btn__secondary}`} onClick={() => {*/}
        {/*      showContactUsModal({ subjectDefault: 0 });*/}
        {/*    }}>*/}
        {/*      <p>Request a demo</p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {HOME_DATA_SECTIONS.map((data) => {
          return <SectionContent {...data} />;
        })}
      </div>
      <div className={s.caseStudy}>
        <CaseStudy />
      </div>
      <Section_7 />
    </div>
  );
}
