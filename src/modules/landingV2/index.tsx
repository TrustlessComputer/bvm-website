import s from './styles.module.scss';
import { useEffect } from 'react';
import SectionTitle from '@/modules/landingV2/Componets/SectionTitle';
import Modules from './Componets/Modules';
import Solutions from './Componets/Solutions';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      {/* <SectionTitle>hello v2</SectionTitle>  */}
      <Solutions />
      <Modules />
    </div>
  );
}
