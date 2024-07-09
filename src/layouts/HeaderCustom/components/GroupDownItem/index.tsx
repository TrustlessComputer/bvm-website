import { ReactElement, useState } from 'react';
import s from './styles.module.scss';
import useHeaderMobile, { IGroupType } from '@layouts/HeaderV3/useHeaderMobile';
import useWindowSize from '@hooks/useWindowSize';

type PropD = {
  title: string;
  primaryColor?: string;
  href?: string;
  target?: string;
  color?: string;
  children: ReactElement;
  typeGroup?: IGroupType
};
const GroupDownItem = ({
                         title,
                         primaryColor,
                         color,
                         children,
                         typeGroup,
                       }: PropD): ReactElement => {
  const { groupType, show } = useHeaderMobile();

  return (

    <div className={`${s.dropMenu} menu-item`} onClick={() => show(typeGroup || null)}>
      <span
        style={{
          color: color,
        }}
        className={`${s.dropMenu_label} ${s[primaryColor || 'black']}`}
      >
        {title}
      </span>
      <div className={`${s.dropMenu_list} ${groupType === typeGroup && s.isOpen}`}>
        <div className={s.dropMenu_list_inner}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default GroupDownItem;
