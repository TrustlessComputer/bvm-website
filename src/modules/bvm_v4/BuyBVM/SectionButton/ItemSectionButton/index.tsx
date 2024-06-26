'use client';

import React from 'react';
import s from './styles.module.scss';
import { Button } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';

export default function ItemSectionButton({
  data,
  delay,
  isLast,
}: {
  data: any;
  delay: number;
  isLast: boolean;
}) {
  return (
    <div className={s.item}>
      <Fade delay={delay} from={{ y: 10 }} to={{ y: 0 }}>
        <div className={s.item_number}>
          <p>{data.number}</p>
        </div>
      </Fade>
      <Chars delay={delay + 0.1}>
        <h4 className={`${s.item_title} ${isLast && s.isLast}`}>
          {data.title}
        </h4>
      </Chars>
      <Lines delay={delay + 0.2}>
        <p className={s.item_desc}> {data.desc} </p>
      </Lines>
      <div className={s.item_btn}>
        <Fade delay={delay + 0.3} from={{ y: 20 }} to={{ y: 0 }}>
          <Button
            onClick={() => {
              window.open(data.link);
            }}
            bgColor={'rgba(250, 78, 14, 1)'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'10px'}
            width={'140px'}
            height={'48px'}
            fontWeight={500}
            fontSize={'16px'}
            _hover={{
              bgColor: '#e5601b',
            }}
          >
            {data.btnTitle}
          </Button>
        </Fade>
      </div>
    </div>
  );
}
