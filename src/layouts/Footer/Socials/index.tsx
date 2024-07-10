import React from 'react';
import GroupMenu from '@layouts/Footer/GroupMenu';
import { FOOTER_DATA } from '@layouts/Footer/footer-datas';
import s from './styles.module.scss';

interface Props {
  className: string;
}

export default function Socials({ className }: Props) {

  return <GroupMenu title={'Socials'} className={className}>
    <ul className={s.menu}>
      {FOOTER_DATA.social.map(item => (
        <li>
          <a href={item.link}>
            <img src={item.icon} alt="icon" />
          </a>
        </li>
      ))}
    </ul>
  </GroupMenu>;
}
