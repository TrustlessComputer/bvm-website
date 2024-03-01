import Image from 'next/image';
import s from './style.module.scss';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import React from 'react';

const BVM_TGE_START = '2024-03-05 08:30:00';

export default function Hero() {

  return <div className={s.hero}>
    <div className='container'>
      <div className='hero_inner'>
        <h1>$BVM TGE is coming on March 5th on Naka DEX</h1>
      </div>
      <Countdown
        className={s.countDown_time}
        expiredTime={dayjs.utc(BVM_TGE_START, 'YYYY-MM-DD HH:mm:ss').toString()}
        hideIcon={true}
        type="column"
        hideZeroHour={true}
      />
      {/*<div className={s.hero_countdown}>
        <div className={s.hero_countdown_item}>
          <div className={s.val}>7</div>
          <div className={s.label}>Days</div>
        </div>
        <div className={s.hero_countdown_item}>
          <div className={s.val}>12</div>
          <div className={s.label}>hours</div>
        </div>
        <div className={s.hero_countdown_item}>
          <div className={s.val}>25</div>
          <div className={s.label}>Minutes</div>
        </div>
        <div className={s.hero_countdown_item}>
          <div className={s.val}>44</div>
          <div className={s.label}>Seconds</div>
        </div>
      </div>*/}
      <div className={s.boxContent}>
        <div className={s.boxContent_icon}>
          <Image width={48} height={48} src={'/builder/icons-tw.svg'} alt={'icon'} />
        </div>
        <div className={s.boxContent_text}>
          <div className={s.desc}>
            Claim $BVM with 0 fee (for public sale backers)
          </div>

        </div>
      </div>

      <div className={s.boxContent}>
        <div className={s.boxContent_icon}>
          <Image width={48} height={48} src={'/builder/icon-stake.svg'} alt={'icon'} />
        </div>
        <div className={s.boxContent_text}>
          <div className={s.desc}>
            Stake $BVM
          </div>

          <ul>
            <li>Earn attractive APR</li>
            <li>
              Airdrops from Bitcoin L2 projects
            </li>
            <li>
              Access to Bitcoin L2 Launchpad (coming on March 12th)
            </li>
          </ul>
        </div>
      </div>

      <div className={s.boxContent}>
        <div className={s.boxContent_icon}>
          <Image width={48} height={48} src={'/builder/icon-buy.svg'} alt={'icon'} />
        </div>
        <div className={s.boxContent_text}>
          <div className={s.desc}>
            Buy $BVM using $BTC and $ETH (March 12th)
          </div>

        </div>
      </div>
      <div className={s.wbtn}>
        <a className={s.btn} href={'https://nakachain.xyz/market'} target={'_blank'}>
          Join Naka DEX now
        </a>
      </div>
    </div>
  </div>;
}
