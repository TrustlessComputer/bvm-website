import { ReactElement } from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import { NavItem } from '@/layouts/Header/menuConfig';

type PropD = {
  title: string;
  lists: NavItem[];
  primaryColor?: string;
  href?: string;
  target?: string;
  color?: string;
  Icon?: () => ReactElement;
};
const DropDown = ({
  title,
  lists,
  primaryColor,
  href,
  target,
  color,
  Icon,
}: PropD): ReactElement => {
  const SingleList = (): ReactElement => {
    return (
      <ul className={s.dropMenu_list}>
        {lists.map((item) => {
          return (
            <li className={s.listItem}>
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
    );
  };

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
        {Icon && <Icon />}
      </span>
      <SingleList />
    </div>
  );
};

export default DropDown;
