'use client';

import React from 'react';
import s from './style.module.scss';
import HomeContainer from '../../components/HomeContainer';
import HomeTitle from '../../components/HomeTitle';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import LinesRandom from '@interactive/Signal/Lines/Random';
import Button from '@/modules/ai-landing/components/Button';

const Marketplace = () => {
  return (
    <div className={s.marketplace}>
      <HomeContainer className={s.container}>
        <div className={s.wrapContent}>
          <LinesRandom>
            <p className={`${s.mainLable}`}>Create your own AI.</p>
          </LinesRandom>
          <HomeTitle isBlack className={s.marketplace_title}>
            FOR USERS
          </HomeTitle>
          <LinesRandom>
            <p className={s.marketplace_content}>
              Upload a few images, choose a neural network architecture, and train your own AI—it’s that easy. You can
              even mint your AI as an NFT and trade it. It’s a new way to interact with AI.
            </p>
          </LinesRandom>
          <p className={s.action}>
            <Button
              onClick={() => {
                window.open('https://eternalai.org/');
              }}
              isOrange={true}
              className={`${s.btn}`}
            >
              Train your own AI
            </Button>
          </p>
        </div>
      </HomeContainer>
      <div className={s.marketplace_image}>
        <ImagePlaceholder
          src={'/ai-landing/build-mint-earn.png'}
          alt={'marketplace'}
          width={1313}
          height={455}
        />
      </div>
    </div>
  );
};

export default Marketplace;
