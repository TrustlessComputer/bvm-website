import { ReactElement } from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import { NavItem } from '@/layouts/Header/menuConfig';
import { openExtraLink } from '@/utils/helpers';

type PropD = {
  title: string;
  lists: NavItem[];
  primaryColor?: string;
  href?: string;
  target?: string;
};
const DropDown = ({
  title,
  lists,
  primaryColor,
  href,
  target,
}: PropD): ReactElement => {
  return (
    <div className={s.dropMenu}>
      <span
        onClick={() => {
          if (href) {
            return window.open(href, target);
          }
        }}
        className={`${s.dropMenu_label} ${s[primaryColor || 'black']}`}
      >
        {title}
        <SvgInset svgUrl={`/icons/ic-submenu.svg`} />
      </span>
      <ul className={s.dropMenu_list}>
        {lists.map((item, index) => {
          return (
            <li className={s.listItem} key={`${item.label}-${index}`}>
              <a
                href={item.href}
                target={item?.isNewWindow ? '_blank' : '_self'}
                style={{ color: primaryColor || 'black' }}
              >
                {item.label}
                <SvgInset
                  className={s.listItem_svg}
                  svgUrl={`/landing/images/basil_arrow-up-outline.svg`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDown;
