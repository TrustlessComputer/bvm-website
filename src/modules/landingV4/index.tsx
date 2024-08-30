import React from 'react';
import s from './styles.module.scss';
import HeroVideo from './components/HeroVideo';
import {
  APPS_SECTION,
  BOB_SECTION,
  ROLLUPS_SECTION,
  RESEARCH_SECTION,
  OPENSOURCE_SECTION,
  NEWS_SECTION,
  GAME_SECTION,
} from './content';
import SectionBlock from './components/SectionBlock';

type Props = {};

const LandingV4Module = (props: Props) => {
  return (
    <div className={s.landing}>
      <HeroVideo />
      <SectionBlock {...APPS_SECTION} />

      <SectionBlock {...GAME_SECTION} />
      <SectionBlock {...BOB_SECTION} />

      <SectionBlock {...ROLLUPS_SECTION} />
      {/* <SectionBlock {...PARTNER_SECTION} /> */}
      <SectionBlock {...RESEARCH_SECTION} />

      <SectionBlock {...OPENSOURCE_SECTION} />
      <SectionBlock {...NEWS_SECTION} />

      {/* <VideoSection /> */}
    </div>
  );
};

export default LandingV4Module;
