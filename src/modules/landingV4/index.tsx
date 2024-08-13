import React from 'react';
import s from './styles.module.scss';
import HeroVideo from './components/HeroVideo';
import VideoSection from './components/VideoSection';
import { APPS_SECTION, ROLLUPS_SECTION } from './content';
import SectionBlock from './components/SectionBlock';

type Props = {};

const LandingV4Module = (props: Props) => {
  return (
    <div className={s.landing}>
      <HeroVideo />
      <SectionBlock {...APPS_SECTION} />
      <SectionBlock {...ROLLUPS_SECTION} />
      {/* <VideoSection /> */}
    </div>
  );
};

export default LandingV4Module;
