import { ReactElement, useState } from 'react';
import s from './styles.module.scss';
import useHeaderMobile from '@layouts/HeaderV3/useHeaderMobile';

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
  const { isProductionOpen, show } = useHeaderMobile();

  return (

    <div className={`${s.dropMenu} menu-item`} onClick={show}>
      <span
        style={{
          color: color,
        }}
        className={`${s.dropMenu_label} ${s[primaryColor || 'black']}`}
      >
        {title}
      </span>
      <div className={`${s.dropMenu_list} ${isProductionOpen && s.isOpen}`}>
        {children}
      </div>
    </div>
  );
};

export default GroupDownItem;
