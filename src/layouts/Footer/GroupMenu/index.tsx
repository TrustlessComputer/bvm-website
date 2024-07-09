import React, { PropsWithChildren, ReactNode } from 'react';
import { FOOTER_DATA } from '@layouts/Footer/footer-datas';
import s from '@layouts/Footer/styles.module.scss';
import Link from 'next/link';


interface IGroup extends PropsWithChildren {
  className?: string,
  menu: any
}

export default function GroupMenu({ children, className, menu }: IGroup) {

  return <div className={`${s.wrap} ${className}`}>
    <h4 className={s.heading}>{children}</h4>
    <div className={s.content}>
      {
        menu.map((item) => (
          <div className={s.menu}>
            <h5 className={s.menu_heading}>{item.title}</h5>
            <ul className={s.menu_content}>
              {
                item.links.map((link) => (
                  <li key={link.link} className={s.link}>
                    <Link href={link.link}>
                      {link.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  </div>;
}
