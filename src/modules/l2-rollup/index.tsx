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
  Button,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';

const L2Rollup = () => {
  const { showContactUsModal } = useContactUs();

  const [data, setData] = useState<IRollupL2Info[]>([]);

  const hasIncrementedPageRef = useRef(false);
  const rollupL2Api = new CRollupL2API();
  const sortedRef = useRef(false)
  const loading = useRef(false)

  const total = useMemo(() => {
    const tps = data.reduce((accum, item) => accum + item.tps, 0);
    const mgas = data.reduce((accum, item) => accum + item.mgas, 0);
    const kbs = data.reduce((accum, item) => accum + item.kbs, 0);

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
  }, []);

  const fetchData = async () => {

    if (loading.current) return;

    try {
      loading.current = true;
      const res = await rollupL2Api.getRollupL2Info();
      if (sortedRef?.current) {
        setData(res);
      } else {
        setData(res.sort((a, b) => b?.mgas - a?.mgas));
        sortedRef.current = true;
      }
    } catch (error) {
    } finally {
      hasIncrementedPageRef.current = false;
      loading.current = false;
    }
  };

  const labelConfig = {};

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'network',
        label: (
          <Flex pl={'8px'} gap={'4px'}>
            Network
          </Flex>
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
                        <Text>Stack</Text>
                        <Tooltip label={'The tech stack used by the network.'}>
                          <Image
                            cursor={'pointer'}
                            width="18px"
                            height="18px"
                            alt="tooltip"
                            src={'/icons/ic-tooltip-blue.svg'}
                          />
                        </Tooltip>
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
        id: 'block',
        label: 'Block',
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
        label: (
          <Flex
            style={{
              alignSelf: 'center',
              width: '100%',
              textTransform: 'uppercase',
            }}
          >
            TPS
          </Flex>
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
          return (
            <Flex gap={3} alignItems={'center'} width={'98px'}>
              <Text className={s.title}>
                {data?.tps
                  ? formatCurrency(data?.tps, MIN_DECIMAL, MIN_DECIMAL)
                  : '-'}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'mgas',
        label: <Flex width={'60px'}>Mgas/s</Flex>,
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
            <Flex gap={3} alignItems={'center'} width={'98px'}>
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
        label: (
          <Flex
            style={{
              alignSelf: 'center',
              width: '100%',
            }}
          >
            KB/s
          </Flex>
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
          return (
            <Flex gap={3} alignItems={'center'} width={'60px'}>
              <Text className={s.title}>
                {data?.kbs
                  ? formatCurrency(data?.kbs, MIN_DECIMAL, MIN_DECIMAL)
                  : '-'}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'stack',
        label: (
          <Flex
            style={{
              alignSelf: 'center',
              width: '100%',
            }}
          >
            Stack
          </Flex>
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
          return (
            <Flex gap={3} alignItems={'center'} width={'100%'}>
              <Text className={s.title}>{data.stack || '-'}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'da',
        label: (
          <Flex
            style={{
              alignSelf: 'center',
              width: '100%',
            }}
          >
            DA
          </Flex>
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
          return (
            <Flex gap={3} alignItems={'center'} width={'100%'}>
              <Text className={s.title}>{data.da || '-'}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'settlement',
        label: (
          <Flex
            style={{
              alignSelf: 'center',
              width: '100%',
            }}
          >
            Settlement
          </Flex>
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
          return (
            <Flex alignItems={'center'} width={'100%'}>
              <Text className={s.title}>{data.settlement || '-'}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'tvl',
        label: (
          <Flex
            style={{
              alignSelf: 'center',
              width: '100%',
            }}
          >
            TVL
          </Flex>
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
          const isUnderReview = Number(data.tvl_btc) === 0;
          return (
            <Flex alignItems={'center'} width={'100%'}>
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
        label: (
          <Flex
            style={{
              alignSelf: 'center',
              width: '100%',
            }}
          >
            Last block
          </Flex>
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
          return (
            <Flex alignItems={'center'} width={'100%'}>
              <Text className={s.title}>
                {calculateTimeAgo(data.block_time)}
              </Text>
            </Flex>
          );
        },
      },
    ];
  }, []);

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
      <Flex direction={'column'} w="100%" maxW={'1280px'} alignItems={'center'}>
        <Flex alignItems='center' gap='8px' mb={'12px'}>
          <img src='/icons/heartbeat.svg' alt='noto_heartbeat.svg' width={24} height={24} />
          <Text fontSize={'20px'}>
            Project Heartbeat
          </Text>
          <img src='/icons/heartbeat.svg' alt='noto_heartbeat.svg' width={24} height={24} />
        </Flex>
        <Text
          fontSize={'40px'}
          lineHeight={'52px'}
          textAlign={'center'}
          mb={'20px'}
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
          mb={'16px'}
        >
          The BVM team created Project Heartbeat to provide transparent and
          verifiable insights into new technologies that are transforming
          Bitcoin beyond mere currency. Follow their progress and support their
          innovations.
        </Text>

        <Flex direction={'row'} alignItems={'center'} gap={'8px'} mb={'32px'}>
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
            onClick={showContactUsModal}
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
                    total.tps / bitcoinRollup.tps,
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
                    total.kbs / bitcoinRollup.kbs,
                    MIN_DECIMAL,
                    MIN_DECIMAL,
                  )}x)`
                : '-',
            )}
          </Flex>
        </Flex>
        <Box w="100%" bg="#FAFAFA" minH={'450px'} mt={'32px'}>
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
