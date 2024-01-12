import { CDN_URL_IMAGES } from '@/configs';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import s from './styles.module.scss';
import cn from 'classnames';

const Tokenomic = () => {
  return (
    <Flex className={s.container}>
      <p className={s.title}>TOKENOMIC</p>
      <div className={s.indicator} />
      <Flex direction="column" alignItems="center">
        <img className={s.tokenomic} src={`${CDN_URL_IMAGES}/tokenomic.png`} alt="tokenomic" />
        <div className={s.grid}>
          <div className={cn(s.item, s.itemBorderRight)}>
            <p className={s.item_title}>Team Allocation</p>
            <p className={s.item_desc}>40%</p>
          </div>
          <div className={cn(s.item, s.itemBorderRight)}>
            <p className={s.item_title}>Community Allocation</p>
            <p className={s.item_desc}>40%</p>
          </div>
          <div className={s.item}>
            <p className={s.item_title}>Faucet</p>
            <p className={s.item_desc}>10%</p>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default Tokenomic;
