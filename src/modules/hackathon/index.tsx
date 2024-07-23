import React from 'react';
import s from './HackathonModue.module.scss';
import cn from 'classnames';
import { Box, Text } from '@chakra-ui/react';
// import Image from 'next/image';
import { CDN_URL } from '@/config';
import Image from 'next/image';
import IcReward from '@/public/hackathon/ic-reward.svg';
import Fade from '@/interactive/Fade';

type Props = {};

const HackathonModule = (props: Props) => {
  return (
    <div className={cn(s.wrapper, 'containerV3')}>
      {/* <Fade from={{ y: 40 }} to={{ y: 0 }}> */}
      <div className={s.left}>
        <div className={s.reward}>
          <IcReward />
          <div>
            <Text
              fontFamily={'SF Pro Display'}
              fontSize={'16px'}
              fontWeight={500}
              letterSpacing={'0.48px'}
              lineHeight={'180%'}
              opacity={0.6}
              mb="9px"
            >
              Reward
            </Text>
            <p className={s.reward_amount}>$1.000.000</p>
          </div>
        </div>
        <div>
          <h2 className={s.title}>Lorem ipsum dolor sit amet consectetur.</h2>
          <p className={s.desc}>
            Lorem ipsum dolor sit amet consectetur. Posuere aliquam sed risus
            sit ac. Lorem fermentum suscipit scelerisque aenean a est morbi
            ornare. Tellus egestas pharetra dictum vitae aliquam morbi rutrum
            fusce. Diam.
          </p>
        </div>
        <div>
          <button className={s.reward_btn}>Take a reward</button>
        </div>
      </div>
      {/* </Fade> */}
      <div className={s.right}>
        <Box position={'relative'} aspectRatio={'773 / 685'}>
          <Image
            layout="fill"
            alt="hero thumbnail"
            src={`${CDN_URL}/images/hero-thumbnail-1.png`}
            // `}
          />
        </Box>
      </div>
    </div>
  );
};

export default HackathonModule;
