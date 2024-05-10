import { Box, Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import SocialToken from '@/modules/Launchpad/components/Social';
import LaunchpadInfo from 'src/modules/Launchpad/Launchpad.Detail/naka/info';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import NumberScale from '@/components/NumberScale';
import { useDispatch, useSelector } from 'react-redux';
import { isDesktop } from 'react-device-detect';
import BuyTicket from '@/modules/Launchpad/Launchpad.Detail/naka/idoPhase/BuyTicket';
import Countdown from '@/components/Countdown';
import cs from 'classnames';
import LaunchpadProgress from '@/modules/Launchpad/components/progress';
import RaffleButton from '@/modules/Launchpad/Launchpad.Detail/naka/content/raffleButton';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { launchpadSelector } from '@/modules/Launchpad/store/reducer';
import { TOKEN_ICON_DEFAULT } from '@/constants/token';
import { requestReload } from '@/stores/states/common/reducer';

const AboveTheFold = () => {
  const { currentLaunchpad } = useLaunchpadContext();
  const dispatch = useDispatch();
  const { countTotalTickets, oldCountTotalTickets } =
    useSelector(launchpadSelector);

  const socials = useMemo(() => {
    return {
      website: currentLaunchpad?.website,
      twitter: currentLaunchpad?.twitter,
      telegram: currentLaunchpad?.telegram,
      discord: currentLaunchpad?.discord,
    };
  }, [currentLaunchpad]);

  const hasSocial = useMemo(() => {
    return (
      !!currentLaunchpad?.website ||
      !!currentLaunchpad?.twitter ||
      !!currentLaunchpad?.telegram ||
      !!currentLaunchpad?.discord
    );
  }, [currentLaunchpad]);

  const { oldCountCurrentLeaderboard, countCurrentLeaderboard } =
    useSelector(launchpadSelector);

  const endDate = useMemo(() => {
    return currentLaunchpad?.status === 'prelaunch'
      ? currentLaunchpad?.pre_launch_end_date
      : currentLaunchpad?.status === 'ido'
      ? currentLaunchpad?.end_ido_date
      : currentLaunchpad?.end_date;
  }, [currentLaunchpad]);

  const endListingDate = useMemo(() => {
    return dayjs(currentLaunchpad?.end_date).add(1, 'day').toString();
  }, [currentLaunchpad]);

  return (
    currentLaunchpad && (
      <Box className={s.container}>
        <SimpleGrid
          columns={[1, 2]}
          gridTemplateColumns={[
            '1fr',
            'minmax(600px, 1fr) minmax(320px, 600px)',
          ]}
          className={s.container}
          gap={'32px'}
          mt={'32px'}
        >
          <GridItem>
            <Flex
              direction={['column', 'row']}
              gap={4}
              color={'var(--naka-text)'}
              alignItems={['center', 'flex-start']}
              justifyContent={['flex-start', 'flex-start']}
            >
              <Flex alignItems={'flex-start'} h={'100%'}>
                <img
                  src={currentLaunchpad?.image || TOKEN_ICON_DEFAULT}
                  className={s.launchpadAvatar}
                />
              </Flex>
              <Flex gap={0} direction={'column'}>
                <Flex
                  direction={['column', 'row']}
                  gap={'24px'}
                  fontSize={'32px'}
                  fontWeight={'500'}
                  alignItems={'center'}
                >
                  {currentLaunchpad?.name}{' '}
                  {hasSocial && (
                    <>
                      <Flex gap={'16px'} justifyContent={['center', 'left']}>
                        <SocialToken socials={socials} theme={'light'} />
                      </Flex>
                    </>
                  )}
                  {/*<LaunchpadStatus data={currentLaunchpad} className={s.status}/>*/}
                </Flex>
                <div
                  className={s.description}
                  dangerouslySetInnerHTML={{
                    __html: currentLaunchpad?.short_description as string,
                  }}
                />
              </Flex>
            </Flex>
            {!isDesktop && <BuyTicket />}
          </GridItem>
          <GridItem>
            <Flex
              direction={['column', 'row']}
              justifyContent={'flex-end'}
              gap={'32px'}
            >
              {['prelaunch'].includes(currentLaunchpad?.status as string) && (
                <RaffleButton />
              )}
              {!['prelaunch', 'ended'].includes(
                currentLaunchpad?.status as string,
              ) && (
                <Flex direction={'column'}>
                  <Text fontSize={'14px'} fontWeight={400}>
                    Start time
                  </Text>
                  <Text
                    fontSize={'22px'}
                    fontWeight={600}
                    whiteSpace={'nowrap'}
                  >
                    dayjs.utc(startDate).local().format('L LT')
                  </Text>
                </Flex>
              )}
              {currentLaunchpad?.status === 'ended' &&
              dayjs().isAfter(dayjs(endListingDate)) ? (
                <Flex className={s.boxRaisedFund} direction={'column'}>
                  <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    w={'100%'}
                  >
                    <Text
                      textTransform="uppercase"
                      fontSize="16px"
                      fontWeight="600"
                    >
                      TOTAL TICKETS
                    </Text>
                    <Text
                      textTransform="uppercase"
                      fontSize="28px"
                      fontWeight="600"
                    >
                      <NumberScale
                        label={''}
                        couters={countTotalTickets}
                        maximumFractionDigits={0}
                        minimumFractionDigits={0}
                        defaultFrom={String(oldCountTotalTickets)}
                      />
                    </Text>
                  </Flex>
                  <LaunchpadProgress
                    goal={currentLaunchpad?.launching_valuation as string}
                    commited={'6994400'}
                  />
                </Flex>
              ) : (
                <>
                  {currentLaunchpad?.status !== 'prelaunch' && (
                    <Flex
                      direction={'column'}
                      gap={'12px'}
                      className={s.boxCountdown}
                    >
                      <Text
                        fontSize={'14px'}
                        fontWeight={500}
                        color={'#000 !important'}
                        textTransform={'uppercase'}
                      >
                        {currentLaunchpad?.status === 'ended'
                          ? 'Listing'
                          : 'Ends'}{' '}
                        in
                      </Text>
                      <Text whiteSpace={'nowrap'}>
                        <Countdown
                          className={cs(s.countdownTime, s.highLight)}
                          expiredTime={endDate as string}
                          onRefreshEnd={() => dispatch(requestReload())}
                          hideIcon={true}
                          showDay={true}
                        />
                      </Text>
                    </Flex>
                  )}
                </>
              )}
              {currentLaunchpad?.status === 'prelaunch' && (
                <Flex
                  direction={'column'}
                  className={s.boxParticipants}
                  gap={'12px'}
                  onClick={() => {
                    const el = document.getElementById('list-task');

                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <Text
                    fontSize={'14px'}
                    fontWeight={500}
                    color={'#000 !important'}
                  >
                    JOIN ALLOWLIST
                  </Text>
                  <Text
                    fontSize={'40px'}
                    fontWeight={500}
                    color={'#6633CE !important'}
                    lineHeight={'100%'}
                  >
                    <NumberScale
                      label={''}
                      couters={Number(countCurrentLeaderboard)}
                      maximumFractionDigits={0}
                      minimumFractionDigits={0}
                      defaultFrom={String(oldCountCurrentLeaderboard)}
                    />
                  </Text>
                </Flex>
              )}
            </Flex>
          </GridItem>
        </SimpleGrid>
        {!['upcoming'].includes(currentLaunchpad?.status as string) && (
          <LaunchpadInfo launchpadDetail={currentLaunchpad} />
        )}
      </Box>
    )
  );
};

export default AboveTheFold;
