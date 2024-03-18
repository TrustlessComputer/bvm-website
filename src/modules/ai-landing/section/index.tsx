import Hero from '@/modules/ai-landing/section/Hero';
// import OpenAI from './OpenAI';
import React from 'react';
import OnChain from '@/modules/ai-landing/section/OnChain';
import SmartContract from '@/modules/ai-landing/section/SmartContact';
import Marketplace from '@/modules/ai-landing/section/Marketplace';
import Simple from '@/modules/ai-landing/section/Simple';
import Primitives from '@/modules/ai-landing/section/Primitives';

const LandingSection = () => {
  return (
    <div>
      <Hero />
      <OnChain />
      <SmartContract />
      {/*<OpenAI />*/}
      <Marketplace />
      <Simple />
      <Primitives />
    </div>
  );
};

export default LandingSection;
