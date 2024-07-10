import s from './styles.module.scss';
import Link from 'next/link';
import React from 'react';

interface Props {
  title: string,
  links: { link: string, title: string }[]
}

export default function SubMenu({ title, links }: Props) {

  return <div className={s.menu}>
    <h5 className={s.menu_heading}>{title}</h5>
    <ul className={s.menu_content}>
      {
        links.map((link) => (
          <li key={link.link} className={s.link}>
            {
              link.link ? <Link href={link.link}>
                {link.title}
              </Link> : <>{link.title}</>
            }
          </li>
        ))
      }
    </ul>
  </div>;
}
