import React from 'react';
import s from './styles.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';
import { Button } from '@chakra-ui/react';


const NBC = (): React.JSX.Element => {
  return <div className={s.wrapper}>
    <div className={s.left}>
      <div className={s.left_inner}>
        <p className={s.heading}>BVM UTILITIES</p>
        <div className={s.content}>
          <p className={s.content_text}>
            Network fees. <span>$BVM</span> is the lifeblood of the BVM network. When you send BVM, use a dapp, or perform a rollup, you’ll pay fees in BVM.
          </p>
          <br />
          <p className={s.content_text}>
            Governance. The community treasure consists of 50% of the BVM supply. This treasury will governed by BVM stakers once the network has become sufficiently decentralized.
          </p>
          <br />
          <p className={s.content_text}>
            Payments. Along with BTC and developers’ tokens, BVM is a popular currency accepted within many dapps.
          </p>
        </div>
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
    <div className={s.right}>
      <ImagePlaceholder src={'/NBC.jpg'} alt={'NBC'} width={600} height={337} className={s.right_img} />
    </div>
  </div>
}

export default NBC
