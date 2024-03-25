'use client';

import Button from '../Button';
import HomeContainer from '../HomeContainer';
import ImagePlaceholder from '@components/ImagePlaceholder';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import Fade from '@interactive/Signal/Fade';
import React from 'react';

const Footer = () => {
  const router = useRouter();
  return (
    <div className={`${s.footer}`}>
      <HomeContainer>
        <div className={`${s.mainContent}`}>
          <ImagePlaceholder
            src={'/ai-landing/logoFooter.png'}
            alt={'logoFooter'}
            width={15}
            height={15}
            className={`${s.logo}`}
          />
          <p className={`${s.title}`}>ETERNAL AI</p>
          <p className={`${s.description}`}>
            An open AI infrastructure that benefits all humankind and is owned by none.
          </p>
          <div className={`${s.wrapperBtn}`}>
            {/*<Button isWhite onClick={()=>{*/}
            {/*  router.push('/build')*/}
            {/*  // window.open('https://nakachain.xyz/launchpad')*/}
            {/*}} className={`${s.wrapperBtn_btn}`}>*/}
            {/*  /!*Launchpad*!/*/}
            {/*  Build AI*/}
            {/*</Button>*/}
            {/*<Button onClick={()=>{*/}
            {/*  router.push('/use')*/}
            {/*}} className={`${s.wrapperBtn_btn}`}>*/}
            {/*  Use AI*/}
            {/*  /!*Give it a try*!/*/}
            {/*</Button>*/}
            <Fade delayEnter={1.8}>
              <Button
                onClick={() => {
                  window.open('https://eternalai.org/');
                }}
                isOrange={true}
                className={`${s.btn}`}
              >
                Explore demos
              </Button>
            </Fade>
            <Fade delayEnter={2}>
              <Button
                onClick={() => {
                  router.push('/blockchains/customize');
                }}
                className={`${s.btn}`}
                isWhite
              >
                Deploy an AI chain
              </Button>
            </Fade>
            {/*<Fade delayEnter={2}>*/}
            {/*  <Button*/}
            {/*    onClick={() => {*/}
            {/*      router.push('/use');*/}
            {/*    }}*/}
            {/*    className={`${s.btn}`}*/}
            {/*    isWhite*/}
            {/*  >*/}
            {/*    Deploy an AI dapp*/}
            {/*  </Button>*/}
            {/*</Fade>*/}
          </div>
        </div>
      </HomeContainer>
    </div>
  );
};

export default Footer;
