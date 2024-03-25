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
      <img className={s.hero_icon} src={'/shards/shard_icon.webp'} alt={"shard_icon`"}/>
      <Heading title={title} desc={desc} className={s.hero_content} />
      <div className={s.hero_action}>
        <Button
          onClick={() => {
            router.push(SHARD_TOP_MINERS);
          }}
          className={`${s.btn}`}
          isOrange
        >
          Top SHARD miners
        </Button>
        <Button
          onClick={() => {
            window.open('https://nakachain.xyz/staking/dashboard', '_blank');
          }}
          className={`${s.btn}`}
          isOrange
        >
          Mine SHARD
        </Button>
      </div>
    </div>
  );
};

export default Hero;
