'use client';

import s from './styles.module.scss';
import React, { useState } from 'react';
import HomeContainer from '@/modules/ai-landing/components/HomeContainer';
import { FOOTER_DATA } from '@layouts/Footer/footer-datas';
import Index from '@layouts/Footer/GroupMenu';

const Footer = () => {

  return (
    <div className={s.wrapper}>
      <HomeContainer>
        <div className="row">
          <Index menu={FOOTER_DATA.products}>Productions</Index>
          <Index>Solutions</Index>
          <Index>Socials</Index>
        </div>
      </HomeContainer>
    </div>
  );
};

export default Footer;
