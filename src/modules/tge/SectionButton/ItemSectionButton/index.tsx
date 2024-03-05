'use client';

import React from 'react';
import { TButtonTGE } from '..';
import s from './styles.module.scss';
import { Button } from '@chakra-ui/react';

export default function ItemSectionButton({ data }: { data: TButtonTGE }) {
  return (
    <div className={s.item}>
      <div className={s.item_number}>
        <p>{data.number}</p>
      </div>
      <h4 className={s.item_title}>{data.title}</h4>
      <p className={s.item_desc}> {data.desc} </p>
      <div className={s.item_btn}>
        <Button
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
      </div>
    </div>
  );
}
