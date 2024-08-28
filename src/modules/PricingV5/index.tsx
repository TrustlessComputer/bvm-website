'use client';
import { Box, Flex } from '@chakra-ui/react';
import cn from 'classnames';
import Link from 'next/link';
import { PRICE_DATA, PriceItemType } from './data';
import enhance from './enhance';
import s from './PricingV5.module.scss';
import { usePricingTemplate } from './usePricingTemplate';

type Props = {};

const PriceItem = ({
  id,
  title,
  desc,
  note,
  link,
  isFirst = false,
  priceUSD = '0',
  priceBVM = '0',
}: PriceItemType & {
  isFirst?: boolean;
  priceUSD: string;
  priceBVM: string;
}) => {
  return (
    <div className={cn(s.price_item_wrapper, { [s.popular]: !!isFirst })}>
      <div className={s.price_item_title}>{title}</div>
      <div className={s.price_item_desc}>{desc}</div>
      <div className={s.price}>
        <Flex alignItems={'center'} justifyContent={'center'} gap="12px">
          <span className={s.price_usd}>${priceUSD}</span>
          <span className={s.price_bvm}>{priceBVM} BVM</span>
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
  const { dataList } = usePricingTemplate();

  return (
    <div className={s.wrapper}>
      <Box maxW={'1800px'} mx="auto">
        <div className={s.heading}>
          <h3>Let’s build on Bitcoin.</h3>
          <p>Pricing for crypto teams of all sizes.</p>
        </div>
        <div className={s.price_list}>
          {PRICE_DATA.map((item, index) => (
            <PriceItem
              key={item.id}
              {...item}
              isFirst={index === 0}
              priceUSD={dataList[index]?.priceUSDPerDayFormated}
              priceBVM={dataList[index]?.priceBVMPerDayFormated}
            />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default enhance(Pricing);
