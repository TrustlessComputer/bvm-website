import React from 'react';
import GroupMenu from '@layouts/Footer/GroupMenu';
import { FOOTER_DATA } from '@layouts/Footer/footer-datas';
import s from './styles.module.scss';
import Link from 'next/link';

interface Props {
  className: string;
}

export default function Socials({ className }: Props) {

  return <GroupMenu title={'Socials'} className={className}>
    <ul className={s.menu}>
      {FOOTER_DATA.social.map(item => (
        <li>
          <Link href={item.link} target={item.target || '_self'}>
            <img src={item.icon} alt="icon" />
          </Link>
        </li>
      ))}
    </ul>
  </GroupMenu>;
}
