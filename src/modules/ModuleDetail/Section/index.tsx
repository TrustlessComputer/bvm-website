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
            <Fade delay={0.2} from={{ y: 20 }} to={{ y: 0 }}>
              <div className={s.title}>
                {title}
              </div>
            </Fade>
            <div className={s.right}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Section;
