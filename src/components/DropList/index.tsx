import { PropsWithChildren, ReactElement } from 'react';
import s from '@/layouts/Header/components/styles.module.scss';
import SvgInset from '@/components/SvgInset';

interface PropD extends PropsWithChildren{
   lists: {title: string, link: string}[]
};
const DropDown = ({ children, lists }: PropD): ReactElement => {

  return <div className={s.dropMenu}>
    <span className={`${s.dropMenu_label} dropMenu_label`}>
       {children}
    </span>
    <ul className={s.dropMenu_list}>
      {
        lists.map((link: any) => {
          return (<li className={s.listItem}>
            <a href={link.link} target={'_blank'}>
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
