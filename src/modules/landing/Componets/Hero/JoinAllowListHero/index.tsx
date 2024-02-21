import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import ModalVideo from 'react-modal-video';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';

const DELAY = 6.5;
const JoinAllowListHero = ({ isFooter }: { isFooter?: boolean }) => {

  const delay = isFooter ? 0 : DELAY;

  return (

    <div className={`${s.container} ${isFooter && s.isFooter}`}>
      <div className={`container ${s.content}`}>
        <HeroLabel />
      </div>
    </div>

  );
};

export default JoinAllowListHero;
