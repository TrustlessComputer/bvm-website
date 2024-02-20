import React from 'react';
import Image from 'next/image';
import s from './styles.module.scss';

const Airdrop = (): React.JSX.Element => {
  return <div className={s.airdrop}>
    <div className='container'>
      <div className={s.content}>
        <span className={s.label}>
          Earn the BVM Airdrop
        </span>
        <span className={s.val}>
          1,000,000 $BVM
        </span>
        <div className={s.descs}>
          <div className={`${s.desc} ${s.desc__left}`}>
            Launch your Bitcoin L2 on BVM by May 21st with positive TVL, and share 1,000,000 $BVM in rewards!
          </div>
          <div className={`${s.desc} ${s.desc__right}`}>
            Launch your Bitcoin L2 on BVM by May 21st with positive TVL, and share 1,000,000 $BVM in rewards!
          </div>
        </div>
        <Image src={'/builder/airdrop.jpeg'} width={1440} height={586} alt={'airdrop'} />
      </div>

    </div>
  </div>;
};

export default Airdrop;
