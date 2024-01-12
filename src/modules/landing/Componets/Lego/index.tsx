import React from 'react';
import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';
import Fade from '@/interactive/Fade';
import { Button } from '@chakra-ui/react';

export default function Lego() {
  return (
    <div className={s.lego}>
      <div className={s.lego_content}>
        <h3 className={s.lego_content_title}>
          <Chars>
            Customize your Bitcoin L2 blockchain with <b>the best-of-breed building
            blocks.</b>
          </Chars>
        </h3>

        <div className={s.lego_content_description}>
          <Lines delay={.2}>
            Choose a rollup method, select a data availability layer, and then
            launch to the world — it’s that easy. You can even install default
            dapps like Uniswap, Compound, and DAO. It’s a new way to build
            blockchain.
          </Lines>
        </div>
        <Fade delay={0.4}>
          <Button
            bgColor={'#EF601B'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'10px'}
            minW={['180px']}
            height={'48px'}
            fontWeight={400}
            fontSize={'16px'}
            _hover={{
              bgColor: '#000',
            }}
          >
            {`Launch your Bitcoin L2`}
          </Button>
        </Fade>
      </div>
    </div>
  );
}
