import React from 'react';
import s from './PricingV5.module.scss';
import { PRICE_DATA, PriceItemType } from './data';
import cn from 'classnames';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';

type Props = {};

const PriceItem = ({
  id,
  title,
  desc,
  note,
  link,
  isFirst = false,
}: PriceItemType & {
  isFirst?: boolean;
}) => {
  return (
    <div className={cn(s.price_item_wrapper, { [s.popular]: !!isFirst })}>
      <div className={s.price_item_title}>{title}</div>
      <div className={s.price_item_desc}>{desc}</div>
      <div className={s.price}>
        <Flex alignItems={'center'} justifyContent={'center'} gap="12px">
          <span className={s.price_usd}>$39</span>
          <span className={s.price_bvm}>100 BVM</span>
        </Flex>
        <p className={s.price_note}>per chain / day</p>
      </div>
      <Link
        target="_blank"
        href={link}
        rel="noopener noreferrer"
        className={s.cta_btn}
      >
        Launch now
      </Link>
      <div className={s.price_item_note}>{note}</div>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className={s.wrapper}>
      <Box maxW={'1800px'}>
        <div className={s.heading}>
          <h3>Let’s build on Bitcoin.</h3>
          <p>Pricing for crypto teams of all sizes.</p>
        </div>
        <div className={s.price_list}>
          {PRICE_DATA.map((item, index) => (
            <PriceItem key={item.id} {...item} isFirst={index === 0} />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Pricing;
