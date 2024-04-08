import useWindowSize from '@/hooks/useWindowSize';
import s from './styles.module.scss';
import { useEffect } from 'react';
export default function Landing() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
        <h1>hello v2</h1>
    </div>
  );
}
