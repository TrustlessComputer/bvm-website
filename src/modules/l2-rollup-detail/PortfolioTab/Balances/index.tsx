import ListTable, { ColumnProp } from '@/components/ListTable';
import { ITokenChain } from '@/services/api/dapp/rollupl2-detail/interface';
import { formatCurrency } from '@/utils/format';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import React, { useContext, useMemo } from 'react';
import { L2RollupDetailContext } from '../../providers/l2-rollup-detail-context';
import s from './styles.module.scss';

const Balances = () => {
  const { rollupBalances, rollupTokensRate } = useContext(
    L2RollupDetailContext,
  );

  const labelConfig = {
    color: '#898989',
    fontSize: '16px',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'tx',
        label: 'Token',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          paddingLeft: '16px !important',
        },
        render(data: ITokenChain) {
          return (
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Flex
                direction={'row'}
                alignItems={'center'}
                gap={'12px'}
                position={'relative'}
              >
                <Image
                  w={'30px'}
                  h={'30px'}
                  borderRadius={'50%'}
                  src={data.icon_url || '/heartbeat/ic-token-default.svg'}
                  bg={'lightgray'}
                />
                <Text className={s.title}>{data.token_name}</Text>
                <Image
                  position={'absolute'}
                  left={'22px'}
                  top={'-6px'}
                  w={'16px'}
                  h={'16px'}
                  borderRadius={'50%'}
                  src={data.chain?.icon}
                  bg={'#fff'}
                />
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'exc',
        label: 'Price',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITokenChain) {
          const priceUSD = rollupTokensRate
            ? rollupTokensRate[data.token_name]
            : '';

          return (
            <Flex
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <Text className={s.title}>
                {priceUSD ? `$${formatCurrency(priceUSD, 0, 6)}` : '-'}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'exc',
        label: 'Amount',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITokenChain) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <Text className={s.title}>
                {formatCurrency(data.value, 2, 2)}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'usd',
        label: 'Value',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITokenChain) {
          const priceUSD = rollupTokensRate
            ? rollupTokensRate[data.token_name]
            : '';
          const usdValue = new BigNumber(data.value)
            .multipliedBy(new BigNumber(priceUSD))
            .toNumber();
          return (
            <Flex alignItems={'center'}>
              <Text className={s.title}>
                {priceUSD ? `$${formatCurrency(usdValue, 2, 2)}` : '-'}
              </Text>
            </Flex>
          );
        },
      },
    ];
  }, [rollupTokensRate]);

  return (
    <Box className={s.container}>
      <Box w={'100%'} className={s.wrapScroll} minH={'30vh'}>
        <ListTable
          data={rollupBalances}
          columns={columns}
          className={s.tableContainer}
          showEmpty
          emptyLabel={'No token found.'}
          emptyIcon={<Image src={'/icons/icon-empty.svg'} />}
        />
      </Box>
    </Box>
  );
};

export default Balances;
