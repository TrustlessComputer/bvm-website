import { ReactElement } from 'react';
import s from './styles.module.scss';

type PropD = {
  title: string;
  primaryColor?: string;
  href?: string;
  target?: string;
  color?: string;
  children: ReactElement;
};
const GroupDownItem = ({
                         title,
                         primaryColor,
                         href,
                         target,
                         color,
                         children,
                       }: PropD): ReactElement => {

  return (
    <div className={s.dropMenu}>
      <span
        onClick={() => {
          if (href) {
            return window.open(href, target);
          }
        }}
        style={{
          color: color,
        }}
        className={`${s.dropMenu_label} ${s[primaryColor || 'black']}`}
      >
        {title}
      </span>
      <div className={s.dropMenu_list}>
        {children}
      </div>
    </div>
  );
};

export default GroupDownItem;
