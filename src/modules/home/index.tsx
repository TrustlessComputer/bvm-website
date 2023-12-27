'use client';

import s from './styles.module.scss';

import Section1 from './Section_1';
import Section2 from './Section_2';
import Section3 from './Section_3';

const HomePage = () => {
  return (
    <div className={s.container}>
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
};

export default HomePage;
