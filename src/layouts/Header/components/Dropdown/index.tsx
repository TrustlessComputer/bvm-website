import { ReactElement } from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';

type PropD = {
  title: string, lists: string[], primaryColor?: string
};
const DropDown = ({ title, lists, primaryColor }: PropD): ReactElement => {

  return <div className={s.dropMenu}>
    <span className={`${s.dropMenu_label} ${s[primaryColor || 'black']}`}>
       {title}
      <SvgInset svgUrl={`icons/ic-submenu.svg`} />
    </span>
    <ul className={s.dropMenu_list}>
      {
        lists.map((link: any) => {
          return (<li className={s.listItem}>
            <a href={link.link} target={link?.isNewWindow ? '_blank' : '_self'} style={{ color: primaryColor || 'black' }}>
              {
                link.title
              }
              <SvgInset svgUrl={`landing/images/basil_arrow-up-outline.svg`} />
            </a>
          </li>);
        })
      }
    </ul>
  </div>;
};

export default DropDown;
