'use client';

import s from './styles.module.scss';
import React, { useState } from 'react';
import HomeContainer from '@/modules/ai-landing/components/HomeContainer';
import { FOOTER_DATA } from '@layouts/Footer/footer-datas';
import Index from '@layouts/Footer/GroupMenu';
import GroupMenu from '@layouts/Footer/GroupMenu';

const Footer = () => {

  return (
    <div className={s.wrapper}>
      <HomeContainer>
        <div className={s.row}>
          <GroupMenu menu={FOOTER_DATA.products}>Productions</GroupMenu>
          <GroupMenu menu={FOOTER_DATA.solutions}>Solutions</GroupMenu>
          {/*<GroupMenu menu={FOOTER_DATA.social}>Socials</GroupMenu>*/}
        </div>
      </HomeContainer>
    </div>
  );
};

export default Footer;
