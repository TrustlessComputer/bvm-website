import React from 'react';
import s from './style.module.scss';
import HomeContainer from '../../components/HomeContainer';
import HomeTitle from '../../components/HomeTitle';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import LinesRandom from '@interactive/Signal/Lines/Random';

const Marketplace = () => {
  return (
    <div className={s.marketplace}>
      <HomeContainer className={s.container}>
        <div className={s.wrapContent}>
          <HomeTitle isBlack className={s.marketplace_title}>
            <span>BUILD. MINT. </span> EARN.
          </HomeTitle>
          <LinesRandom>
            <p className={s.marketplace_content}>
              Each AI model NFT is unique, verifiable, and securely stored on the blockchain, creating a new marketplace
              for AI innovation. Join us in pioneering the first AI models marketplace.
            </p>
          </LinesRandom>
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
