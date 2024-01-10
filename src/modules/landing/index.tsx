// import Article from './Componets/Article';
import Chain from './Componets/Chain';
import Comunity from './Componets/Comunity';
import Hero from './Componets/Hero';
import Tool from './Componets/Tool';
import s from './styles.module.scss';
import Scalable from '@/modules/landing/Componets/Scalable';
import Section_7 from '@/modules/landing/Componets/Section_7';
import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={s.landing}>
      <Hero />
      <Chain />
      <Tool />
      <Comunity />
      <Scalable />
      <Section_7 />
    </div>
  );
}
