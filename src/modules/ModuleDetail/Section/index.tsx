import Fade from '@/interactive/Fade';
import s from './styles.module.scss';
import { PropsWithChildren } from 'react';

type TSection = PropsWithChildren & {
  title: string;
};

const Section = ({ title, children }: TSection) => {
  return (
    <div className={s.wrapper}>
      <div className="containerV3">
        <div className={s.inner}>
          <div className={s.title}><Fade delay={0.2} from={{ y: 20 }} to={{ y: 0 }}>{title}</Fade></div>
          <div className={s.right}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Section;
