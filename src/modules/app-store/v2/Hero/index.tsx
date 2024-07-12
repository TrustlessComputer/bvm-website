import React from 'react';
import SliderSlick from 'react-slick';
import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import HeroItem from '@/modules/app-store/v2/Hero/item';
import { IDApp } from '@/services/api/DAServices/types';
import { APP_STORE } from '@constants/route-path';
import { useRouter } from 'next/navigation';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';

const ContributionVideo = ({data} : {data: IDApp[]}) => {
  const router = useRouter();
  const { loggedIn, login } = useWeb3Auth();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    effect: 'fade',
    autoplay: true,
    dotsClass: 'slick-dots slick-thumb',
  };

  const handleSelectAppCb = (item: IDApp) => {
    if (loggedIn) {
      router.push(`${APP_STORE}/${item?.id}`);
    } else {
      login();
    }
  };

  return (
    <Box className={s.container}>
      <SliderSlick {...settings}>
        {data?.map((d) => {
          return <HeroItem data={d} handleSelectApp={handleSelectAppCb} />;
        })}
      </SliderSlick>
    </Box>
  );
};

export default ContributionVideo;
