'use client';
import React from 'react';
import s from './style.module.scss';
import Heading from '../../components/Heading';
import { HeroData } from '../../data';
import Button from '@/modules/ai-landing/components/Button';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const { title, desc, link } = HeroData;
  const router = useRouter();

  return (
    <div className={s.hero}>
      <Heading title={title} desc={desc} className={s.hero_content} />
      <Button
        onClick={() => {
          router.push('/rollups/customize');
        }}
        className={`${s.btn}`}
        isOrange
      >
        Build your AI module
      </Button>
    </div>
  );
};

export default Hero;
