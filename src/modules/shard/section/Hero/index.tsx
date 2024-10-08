'use client';
import React from 'react';
import s from './style.module.scss';
import Heading from '../../components/Heading';
import { HeroData } from '../../data';
import Button from '@/modules/ai-landing/components/Button';
import { useRouter } from 'next/navigation';
import { SHARD_TOP_MINERS } from '@constants/route-path';

const Hero = () => {
  const { title, desc, link } = HeroData;
  const router = useRouter();

  return (
    <div className={s.hero}>
      <img className={s.hero_icon} src={'/shard/shard_icon.webp'} alt={"shard_icon`"}/>
      <Heading title={title} desc={desc} className={s.hero_content} />
      <div className={s.hero_action}>
        <Button
          onClick={() => {
            router.push(SHARD_TOP_MINERS);
          }}
          className={`${s.btn}`}
          isOrange
        >
          TOP SHARD MINERS
        </Button>
        <Button
          onClick={() => {
            router.push('/staking');
          }}
          className={`${s.btn}`}
          isOrange
        >
          START MINING SHARD
        </Button>
      </div>
    </div>
  );
};

export default Hero;
