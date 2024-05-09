import {
  Box,
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
import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { isMobile } from 'react-device-detect';
import { useParams } from 'next/navigation';
import { RAFFLE_PROGRAM } from '@/modules/Launchpad/Launchpad.Detail/naka/content/raffleButton/data';
import { userSelector } from '@/stores/states/user/selector';
import { useSelector } from 'react-redux';
import { shareURLWithReferralCode } from '@/utils/helpers';

export interface IPublicSalePrograme {
  id: number;
  title: string;
  description: string;
  button_name: string;
  link: string;
  image: string;
  reward: string;
  start_date: string;
  end_date: string;
  sub_title: string;
  message?: string;
}

export const PUBLIC_SALE_START = '2024-02-30 03:30:00';
export const PUBLIC_SALE_END = '2024-04-06 03:30:00';

export const getTimeEnd = () => {
  let endHours = dayjs
    .utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss')
    .diff(dayjs.utc(), 'hours');
  let endMins =
    dayjs
      .utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss')
      .diff(dayjs.utc(), 'minutes') || 1;

  if (!endHours || endHours <= 0) {
    endHours = 0;
  }

  if (!endMins || endMins <= 0) {
    endMins = 1;
  }

  return {
    endHours,
    endMins,
  };
};

const RaffleButton = ({ className }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [programeInfo, setProgrameInfo] = useState<IPublicSalePrograme>();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(userSelector);
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      getProgramInfo(Number(params?.id));
    }
  }, [params?.id]);

  const getProgramInfo = async (id: number) => {
    try {
      // const res = await getPublicSaleProgram();
      const res = RAFFLE_PROGRAM[id] as IPublicSalePrograme;
      setProgrameInfo(res);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  const onShareNow = async () => {
    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `${programeInfo?.message}${url}`;

    setTimeout(() => {
      return window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    }, 300);
  };

  return (
    !isLoading && (
      <Box>
        <Popover onClose={onClose} isOpen={isOpen}>
          <PopoverTrigger>
            <Flex className={cx(s.container, className)}>
              <Flex
                onMouseOver={isMobile ? undefined : onOpen}
                onClick={isMobile ? onOpen : undefined}
                p={'16px'}
                gap={'24px'}
                direction={['column', 'row']}
                alignItems={'center'}
              >
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
                <Flex
                  direction={'column'}
                  w={'100%'}
                  alignItems={'center'}
                  flex={1}
                >
                  <Flex
                    direction={'column'}
                    onClick={() =>
                      programeInfo?.link
                        ? window.open(programeInfo?.link, '_blank')
                        : undefined
                    }
                    alignItems={'center'}
                  >
                    <Text
                      className={s.text_text}
                      fontSize={12}
                      lineHeight={'12px'}
                      fontWeight={500}
                      textTransform={'uppercase'}
                    >
                      GIVEAWAY
                    </Text>
                    <Flex gap={'6px'} className={s.timeWrapper}>
                      <Text className={s.time} color={'#FFFFFF'}>
                        {programeInfo?.sub_title}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex gap={4} w={'100%'}>
                    <>
                      <Flex
                        className={cx(s.learnMoreWrapper)}
                        gap={2}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onShareNow();
                        }}
                        cursor="pointer"
                        justifyContent={'center'}
                      >
                        <Text
                          lineHeight={'100%'}
                          fontSize={'14px'}
                          fontWeight={400}
                        >
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
                  <Text
                    className={s.title}
                    onClick={() =>
                      programeInfo?.link
                        ? window.open(programeInfo?.link, '_blank')
                        : undefined
                    }
                    cursor={programeInfo?.link ? 'pointer' : 'default'}
                  >
                    {programeInfo?.title}
                  </Text>
                  <Text
                    className={s.desc}
                    dangerouslySetInnerHTML={{
                      __html: programeInfo?.description as string,
                    }}
                  />
                  <Flex gap={4}>
                    <>
                      <Flex
                        className={cx(s.learnMoreWrapper)}
                        gap={2}
                        onClick={onShareNow}
                        cursor="pointer"
                        mt={'20px'}
                        w={'fit-content !important'}
                      >
                        <svg
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5256 0.672852H13.6722L8.98225 6.03369L14.5 13.3271H10.1798L6.7965 8.9031L2.92433 13.3271H0.7765L5.79317 7.59294L0.5 0.673435H4.92983L7.98825 4.7171L11.5256 0.672852ZM10.7725 12.0426H11.9619L4.2835 1.89027H3.00717L10.7725 12.0426Z"
                            fill="white"
                          />
                        </svg>
                        <Text lineHeight={'100%'} fontSize={'14px'}>
                          Tweet to enter
                        </Text>
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
      </Box>
    )
  );
};

export default RaffleButton;
