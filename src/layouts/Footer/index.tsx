'use client';

import s from './styles.module.scss';
import React from 'react';
import Productions from '@layouts/Footer/Productions';
import Solutions from '@layouts/Footer/Solutions';
import Socials from '@layouts/Footer/Socials';
import Link from 'next/link';

const Footer = () => {

  return (
    <div className={s.wrapper}>
      <div className={'containerV3'}>
        <div className={s.row}>
          <div className={s.logo}>
            <Link href={'/'}>
              <img src={'/icons/ic-bvm-footer.svg'} />
            </Link>
          </div>
          <Productions />
          <Solutions />
          <Socials className={s.social} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
