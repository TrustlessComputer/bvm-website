import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cx from 'clsx';
import { formatCurrency } from '@/utils/format';
import { ILeaderBoardEAI } from '@/services/interfaces/laupEAI-payment';
import { getCollectEternalSeedAttr } from '@/modules/staking/components/EternalSeeds/helpers';
import { useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import CPaymentEAIAPI from '@/services/payment.eai';

const EternalSeeds = () => {
    const cpaymentEAIAPI = useRef(new CPaymentEAIAPI()).current;

    const address = useAppSelector(nakaAddressSelector)
    const router = useRouter();

    const [userContributeInfo, setUserContributeInfo] = useState<ILeaderBoardEAI | undefined>();

    useEffect(() => {
        getUserContributeInfo(address);
    }, [address])

    const getUserContributeInfo = async (address?: string) => {
        if (!address) return;
        const { data } = await cpaymentEAIAPI.getPublicSaleLeaderBoards({
          page: 1,
          limit: 0,
        });

        if (data[0]?.need_active) {
          const contribute = data[0] as ILeaderBoardEAI;
          setUserContributeInfo(contribute);
        }
    };

    const arrayRange = (start: any, stop: any, step: any) =>
        Array.from(
        { length: (stop - start) / step + 1 },
        (_value, index) => start + index * step,
    );

    const ids = useMemo(() => {
        if (
        Number(userContributeInfo?.from_eternal_id) === 0 &&
        Number(userContributeInfo?.to_eternal_id) === 0
        ) {
        return [];
        }

        return arrayRange(
            userContributeInfo?.from_eternal_id,
            userContributeInfo?.to_eternal_id,
            1,
        );
    }, [userContributeInfo]);

    if (!userContributeInfo) return <></>;

    return (
        <Box width="100%">
            <p className={styles.boxTitle}><b>Your Eternal Seeds.</b></p>
            <Flex className={styles.content}>
                {ids.length > 0
                    ?
                    <Flex w="100%" direction={{lg: 'row', base: 'column'}} gap={'16px'} justifyContent="space-between">
                        <Flex w="100%" mt={'4px'} gap={'16px'} flexWrap={'wrap'}>
                            {ids.map((i) => {
                                const attr = getCollectEternalSeedAttr(i);
                                return (
                                    <Flex key={i} className={styles.brains}>
                                        <Flex className={cx(styles.brainType)} style={attr?.style}>
                                            {attr?.label}
                                        </Flex>
                                        <Image pl="12px" pr="12px" maxWidth="100px" alt={`${i}`} src={attr?.icon} />
                                        <Text fontWeight="700" color="#000">#{i}</Text>
                                    </Flex>
                                );
                            })}
                        </Flex>
                        <Flex w="100%" h="fit-content" p="24px 16px" borderRadius="8px" bg="#FFFFFF26" direction={{lg: 'row', base: 'column'}} alignItems={{lg: 'center', base: 'flex-start'}} gap="24px">
                            <Flex w="100%" direction="column" gap="8px">
                                <Text fontSize="20px" fontWeight="700">You have {ids.length} seeds.</Text>
                                <Text fontSize="16px">Contribute{' '}
                                    <span style={{color: '#10C800', fontWeight: 700}}>
                                    ${formatCurrency(userContributeInfo?.reach_top_balance, 0, 0)}
                                    </span>{' '}
                                    or more to break into the Top 100 and collect some.
                                </Text>
                            </Flex>
                            <Flex direction="row" w="100%" alignItems="center" gap="16px">
                                <Image w="80px" src="/images/stake/brain-empty.png" />
                                <Button
                                    height="50px"
                                    width="100%"
                                    fontSize="16px"
                                    justifyContent="center"
                                    alignItems="center"
                                    onClick={() => {
                                        router.push('https://nakachain.xyz/launchpad/detail/2');
                                    }}
                                >
                                    Increase contribution
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                    :
                    <Flex w="100%" direction={{lg: 'row', base: 'column'}} gap={'16px'} alignItems={{lg: 'center', base: 'flex-start'}} justifyContent="space-between">
                        <Flex direction="column" gap="8px">
                            <div className={styles.learnmore}>
                                1350 historical seeds are rewarded to the top 100 backers proportionately based on their contribution.{' '}
                                {/* <a target="_blank" href="https://twitter.com/punk3700/status/1772991068289519712">
                                    {` Learn more`}
                                    <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M6.75 13.5L11.25 9L6.75 4.5"
                                        stroke="#10C800"
                                        stroke-width="1.7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        />
                                    </svg>
                                </a> */}
                            </div>
                            <div className={styles.learnmore}>
                                Seeds are the placeholders for deploying AIs on the Eternal AI blockchain later. The lower a seed number is, the more historical value it has. Low seed numbers are desirable.
                            </div>
                        </Flex>
                        
                        <Flex h="fit-content" p="16px" borderRadius="8px" bg="#FFFFFF26" direction={{lg: 'row', base: 'column'}} alignItems="center" gap={{base: '16px', lg: '30px'}}>
                            <Flex w="100%" direction="column" gap="10px">
                                <Text fontSize="20px" fontWeight="700">You have 0 seeds.</Text>
                                <Text fontSize="16px">Contribute{' '}
                                    <span style={{color: '#10C800', fontWeight: 700}}>
                                    ${formatCurrency(userContributeInfo?.reach_top_balance, 0, 0)}
                                    </span>{' '}
                                    or more to break into the Top 100 and collect some.
                                </Text>
                            </Flex>
                            <Image h="83px" src="/images/stake/brain-group.png" />
                        </Flex>
                    </Flex>
                }
            </Flex>
        </Box>
    );
};

export default EternalSeeds;
