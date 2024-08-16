/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import ListTable, { ColumnProp } from '@/components/ListTable';
import { MIN_DECIMAL } from '@/constants/constants';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import CRollupL2API from '@/services/api/dapp/rollupl2';
import { IRollupL2Info } from '@/services/api/dapp/rollupl2/interface';
import { calculateTimeAgo, formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';
import {
  Box,
  Flex,
  Text,
  Tooltip,
  Image,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Grid,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import { orderBy } from 'lodash';
import { DotLottiePlayer } from '@dotlottie/react-player';

enum SortRollupType {
  name,
  block,
  tps,
  mgas,
  kbs,
  rollup,
  da,
  settle,
  tvl,
  lastBlock,
  verification,
  fdv,
  level,
  fee,
}

interface ISort {
  type: SortRollupType;
  ascending?: boolean;
}

const L2Rollup = () => {
  const { showContactUsModal } = useContactUs();

  const [data, setData] = useState<IRollupL2Info[]>([]);

  const hasIncrementedPageRef = useRef(false);
  const rollupL2Api = new CRollupL2API();

  const [currentSort, setCurrentSort] = useState<ISort>({
    type: SortRollupType.level,
    ascending: false,
  });

  const total = useMemo(() => {
    const tps = data.reduce((accum, item) => accum + Math.abs(item.tps), 0);
    const mgas = data.reduce((accum, item) => accum + item.mgas, 0);
    const kbs = data.reduce((accum, item) => accum + Math.abs(item.kbs), 0);

    return {
      tps,
      mgas,
      kbs,
    };
  }, [data]);

  const bitcoinRollup = useMemo(() => {
    return data.find((rollup) => compareString(rollup.name, 'bitcoin'));
  }, [data]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 2000); // 2s
    return () => {
      clearInterval(interval);
    };
  }, [currentSort]);

  const fetchData = async () => {
    try {
      const res = await rollupL2Api.getRollupL2Info();
      let data: IRollupL2Info[] = [];

      if (currentSort.ascending === undefined) {
        data = orderBy(
          res,
          [(item) => compareString(item.name, 'Bitcoin')],
          ['desc'],
        );
      } else {
        data = orderBy(
          res,
          [
            (item) => compareString(item.name, 'Bitcoin'),
            (item) => {
              switch (currentSort.type) {
                case SortRollupType.name:
                  return item.name;
                case SortRollupType.block:
                  return Number(item.block_number || '0');
                case SortRollupType.fdv:
                  return Number(item.fdv_usd || '0');
                case SortRollupType.tps:
                  return Number(item.tps || '0');
                case SortRollupType.mgas:
                  return Number(item.mgas || '0');
                case SortRollupType.kbs:
                  return Number(item.kbs || '0');
                case SortRollupType.rollup:
                  return item.stack;
                case SortRollupType.da:
                  return item.da;
                case SortRollupType.settle:
                  return item.settlement;
                case SortRollupType.tvl:
                  return Number(item.tvl_btc || '0');
                case SortRollupType.lastBlock:
                  return item.block_time;
                case SortRollupType.verification:
                  return item.verification;
                case SortRollupType.level:
                  return Number(item.level === '-' ? '0' : item.level || '0');
                case SortRollupType.fee:
                  return Number(item.fee_btc || '0');
                default:
                  return Number(item.mgas || '0');
              }
            },
          ],
          ['desc', currentSort.ascending ? 'asc' : 'desc'],
        );
      }

      setData(data);
    } catch (error) {
    } finally {
      hasIncrementedPageRef.current = false;
    }
  };

  const labelConfig = {};

  const renderLabel = (
    name: string,
    sortType: SortRollupType,
    tooltip?: any,
  ) => {
    return (
      <Flex
        gap={'4px'}
        cursor={'pointer'}
        alignItems={'center'}
        onClick={() =>
          setCurrentSort({
            type: sortType,
            ascending:
              currentSort.ascending === undefined ||
              currentSort.type !== sortType
                ? true
                : currentSort.ascending === false
                ? undefined
                : !currentSort.ascending,
          })
        }
      >
        {tooltip ? (
          <Tooltip label={tooltip}>
            <Flex cursor={'pointer'} direction={'row'} gap={'4px'}>
              <Text>{name || '-'}</Text>
              <Image
                cursor={'pointer'}
                width="16px"
                height="16px"
                alt="tooltip"
                src={'/icons/ic-tooltip-blue.svg'}
              />
            </Flex>
          </Tooltip>
        ) : (
          <>{name}</>
        )}
        <Image
          width="24px"
          height="24px"
          src={
            currentSort.ascending === undefined || currentSort.type !== sortType
              ? `/heartbeat/ic-sort.svg`
              : `/heartbeat/ic-sort-${
                  !currentSort.ascending ? 'asc' : 'desc'
                }.svg`
          }
        />
      </Flex>
    );
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'network',
        label: (
          <Box pl={'8px'}>{renderLabel('Network', SortRollupType.name)}</Box>
        ),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info, _, index) {
          return (
            <Popover>
              <PopoverTrigger>
                <Flex
                  alignItems={'center'}
                  width={'100%'}
                  justifyContent={'space-between'}
                  paddingLeft={'16px'}
                  cursor={'pointer'}
                  _hover={{
                    textDecoration: 'underline',
                  }}
                >
                  <Text className={s.title}>{data.name}</Text>
                </Flex>
              </PopoverTrigger>
              <PopoverContent
                className={s.popoverContent}
                bg="#fff"
                w={'360px'}
                _focus={{
                  boxShadow: 'none !important',
                }}
              >
                <PopoverBody
                  className={s.popoverBody}
                  backgroundColor="white !important"
                  w={'100%'}
                >
                  <Text fontSize={'16px'} textAlign={'center'}>
                    {data.name}
                  </Text>
                  <Flex direction={'column'} gap={'4px'} mt={'16px'}>
                    <Flex direction={'row'} justifyContent={'space-between'}>
                      <Text>Website</Text>
                      <Text
                        cursor={'pointer'}
                        _hover={{
                          textDecoration: 'underline',
                        }}
                        onClick={() =>
                          data.website ? window.open(data.website) : {}
                        }
                        maxW="200px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {data.website
                          ? data.website.replaceAll('https://', '')
                          : '-'}
                      </Text>
                    </Flex>
                    <Flex direction={'row'} justifyContent={'space-between'}>
                      <Text>Explorer</Text>
                      <Text
                        cursor={'pointer'}
                        _hover={{
                          textDecoration: 'underline',
                        }}
                        onClick={() =>
                          data.explorer ? window.open(data.explorer) : {}
                        }
                        maxW="200px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {data.explorer
                          ? data.explorer.replaceAll('https://', '')
                          : '-'}
                      </Text>
                    </Flex>
                    <Flex direction={'row'} justifyContent={'space-between'}>
                      <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                        <Text>Type</Text>
                        {/* <Tooltip label={'The tech stack used by the network.'}>
                          <Image
                            cursor={'pointer'}
                            width="18px"
                            height="18px"
                            alt="tooltip"
                            src={'/icons/ic-tooltip-blue.svg'}
                          />
                        </Tooltip> */}
                      </Flex>
                      <Text>{data.stack || '-'}</Text>
                    </Flex>
                    <Flex direction={'row'} justifyContent={'space-between'}>
                      <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                        <Text>DA</Text>
                        <Tooltip
                          label={
                            'Where Data Availability is located. Important for the network security.'
                          }
                        >
                          <Image
                            cursor={'pointer'}
                            width="18px"
                            height="18px"
                            alt="tooltip"
                            src={'/icons/ic-tooltip-blue.svg'}
                          />
                        </Tooltip>
                      </Flex>
                      <Text>{data.da || '-'}</Text>
                    </Flex>
                    <Flex direction={'row'} justifyContent={'space-between'}>
                      <Text>Provider</Text>
                      <Text>{data.provider || '-'}</Text>
                    </Flex>
                    {/* {index > 2 && (
                      <Flex direction={'row'} justifyContent={'flex-end'}>
                        <Text
                          cursor={'pointer'}
                          mt={'4px'}
                          color={'blue !important'}
                          textDecoration={'underline'}
                          onClick={() => {
                            const path = data.name.split(' ')[0].toLowerCase();
                            window.open(
                              `https://www.bitcoinlayers.org/layers/${path}`,
                            );
                          }}
                        >
                          More detail
                        </Text>
                      </Flex>
                    )} */}
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          );
        },
      },
      {
        id: 'level',
        label: renderLabel(
          'Level',
          SortRollupType.level,
          <Flex direction={'column'} py={'8px'} px={'4px'} gap={'8px'}>
            <Grid gridTemplateColumns={'64px 1fr'}>
              <Text w={'100px !important'}>Level 1</Text>
              <Text>Base layer is not Bitcoin.</Text>
            </Grid>
            <Grid gridTemplateColumns={'64px 1fr'}>
              <Text w={'100px !important'}>Level 2</Text>
              <Text>
                Base layer is Bitcoin, using external DA, without state
                verification.
              </Text>
            </Grid>
            <Grid gridTemplateColumns={'64px 1fr'}>
              <Text w={'120px'}>Level 3</Text>
              <Text>
                Base layer is Bitcoin, using Bitcoin for DA, without state
                verification.
              </Text>
            </Grid>
            <Grid gridTemplateColumns={'64px 1fr'}>
              <Text w={'120px'}>Level 4</Text>
              <Text>
                Base layer is Bitcoin, using Bitcoin for DA, with state
                verification by a light client.
              </Text>
            </Grid>
            <Grid gridTemplateColumns={'64px 1fr'}>
              <Text w={'100px !important'}>Level 5</Text>
              <Text>
                Base layer is Bitcoin, using Bitcoin for DA, with state
                verification natively in Bitcoin using BitVM or OP_CAT.
              </Text>
            </Grid>
          </Flex>,
        ),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          let tooltip = '';
          let bg = 'transparent';
          let txColor = '#000';
          switch (data.level) {
            case '1':
              tooltip = 'Base layer is not Bitcoin.';
              bg = '#E7E7E7';
              break;
            case '2':
              tooltip =
                'Base layer is Bitcoin, using external DA, without state verification.';
              bg = '#BAEDBD';
              txColor = '#006E46';
              break;
            case '3':
              tooltip =
                'Base layer is Bitcoin, using Bitcoin for DA, without state verification.';
              bg = '#B1E3FF';
              txColor = '#4F43E2';
              break;
            case '4':
              tooltip =
                'Base layer is Bitcoin, using Bitcoin for DA, with state verification by a light client.';
              bg = '#F8F0AC';
              txColor = '#CD5600';
              break;
            case '5':
              tooltip =
                'Base layer is Bitcoin, using Bitcoin for DA, with state verification natively in Bitcoin using BitVM or OP_CAT.';
              bg = '#FFA751';
              txColor = '#E04300';
              break;
            default:
              break;
          }
          return (
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              width={'100%'}
              px={'2px'}
              minW={'80px'}
              borderRadius={'4px'}
              h={'24px'}
              bg={bg}
            >
              {data.level && data.level !== '-' ? (
                <Tooltip label={tooltip}>
                  <Text
                    cursor={'pointer'}
                    className={s.title}
                    fontSize={'14px !important'}
                  >
                    LEVEL {data.level || '-'}
                  </Text>
                </Tooltip>
              ) : (
                <Text cursor={'pointer'} className={s.title}>
                  {'-'}
                </Text>
              )}
            </Flex>
          );
        },
      },
      // {
      //   id: 'fee',
      //   label: renderLabel('Bitcoin Rent', SortRollupType.fee),
      //   labelConfig,
      //   config: {
      //     borderBottom: 'none',
      //     fontSize: '14px',
      //     fontWeight: 500,
      //     verticalAlign: 'middle',
      //     letterSpacing: '-0.5px',
      //   },
      //   render(data: IRollupL2Info) {
      //     const isUnderReview = Number(data.fee_btc) === 0;
      //     return (
      //       <Flex
      //         alignItems={'center'}
      //         width={'100%'}
      //         px={'2px'}
      //         minW={'112px'}
      //       >
      //         <Text className={s.title}>
      //           {isUnderReview
      //             ? '-'
      //             : `${formatCurrency(data.fee_btc, 0, 1)} BTC`}
      //         </Text>
      //       </Flex>
      //     );
      //   },
      // },
      // {
      //   id: 'fdv',
      //   label: renderLabel('FDV', SortRollupType.fdv),
      //   labelConfig,
      //   config: {
      //     borderBottom: 'none',
      //     fontSize: '16px',
      //     fontWeight: 500,
      //     verticalAlign: 'middle',
      //     letterSpacing: '-0.5px',
      //   },
      //   render(data: IRollupL2Info) {
      //     return (
      //       <Flex
      //         alignItems={'center'}
      //         width={'100%'}
      //         justifyContent={'space-between'}
      //         px={'2px'}
      //       >
      //         <Text className={s.title}>
      //           {data.fdv_usd && data.fdv_usd !== '0'
      //             ? `$${formatCurrency(data.fdv_usd, MIN_DECIMAL, MIN_DECIMAL)}`
      //             : '-'}
      //         </Text>
      //       </Flex>
      //     );
      //   },
      // },
      {
        id: 'block',
        label: renderLabel('Block', SortRollupType.block),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              cursor="pointer"
              px={'4px'}
              onClick={() => {
                window.open(data.explorer);
              }}
              _hover={{
                textDecoration: 'underline',
              }}
            >
              <Text className={s.title}>{data.block_number}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'tps',
        label: renderLabel('TPS', SortRollupType.tps),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex gap={3} alignItems={'center'} width={'102px'} px={'4px'}>
              <Text className={s.title}>
                {data?.tps
                  ? formatCurrency(
                      Math.abs(data?.tps),
                      MIN_DECIMAL,
                      MIN_DECIMAL,
                    )
                  : '-'}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'mgas',
        label: renderLabel('Mgas/s', SortRollupType.mgas),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex gap={3} alignItems={'center'} width={'102px'} px={'4px'}>
              <Text className={s.title}>
                {data?.mgas
                  ? formatCurrency(data?.mgas, MIN_DECIMAL, MIN_DECIMAL)
                  : '-'}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'kbs',
        label: renderLabel('Kb/s', SortRollupType.kbs),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex gap={3} alignItems={'center'} width={'92px'} px={'4px'}>
              <Text className={s.title}>
                {data?.kbs
                  ? formatCurrency(
                      Math.abs(data?.kbs),
                      MIN_DECIMAL,
                      MIN_DECIMAL,
                    )
                  : '-'}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'stack',
        label: renderLabel('Type', SortRollupType.rollup),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex gap={3} alignItems={'center'} width={'100%'} px={'4px'}>
              <Text className={s.title}>{data.stack || '-'}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'da',
        label: renderLabel('DA', SortRollupType.da),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex gap={3} alignItems={'center'} width={'100%'} px={'4px'}>
              <Text className={s.title}>{data.da || '-'}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'verification',
        label: renderLabel('Verification', SortRollupType.verification),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          const haveLink = !!data.verification_url;
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              maxW={'128px'}
              px={'2px'}
              cursor={haveLink ? 'pointer' : 'unset'}
              onClick={() => haveLink && window.open(data.verification_url)}
            >
              <Text
                className={s.title}
                textDecoration={haveLink ? 'underline' : 'unset'}
              >
                {data.verification || '-'}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'settlement',
        label: renderLabel('Base Layer', SortRollupType.settle),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex
              alignItems={'center'}
              width={'100%'}
              px={'2px'}
              minW={'104px'}
            >
              <Text className={s.title}>{data.settlement || '-'}</Text>
            </Flex>
          );
        },
      },

      {
        id: 'tvl',
        label: renderLabel('TVL', SortRollupType.tvl),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          const isUnderReview = Number(data.tvl_btc) === 0;
          return (
            <Flex alignItems={'center'} width={'100%'} px={'4px'}>
              <Text className={s.title}>
                {isUnderReview
                  ? '-'
                  : `${formatCurrency(data.tvl_btc, 0, 3)} BTC`}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'last_block',
        label: renderLabel('Last Block', SortRollupType.lastBlock),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex alignItems={'center'} minW={'110px'} pl={'4px'}>
              <Text className={s.title}>
                {calculateTimeAgo(data.block_time)}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'info',
        label: 'Info',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IRollupL2Info) {
          return (
            <Flex alignItems={'center'} minW={'104px'} px={'8px'} gap={'12px'}>
              {data.website && (
                <Image
                  _hover={{
                    opacity: 0.8,
                  }}
                  onClick={() => window.open(data.website)}
                  cursor={'pointer'}
                  width="24px"
                  height="24px"
                  src={'/heartbeat/ic-website.svg'}
                />
              )}
              {data.explorer && (
                <Image
                  _hover={{
                    opacity: 0.8,
                  }}
                  onClick={() => window.open(data.explorer)}
                  cursor={'pointer'}
                  width="20px"
                  height="20px"
                  src={'/heartbeat/ic-explorer.svg'}
                />
              )}
              {data.bitlayer_url && (
                <Image
                  _hover={{
                    opacity: 0.8,
                  }}
                  onClick={() => window.open(data.bitlayer_url)}
                  cursor={'pointer'}
                  width="20px"
                  height="20px"
                  src={'/heartbeat/ic-bitcoinlayer.svg'}
                />
              )}
            </Flex>
          );
        },
      },
    ];
  }, [currentSort]);

  const renderItemTotal = (
    title: string,
    value: string,
    tooltip?: string,
    mulValue?: string,
  ) => {
    return (
      <Flex direction={'column'} alignItems={'center'}>
        <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
          <Text className={s.total_title}>{title}</Text>
          {tooltip && (
            <Tooltip label={tooltip}>
              <Image
                cursor={'pointer'}
                width="18px"
                height="18px"
                alt="tooltip"
                src={'/icons/ic-tooltip-blue.svg'}
              />
            </Tooltip>
          )}
        </Flex>
        <Text fontSize={'18px'} fontWeight={'500'}>
          {value}
        </Text>
        {mulValue && (
          <Text color={'green'} fontSize={'16px'} fontWeight={'500'}>
            {mulValue}
          </Text>
        )}
      </Flex>
    );
  };

  return (
    <Box className={s.container}>
      <Flex direction={'column'} w="100%" maxW={'1800px'} alignItems={'center'}>
        <Flex alignItems="center" gap="6px" my={'12px'}>
          <Text fontSize={'20px'}>Project Bitcoin Heartbeats</Text>
          <DotLottiePlayer
            autoplay
            loop
            className={s.lottie}
            speed={1.8}
            src="/heartbeat/heart.lottie"
          />
        </Flex>
        <Text
          fontSize={{ base: '32px', md: '40px' }}
          lineHeight={{ base: '44px', md: '52px' }}
          textAlign={'center'}
          mb={'28px'}
          mt={'12px'}
        >
          Welcome to the future of Bitcoin.
        </Text>
        <Text
          className={s.fontType2}
          textAlign={'center'}
          maxW={'1024px'}
          fontSize={'20px'}
          fontWeight={'400'}
          color={'#494846'}
          mb={'24px'}
        >
          The BVM team created Project Bitcoin Heartbeats to provide transparent
          and verifiable insights into new technologies that are transforming
          Bitcoin beyond mere currency. Follow their progress and support their
          innovations.
        </Text>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems={'center'}
          gap={{ base: '0px', md: '8px' }}
          mb={'48px'}
        >
          <Text
            className={s.fontType2}
            fontSize={'20px'}
            fontWeight={'400'}
            color={'#494846'}
          >
            Are you a builder?️
          </Text>
          <Flex
            className={s.fontType2}
            fontSize={'20px'}
            fontWeight={'500'}
            color={'#FA4E0E'}
            cursor={'pointer'}
            onClick={() =>
              showContactUsModal({
                title: 'Contact Us',
                description: `Have questions or need assistance? We're here to help! Please fill out the form below, and we will get back to you shortly.`,
              })
            }
            _hover={{
              opacity: 0.8,
            }}
            direction={'row'}
            alignItems={'center'}
          >
            <Text>Submit your project</Text>
            <Image maxW={'40px'} src={'/heartbeat/ic-submit.svg'} />
          </Flex>
        </Flex>
        <Flex
          className={s.totalContainer}
          bg="#FAFAFA"
          w="100%"
          direction={'column'}
          gap={'8px'}
          maxW={'1400px'}
        >
          <Text fontSize={'24px'} fontWeight={'600'} textAlign={'center'}>
            Total
          </Text>
          <Flex w="100%" direction={'row'} justifyContent={'space-evenly'}>
            {renderItemTotal(
              'TPS',
              formatCurrency(total.tps, MIN_DECIMAL, MIN_DECIMAL),
              'The total transactions per second',
              bitcoinRollup
                ? `(${formatCurrency(
                    Math.abs(total.tps / bitcoinRollup.tps),
                    MIN_DECIMAL,
                    MIN_DECIMAL,
                  )}x)`
                : '-',
            )}
            {renderItemTotal(
              'Mgas/s',
              formatCurrency(total.mgas, MIN_DECIMAL, MIN_DECIMAL),
              'The total megagas (Million Gas) per second',
              '',
            )}
            {renderItemTotal(
              'KB/s',
              formatCurrency(total.kbs, MIN_DECIMAL, MIN_DECIMAL),
              'Total KB per second',
              bitcoinRollup
                ? `(${formatCurrency(
                    Math.abs(total.kbs / bitcoinRollup.kbs),
                    MIN_DECIMAL,
                    MIN_DECIMAL,
                  )}x)`
                : '-',
            )}
          </Flex>
        </Flex>
        <Box w="100%" bg="#FAFAFA" minH={'450px'} mt={'56px'}>
          <ListTable
            data={data}
            columns={columns}
            className={s.tableContainer}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default L2Rollup;
