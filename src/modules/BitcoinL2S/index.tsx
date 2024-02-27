'use client'

import Hero from '@/modules/BitcoinL2S/Hero';
import Loader from '@/modules/builder-landing/Loader';
import Architecture from '@/modules/bvm-sct-landing/Architecture';
import s from '@/modules/bvm-sct-landing/Architecture/styles.module.scss';
import React from 'react';
import CategoriesL2S from '@/modules/BitcoinL2S/CategoriesL2S';

const BitcoinL2S = () => {
  return (
    <div style={{backgroundColor: '#fff'}}>
      <Loader />
      <Hero />
      <Architecture>
        BVM reuses the battle-tested Optimism codebase. It is a modified version of the OP Stack that adds support for Bitcoin.
      </Architecture>
      <CategoriesL2S/>
    </div>
  )
}

export default BitcoinL2S;
