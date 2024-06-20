import React from 'react';
import s from './styles.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { Button } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';

const NBC = (): React.JSX.Element => {
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <div className={s.left_inner}>
          <Fade delay={0.1} delayEnter={0.1} from={{ y: 20 }} to={{ y: 0 }}>
            <p className={s.heading}>BVM Utilities</p>
          </Fade>
          <Fade delay={0.3} delayEnter={0.3} from={{ y: 40 }} to={{ y: 0 }}>
            <div className={s.content}>
              <p className={s.content_text}>
                <span className={s.content_text_bold}>Network fees.</span>{' '}
                <span className={s.content_text_orange}>$BVM</span> is the
                lifeblood of the BVM network. When you send BVM, use a dapp, or
                perform a rollup, you’ll pay fees in BVM.
              </p>
              <br />
              <p className={s.content_text}>
                <span className={s.content_text_bold}>Governance.</span> The
                community treasure consists of 50% of the BVM supply. This
                treasury will governed by BVM stakers once the network has
                become sufficiently decentralized.
              </p>
              <br />
              <p className={s.content_text}>
                <span className={s.content_text_bold}>Payments.</span> Along
                with BTC and developers’ tokens, BVM is a popular currency
                accepted within many dapps.
              </p>
            </div>
          </Fade>
          {/*<div className={s.wrapper_btn}>*/}
          {/*  <Button*/}
          {/*    color={'#1588FF'}*/}
          {/*    borderColor={'#1588FF'}*/}
          {/*    border={'1px'}*/}
          {/*    borderRadius={'40px'}*/}
          {/*    display={'flex'}*/}
          {/*    justifyContent={'center'}*/}
          {/*    alignItems={'center'}*/}
          {/*    py={'24px'}*/}
          {/*    width={{base: '100%' ,lg: '314px'}}*/}
          {/*    height={'74px'}*/}
          {/*    fontWeight={500}*/}
          {/*    fontSize={'18px'}*/}
          {/*    onClick={() => {*/}
          {/*      window.open('');*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Visit New Bitcoin City*/}
          {/*  </Button>*/}
          {/*  <Button*/}
          {/*    color={'#1588FF'}*/}
          {/*    borderColor={'#1588FF'}*/}
          {/*    border={'1px'}*/}
          {/*    borderRadius={'40px'}*/}
          {/*    display={'flex'}*/}
          {/*    justifyContent={'center'}*/}
          {/*    alignItems={'center'}*/}
          {/*    py={'24px'}*/}
          {/*    width={{base: '100%' ,lg: '314px'}}*/}
          {/*    height={'74px'}*/}
          {/*    fontWeight={500}*/}
          {/*    fontSize={'18px'}*/}
          {/*    onClick={() => {*/}
          {/*      window.open('');*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Build with Trustless Computer*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
      </div>
      <Fade delay={0.5} delayEnter={0.5} from={{ y: 30 }} to={{ y: 0 }}>
        <div className={s.right}>
          <ImagePlaceholder
            src={'/NBC.jpg'}
            alt={'NBC'}
            width={600}
            height={337}
            className={s.right_img}
          />
        </div>
      </Fade>
    </div>
  );
};

export default NBC;
