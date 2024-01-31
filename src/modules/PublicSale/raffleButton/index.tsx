import {
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import {
  getPublicSaleProgram,
  getPublicSaleSummary,
  getRaffleJoinProgame,
  IPublicSalePrograme,
  joinRafflePrograme,
} from '@/services/public-sale';
import AuthenStorage from '@/utils/storage/authen.storage';
import { formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';

const RaffleButton = ({ className }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEnd, setIsEnd] = React.useState(false);
  const user = useAppSelector(userSelector);
  const [programeInfo, setProgrameInfo] = useState<IPublicSalePrograme>();
  const [isLoading, setIsLoading] = useState(true);
  const [raffleCode, setRaffleCode] = useState();
  const token =
    AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();

  const handleShareTw = () => {
    const url = `https://twitter.com/BVMnetwork/status/1752550686095798386`;

    window.open(url, '_blank');
    joinRafflePrograme(programeInfo?.id as number);
  };

  useEffect(() => {
    getProgramInfo();
  }, []);

  useEffect(() => {
    if (programeInfo?.id) {
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
  };

  const getRaffleJoinInfo = async () => {
    const res = await getRaffleJoinProgame(programeInfo?.id as number);
    setRaffleCode(res);
  };

  const onShareNow = async () => {
    const shareUrl = !user?.referral_code
      ? 'bvm.network/public-sale'
      : `bvm.network/public-sale?refer=${user?.referral_code}`;

    const saleSummary = await getPublicSaleSummary();

    const content = `Welcome to the future of Bitcoin!\n\n$BVM is the 1st modular blockchain meta-protocol that allows launching Bitcoin L2 in a few clicks\n\nJoin the ${formatCurrency(
      saleSummary.total_user || '0',
      0,
      0,
      'BTC',
      false,
    )} early contributors who've committed $${formatCurrency(
      saleSummary.total_usdt_value_not_boost || '0',
      0,
      0,
      'BTC',
      true,
    )} to building Bitcoin's future with @BVMnetwork\n\n`;
    return window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  };

  const currentDay = React.useMemo(() => {
    const diffDay = new BigNumber(
      dayjs.utc(PUBLIC_SALE_START).diff(dayjs.utc(), 'days'),
    )
      .absoluteValue()
      .toNumber();
    return {
      // step: DAYS.length > diffDay ? DAYS[diffDay] : DAYS[DAYS.length - 1],
      diffDay,
    };
  }, []);

  return (
    !isLoading && (
      <Popover onClose={onClose} isOpen={isOpen}>
        <PopoverTrigger>
          <Flex className={cx(s.container, className)}>
            <Flex onMouseOver={onOpen} gap={'8px'} alignItems={'flex-start'}>
              <Center
                cursor={programeInfo?.link ? 'pointer' : 'default'}
                className={s.raffleBgIcon}
                onClick={() =>
                  programeInfo?.link
                    ? window.open(programeInfo?.link, '_blank')
                    : undefined
                }
              >
                <img src={programeInfo?.image} alt="raffleBtnBg" />
              </Center>
              <Flex direction={"column"} alignItems={"flex-start"} flex={1}>
                <Text
                  className={s.text_text}
                  fontSize={12}
                  lineHeight={'12px'}
                  fontWeight={500}
                  textTransform={"uppercase"}
                >
                  Day {currentDay?.diffDay + 1} Raffle
                </Text>
                <Flex gap={'6px'} className={s.timeWrapper}>
                  <Text className={s.time} color={"#FFFFFF"}>{programeInfo?.sub_title}</Text>
                </Flex>
                <Flex gap={4} w={"100%"}>
                  {/*{raffleCode ? (
                    <Flex flexDirection={'column'} w={"100%"}>
                      <Text
                        fontWeight={'400'}
                        color={'#fff'}
                        fontSize={'10px'}
                        lineHeight={'140%'}
                        mb={'5px'}
                        style={{
                          background: '#FFFFFF1A',
                          padding: '4px 8px',
                        }}
                      >
                        Share more post to increase
                        <br />
                        your winning chance
                      </Text>
                      <Flex
                        onClick={onShareNow}
                        className={cx(s.learnMoreWrapper)}
                        style={{
                          justifyContent: 'flex-start',
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" fill="black"/>
                          <g clip-path="url(#clip0_30591_7687)">
                            <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="white"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_30591_7687">
                              <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <Text lineHeight={'100%'} fontSize={'12px'}>
                          Share now
                        </Text>
                      </Flex>
                    </Flex>
                  ) : (
                    <>
                      <Flex
                        className={cx(s.learnMoreWrapper)}
                        gap={2}
                        onClick={onShareNow}
                        cursor="pointer"
                        w={"100%"}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" fill="black"/>
                          <g clip-path="url(#clip0_30591_7687)">
                            <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="white"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_30591_7687">
                              <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <Text lineHeight={'100%'} fontSize={'12px'}>
                          Enter the raffle
                        </Text>
                      </Flex>
                    </>
                  )}*/}
                  <>
                    <Flex
                      className={cx(s.learnMoreWrapper)}
                      gap={2}
                      onClick={onShareNow}
                      cursor="pointer"
                      w={"100%"}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="black"/>
                        <g clip-path="url(#clip0_30591_7687)">
                          <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="white"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_30591_7687">
                            <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <Text lineHeight={'100%'} fontSize={'12px'}>
                        Tweet to enter
                      </Text>
                    </Flex>
                  </>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </PopoverTrigger>

        <PopoverContent className={cx(s.menuContent)}>
          <PopoverCloseButton />
          <PopoverArrow />
          <PopoverBody mt={4}>
            <Flex gap={6} direction={['column', 'row']}>
              <Flex direction={'column'}>
                <Text className={s.title}>{programeInfo?.title}</Text>
                <Text
                  className={s.desc}
                  dangerouslySetInnerHTML={{
                    __html: programeInfo?.description as string,
                  }}
                />
                <Flex gap={4}>
                  {/*{raffleCode ? (
                    <>
                      <Flex mt={'10px'} flexDirection={'column'}>
                        <Text
                          fontWeight={'500'}
                          fontSize={'14px'}
                          lineHeight={'140%'}
                        >
                          Share more posts on X to increase your chances of
                          winning the raffle
                        </Text>
                        <Flex
                          className={cx(s.learnMoreWrapper)}
                          gap={2}
                          onClick={handleShareTw}
                          cursor="pointer"
                          mt={'20px'}
                          w={"fit-content"}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="black"/>
                            <g clip-path="url(#clip0_30591_7687)">
                              <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="white"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_30591_7687">
                                <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                              </clipPath>
                            </defs>
                          </svg>
                          <Text lineHeight={'100%'} fontSize={'12px'}>Enter the raffle</Text>
                        </Flex>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex
                        className={cx(s.learnMoreWrapper)}
                        gap={2}
                        onClick={handleShareTw}
                        cursor="pointer"
                        mt={'20px'}
                        w={"fit-content"}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" fill="black"/>
                          <g clip-path="url(#clip0_30591_7687)">
                            <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="white"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_30591_7687">
                              <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <Text lineHeight={'100%'} fontSize={'12px'}>Enter the raffle</Text>
                      </Flex>
                    </>
                  )}*/}
                  <>
                    <Flex
                      className={cx(s.learnMoreWrapper)}
                      gap={2}
                      onClick={onShareNow}
                      cursor="pointer"
                      mt={'20px'}
                      w={"fit-content"}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="black"/>
                        <g clip-path="url(#clip0_30591_7687)">
                          <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="white"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_30591_7687">
                            <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <Text lineHeight={'100%'} fontSize={'12px'}>Tweet to enter</Text>
                    </Flex>
                  </>
                </Flex>
              </Flex>
              <Flex direction={'column'} alignItems={'center'} gap={2}>
                <Center
                  cursor={programeInfo?.link ? 'pointer' : 'default'}
                  className={s.raffleBg}
                  onClick={() =>
                    programeInfo?.link
                      ? window.open(programeInfo?.link, '_blank')
                      : undefined
                  }
                >
                  <img src={programeInfo?.image} alt="raffleBtnBg" />
                </Center>
                <Flex
                  fontSize={'14px'}
                  gap={1}
                  alignItems={'center'}
                  fontWeight={'500'}
                >
                  {Boolean(programeInfo?.reward) && (
                    <>
                      <Text color={'rgba(255, 255, 255, 0.7)'}>
                        Floor price:{' '}
                      </Text>
                      <Text color={'#FA4E0E'}>{programeInfo?.reward}</Text>
                    </>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  );
};

export default RaffleButton;
