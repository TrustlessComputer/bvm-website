import Avatar from '@/components/Avatar';
import { formatCurrency } from '@/utils/format';
import { getUrlAvatarTwitter } from '@/utils/helpers';
import { isTablet } from 'react-device-detect';
import {
  Box,
  Flex,
  Progress,
  SimpleGrid,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { chunk } from 'lodash';
import React, { useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { compareString } from '@/utils/string';
import { useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';

const ProposalSide = ({
  title,
  currentVote,
  totalVote,
  className,
  data,
  subElement,
}: any) => {
  const perPage = 18;
  const [currentSide, setCurrentSide] = useState(0);
  const address = useAppSelector(nakaAddressSelector);

  const numSlide = useMemo(() => {
    return Math.floor((data?.length || 0) / perPage) + 1;
  }, [JSON.stringify(data)]);

  const pageData = useMemo(() => {
    const res = (data || []).concat(
      [...Array(perPage * numSlide - (data?.length || 0))].map(function () {}),
    );
    return chunk(res, perPage);
  }, [JSON.stringify(data), numSlide]);

  const isCantPrev = currentSide === 0;
  const isCantNext = currentSide === numSlide - 1;

  return (
    <Box className={className}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text className={'side-title'}>{title}</Text>
        <Text className={'side-total'} color={'#FFFFFF'}>
          {formatCurrency(currentVote, 1, 1)}
        </Text>
      </Flex>
      <Progress
        max={100}
        value={(Number(currentVote || 0) / totalVote) * 100}
        h="10px"
        className={'progress-bar'}
        mt={'8px'}
      />
      <Box className={styles.listVote}>
        <Box w="100%">
          <SimpleGrid
            columns={perPage / 3}
            columnGap={'6px'}
            spacingY={'4px'}
            w={'100%'}
          >
            {pageData.length > 0 &&
              pageData[currentSide]?.map((d: any, index: number) => {
                return d ? (
                  <Tooltip
                    minH="40px"
                    bg="#ffffff"
                    boxShadow="0px 0px 24px 0px #00000014"
                    borderRadius="8px"
                    label={
                      <Flex
                        minH="40px"
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        color="#000"
                      >
                        <p>
                          <span style={{ color: '#6C6F93' }}>Amount</span>{' '}
                          {formatCurrency(d?.weight)} SHARD
                        </p>
                      </Flex>
                    }
                  >
                    <Flex
                      direction="column"
                      alignItems="center"
                      key={d?.voter?.address}
                      paddingX={'6px'}
                      cursor="pointer"
                      onClick={() =>
                        window.open(
                          `https://explorer.nakachain.xyz/address/${d?.voter?.address}`,
                        )
                      }
                    >
                      <Avatar
                        url={getUrlAvatarTwitter(
                          d.voter?.twitter_avatar || '',
                          'medium',
                        )}
                        address={d?.voter?.address || ''}
                        width={44}
                      />
                      <Text
                        color={'gray'}
                        textAlign={'center'}
                        fontSize="12px"
                        opacity={
                          compareString(address, d?.voter?.address) ? 1 : 0
                        }
                      >
                        You
                      </Text>
                    </Flex>
                  </Tooltip>
                ) : (
                  <Flex
                    direction="column"
                    alignItems="center"
                    key={d?.voter?.address}
                    paddingX={'6px'}
                    cursor="pointer"
                  >
                    <Box
                      key={index}
                      width={`${isTablet ? 44 : 44}px`}
                      height={`${isTablet ? 44 : 44}px`}
                      borderRadius={'50%'}
                      backgroundColor={'#F6F6F6'}
                    />
                    <Text
                      color={'gray'}
                      textAlign={'center'}
                      fontSize="12px"
                      opacity={0}
                    >
                      You
                    </Text>
                  </Flex>
                );
              })}
          </SimpleGrid>
        </Box>
        <Box mt="24px">
          <Flex direction="row" gap="4px" justifyContent="center">
            {[...Array(numSlide)].map((_, index: number) => (
              <Box
                onClick={() => setCurrentSide(index)}
                cursor="pointer"
                w="8px"
                h="8px"
                borderRadius="50%"
                bg={
                  index !== currentSide || numSlide <= 1 ? '#C0C0C5' : '#8C8D93'
                }
              />
            ))}
          </Flex>
          <Flex
            mt="12px"
            direction="row"
            alignItems="center"
            gap="28px"
            justifyContent="center"
          >
            <Box
              mb="3px"
              style={{ transform: 'rotate(180deg)' }}
              color={isCantPrev ? '#C0C0C5' : '#8C8D93'}
              cursor={isCantPrev ? 'not-allowed' : 'pointer'}
              onClick={() => !isCantPrev && setCurrentSide((prev) => prev - 1)}
            >
              ►
            </Box>
            <Box
              color={isCantNext ? '#C0C0C5' : '#8C8D93'}
              cursor={isCantNext ? 'not-allowed' : 'pointer'}
              onClick={() => !isCantNext && setCurrentSide((prev) => prev + 1)}
            >
              ►
            </Box>
          </Flex>
        </Box>
      </Box>
      {subElement && <Box mt="20px">{subElement()}</Box>}
    </Box>
  );
};

export default ProposalSide;
