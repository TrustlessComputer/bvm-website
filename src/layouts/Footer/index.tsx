'use client';

import s from './styles.module.scss';
import React from 'react';
import HomeContainer from '@/modules/ai-landing/components/HomeContainer';
import Productions from '@layouts/Footer/Productions';
import Solutions from '@layouts/Footer/Solutions';
import Socials from '@layouts/Footer/Socials';
import Link from 'next/link';

const Footer = () => {

  return (
    <div className={s.wrapper}>
      <HomeContainer>
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
      </HomeContainer>
    </div>
  );
};

export default Footer;
