import React, { ReactElement } from 'react';
import s from '../styles.module.scss';
import Link from 'next/link';
import Fade from '@/interactive/Fade';

type Props = {
  disabledAnimation?: boolean
};

const Banner = (props: Props) => {
  const ContentReder = (): ReactElement => {
    return <div className={s.banner_wrapper}>
          {/*<span className={s.text}>*/}
          {/*  Say hello to Project Truly Open AI*/}
          {/*  /!*Get 58% interest with $BVM Staking.*!/*/}
          {/*</span>*/}
      <Link href={'/ai'} className={s.banner_link}>
        Say hello to Project Truly Open AI
        {/*Start here*/}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <rect width='24' height='24' fill='white' />
          <path
            d='M10.1145 9.79598C10.0306 9.79898 9.94702 9.78498 9.86862 9.75488C9.79022 9.72488 9.71872 9.67928 9.65832 9.62108C9.59802 9.56278 9.54992 9.49288 9.51712 9.41558C9.48432 9.33838 9.46742 9.25528 9.46742 9.17138C9.46742 9.08748 9.48432 9.00438 9.51712 8.92708C9.54992 8.84988 9.59802 8.77998 9.65832 8.72168C9.71872 8.66338 9.79022 8.61788 9.86862 8.58778C9.94702 8.55778 10.0306 8.54378 10.1145 8.54678H14.8285C14.9941 8.54688 15.153 8.61268 15.2701 8.72978C15.3872 8.84688 15.453 9.00578 15.4531 9.17138V13.8854C15.4561 13.9693 15.4421 14.0529 15.4121 14.1313C15.382 14.2097 15.3365 14.2812 15.2782 14.3416C15.2199 14.4019 15.15 14.45 15.0728 14.4828C14.9955 14.5156 14.9125 14.5325 14.8285 14.5325C14.7446 14.5325 14.6615 14.5156 14.5843 14.4828C14.507 14.45 14.4371 14.4019 14.3788 14.3416C14.3206 14.2812 14.275 14.2097 14.245 14.1313C14.2149 14.0529 14.2009 13.9693 14.2039 13.8854V10.6799L8.49402 16.3898C8.37682 16.507 8.21782 16.5728 8.05212 16.5728C7.88632 16.5728 7.72732 16.507 7.61012 16.3898C7.49292 16.2726 7.42712 16.1136 7.42712 15.9478C7.42712 15.7821 7.49292 15.6231 7.61012 15.5059L13.32 9.79598H10.1145Z'
            fill='black'
          />
        </svg>
      </Link>
    </div>;
  };

  return (
    <div className={`${s.banner_container} banner_container`}>
      {
        !props.disabledAnimation ? <Fade from={{ y: 0 }} to={{ y: 0 }} delay={.1}>
          <>
            {ContentReder()}
          </>
        </Fade> : <>{ContentReder()}</>
      }
    </div>
  );
};

export default Banner;
