import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import { getPublicSaleProgram, IPublicSalePrograme, joinRafflePrograme } from '@/services/public-sale';
import {
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import cx from 'clsx';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { isMobile } from 'react-device-detect';

const RewardButton = ({ className }: any) => {
  const [isEnd, setIsEnd] = React.useState(false);
  const [programeInfo, setProgrameInfo] = useState<IPublicSalePrograme>();
  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getProgramInfo();
  }, []);

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleProgram();
      setProgrameInfo(res);
      if (!isMobile) {
        setTimeout(() => {
          onOpen();
        }, 2000);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareTw = () => {
    const url = `https://twitter.com/BVMnetwork/status/1752546771560239400`;

    window.open(url, '_blank');
    joinRafflePrograme(programeInfo?.id as number);
  };

  if (isLoading) {
    return;
  }

  return (
    <Popover onClose={onClose} isOpen={isOpen} defaultIsOpen={true}>
      <PopoverTrigger>
        <Flex className={cx(s.container, className)}>
          <Flex onMouseOver={onOpen} gap={'8px'} alignItems={'center'}>
            <span className={s.icon}></span>
            <div className={s.text}>
              <Text
                className={s.text_text}
                fontSize={11}
                lineHeight={'12px'}
                fontWeight={400}
              >
                Daily Rewards
              </Text>
              <Flex gap={'6px'} className={s.timeWrapper}>
                <Countdown
                  className={s.time}
                  expiredTime={dayjs
                    .utc(programeInfo?.end_date, 'YYYY-MM-DD HH:mm:ss')
                    .toString()}
                  hideIcon={true}
                  onRefreshEnd={() => setIsEnd(true)}
                />
              </Flex>
            </div>
          </Flex>
          <Flex
            className={cx(s.learnMoreWrapper)}
            gap={2}
            // onClick={handleShareTw}
            // cursor="pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="white"/>
              <g clip-path="url(#clip0_30591_7757)">
                <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_30591_7757">
                  <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                </clipPath>
              </defs>
            </svg>
            <Text lineHeight={'100%'} fontSize={'13px'}>
              Share to claim
            </Text>
          </Flex>
        </Flex>
      </PopoverTrigger>
      <PopoverContent className={cx(s.menuContent)}>
        <PopoverArrow />
        {/*<PopoverCloseButton />*/}
        <PopoverBody>
          <Flex direction={"column"}>
            <Flex justifyContent={"space-between"} alignItems={"center"} p={"16px 20px"}>
              <Text className={s.title}>DAILY BACKER REWARD</Text>
              <Flex alignItems={"center"} className={s.titleDailyReward}>
                <Text >Total daily reward</Text>
                <Text className={s.dailyReward}>100k BVM</Text>
              </Flex>
            </Flex>
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
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" fill="white"/>
                          <g clip-path="url(#clip0_30591_7757)">
                            <path d="M16.0256 5.67383H18.1722L13.4823 11.0347L19 18.3281H14.6798L11.2965 13.9041L7.42433 18.3281H5.2765L10.2932 12.5939L5 5.67441H9.42983L12.4882 9.71808L16.0256 5.67383ZM15.2725 17.0436H16.4619L8.7835 6.89124H7.50717L15.2725 17.0436Z" fill="black"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_30591_7757">
                              <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <Text lineHeight={'100%'} fontSize={'13px'}>Share to claim</Text>
                      </Flex>
                    </Flex>
                  </>
                </Flex>
              </Flex>
              <Flex direction={'column'} alignItems={'center'} gap={2}>
                <Center
                  className={s.raffleBg}
                >
                  <img src={'/public-sale/rwbn_2.png'} alt="raffleBtnBg" />
                </Center>
              </Flex>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RewardButton;
