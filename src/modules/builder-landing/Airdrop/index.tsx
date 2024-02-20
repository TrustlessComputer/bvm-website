import React from 'react';
import Image from 'next/image';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';

const Airdrop = (): React.JSX.Element => {
  return <div className={s.airdrop}>
    <div className='container'>
      <div className={s.content}>
        <Fade>
          <span className={s.label}>
          Earn the BVM Airdrop
        </span>
        </Fade>

        <span className={s.val}>
            <Chars>
          1,000,000 $BVM
               </Chars>
        </span>

        <div className={s.descs}>
          <Fade from={{ y: 10 }} to={{ y: 0 }} className={`${s.desc} ${s.desc__left}`}>
            Launch your Bitcoin L2 on BVM by May 21st with positive TVL, and share 1,000,000 $BVM in rewards!
          </Fade>
          <Fade from={{ y: 10 }} to={{ y: 0 }} delay={.2} className={`${s.desc} ${s.desc__right}`}>
            1M $BVM will be distributed proportionally among all projects based on their TVL.
          </Fade>
        </div>
        <Fade>
          <Image src={'/builder/airdrop.jpeg'} width={1440} height={586} alt={'airdrop'} />
        </Fade>
      </div>

    </div>
  </div>;
};

export default Airdrop;
