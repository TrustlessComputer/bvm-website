import Countdown from '@/components/Countdown';
import NumberScale from '@/components/NumberScale';
import { Flex, Image, Text } from '@chakra-ui/react';
import cs from 'classnames';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import dayjs from 'dayjs';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { launchpadSelector } from '@/modules/Launchpad/store/reducer';
import { openExtraLink } from '@/utils/helpers';
import { requestReload } from '@/stores/states/common/reducer';

const AboveTheFold = () => {
  const { currentLaunchpad } = useLaunchpadContext();
  const dispatch = useDispatch();
  const { oldCountCurrentLeaderboard, countCurrentLeaderboard } =
    useSelector(launchpadSelector);

  const endDate = useMemo(() => {
    return currentLaunchpad?.status === 'prelaunch'
      ? currentLaunchpad?.pre_launch_end_date
      : currentLaunchpad?.status === 'ido'
      ? dayjs().isBefore(dayjs(currentLaunchpad?.pre_launch_end_date))
        ? currentLaunchpad?.pre_launch_end_date
        : currentLaunchpad?.end_ido_date
      : currentLaunchpad?.end_date;
  }, [currentLaunchpad]);

  const textEndDate = useMemo(() => {
    return currentLaunchpad?.status === 'ido'
      ? dayjs().isBefore(dayjs(currentLaunchpad?.pre_launch_end_date))
        ? `Starts in`
        : `Ends in`
      : `Ends in`;
  }, [currentLaunchpad]);

  return (
    <>
      <Flex className={s.container}>
        <Flex
          direction={['column', 'row']}
          justifyContent={'flex-end'}
          gap={'12px'}
          className={s.containerInfo}
        >
          {currentLaunchpad?.status !== 'ended' && (
            <Flex direction={'column'} gap={'12px'} className={s.boxCountdown}>
              <Text
                fontSize={'14px'}
                fontWeight={500}
                color={'#000 !important'}
                textTransform={'uppercase'}
              >
                {textEndDate}
              </Text>
              <Text whiteSpace={'nowrap'}>
                <Countdown
                  className={cs(s.countdownTime, s.highLight)}
                  expiredTime={endDate as string}
                  onRefreshEnd={() => dispatch(requestReload())}
                  hideIcon={true}
                />
              </Text>
            </Flex>
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
        <Flex className={s.projectName}>
          <Image
            alt="swamps.fi"
            className={s.projectLogo}
            src="/images/launchpad/swamps/swamps_mini_logo.png"
          />
          <Text>Swamps</Text>
        </Flex>
        <Text className={s.title}>Say hello to Swamps L2.</Text>
        <Text className={s.description}>
          Swamps is a revolutionary Layer 2 solution that enables a bridge,
          along with fast, low-cost swaps for SRC-20 tokens, fostering a new
          dimension in DeFi trading. It makes trading and bridging assets easier
          and more connected for everyone involved.
        </Text>
        <Flex className={s.listInfo}>
          <Flex
            className={s.frameWrapper}
            onClick={() => {
              window.open('https://www.swamps.fi/', '_blank');
            }}
          >
            <Image
              className={s.frameImage}
              src={'/images/launchpad/swamps/image.webp'}
              alt={'EXPERIENCE AI'}
              objectFit={'cover'}
              objectPosition={'top center'}
            />
            <Text>SWAMPS</Text>
          </Flex>
          <Flex
            className={s.frameWrapper}
            onClick={() => {
              return openExtraLink(
                'https://cdn.swamps.fi/docs/whitepaperV2.pdf',
              );
            }}
          >
            <Image
              className={s.frameImage}
              src={'/images/launchpad/swamps/paper_image.png'}
              alt={'WHITEPAPER'}
            />
            <Text>READ THE WHITEPAPER</Text>
          </Flex>
          <Flex
            className={s.frameWrapper}
            onClick={() => {
              return openExtraLink(
                'https://swamps.medium.com/introducing-gswp-tokenomics-81985294f091',
              );
            }}
          >
            <Image
              className={s.frameImage}
              src={'/images/launchpad/swamps/medium_image.png'}
              alt={'TOKENOMICS'}
            />
            <Text>TOKENOMICS</Text>
          </Flex>
          {/*<Flex
            className={s.frameWrapper}
            onClick={() => {
              return openExtraLink(
                'https://cdn.swamps.fi/docs/disclaimer.pdf',
              );
            }}
          >
            <Image
              className={s.frameImage}
              src={'/images/launchpad/swamps/paper_image.png'}
              alt={'DISCLAIMER'}
            />
            <Text>DISCLAIMER</Text>
          </Flex>*/}
        </Flex>
      </Flex>
    </>
  );
};

export default AboveTheFold;
