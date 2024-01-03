'use client';

import s from './styles.module.scss';

import Section1 from './Section_1';
import Section2 from './Section_2';
import Section3 from './Section_3';
import Section4 from './Section_4';
import Section5 from './Section_5';
import Section6 from './Section_6';
import Section7 from './Section_7';

const HomeModule = () => {
  return (
    <div className={s.container}>
      <Section1 />
      <Section2 />
      {/* <Section3 /> */}
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
    </div>
  );
};

export default HomeModule;
