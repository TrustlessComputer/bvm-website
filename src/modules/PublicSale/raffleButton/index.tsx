import {
  Box,
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { getLink } from '@/utils/helpers';
import {
  getPublicSaleProgram,
  getRaffleJoinProgame,
  IPublicSalePrograme,
  joinRafflePrograme,
} from '@/services/public-sale';
import AuthenStorage from '@/utils/storage/authen.storage';
import DepositClaimItHere from '@/modules/PublicSale/depositModal/deposit.claim.it.here';

const RaffleButton = ({className}: any) => {
  const [isEnd, setIsEnd] = React.useState(false);
  const user = useAppSelector(userSelector);
  const [programeInfo, setProgrameInfo] = useState<IPublicSalePrograme>();
  const [isLoading, setIsLoading] = useState(true);
  const [raffleCode, setRaffleCode] = useState();
  const token = AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();

  const handleShareTw = () => {
    const url = `https://twitter.com/BVMnetwork/status/1752174033100226567`;

    window.open(url, '_blank');
    joinRafflePrograme(programeInfo?.id as number);
  }

  useEffect(() => {
    getProgramInfo();
  }, []);

  useEffect(() => {
    if(programeInfo?.id) {
      getRaffleJoinInfo();
    }
  }, [programeInfo?.id]);

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleProgram();
      setProgrameInfo(res);
    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  }

  const getRaffleJoinInfo = async () => {
    const res = await getRaffleJoinProgame(programeInfo?.id as number);
    setRaffleCode(res);
  }

  return !isLoading && (
    <Popover>
      <PopoverTrigger>
        <Flex className={cx(s.container, className)}>
          <span className={s.icon}>
          </span>
          <div className={s.text}>
            <Text className={s.text_text} fontSize={11} lineHeight={'12px'} fontWeight={400}>
              Daily Raffle
            </Text>
            <Flex gap={"6px"} className={s.timeWrapper}>
              <Countdown
                className={s.time}
                expiredTime={dayjs.utc(programeInfo?.end_date, 'YYYY-MM-DD HH:mm:ss').toString()}
                hideIcon={true}
                onRefreshEnd={() => setIsEnd(true)}
              />
            </Flex>
          </div>
        </Flex>
      </PopoverTrigger>
      <PopoverContent className={cx(s.menuContent)}>
        <PopoverArrow />
        <PopoverBody>
          <Flex gap={6} direction={["column", "row"]}>
            <Flex direction={"column"}>
              <Text className={s.title}>{programeInfo?.title}</Text>
              <Text className={s.desc}>{programeInfo?.description}</Text>
              <Flex gap={4}>
                {
                  raffleCode ? (
                    <Flex className={s.yourRaffleCode}>
                      <Box >Your raffle code</Box>
                      <Box >{raffleCode}</Box>
                    </Flex>
                  ) : (
                    <>
                      {
                        !token ? (
                          <DepositClaimItHere>
                            <Flex className={cx(s.learnMoreWrapper)} p={"6px 16px !important"} gap={3} cursor="pointer">
                              Sign in to join
                            </Flex>
                          </DepositClaimItHere>
                        ) : (
                          <Flex className={cx(s.learnMoreWrapper)} gap={3} onClick={handleShareTw} cursor="pointer">
                            <Text>Like and repost to join</Text>
                            <Center w={"28px"} height={"28px"} bgColor={"#FA4E0E"}>
                              <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z" fill="white"/>
                              </svg>
                            </Center>
                          </Flex>
                        )
                      }
                    </>
                  )
                }
              </Flex>
            </Flex>
            <Flex direction={"column"} alignItems={"center"} gap={2}>
              <Center className={s.raffleBg}>
                <img src={programeInfo?.image} alt="raffleBtnBg" />
              </Center>
              <Flex fontSize={"14px"} gap={1} alignItems={"center"} fontWeight={"500"}>
                <Text color={"rgba(255, 255, 255, 0.7)"}>Floor price: </Text>
                <Text color={"#FA4E0E"} >{programeInfo?.reward}</Text>
              </Flex>

            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default RaffleButton;
