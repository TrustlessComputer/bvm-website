import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import HorizontalItem from '@/components/HorizontalItem';
import dayjs from 'dayjs';
import LaunchpadStatus from 'src/modules/Launchpad/Launchpad.Status';
import s from './styles.module.scss';
import { LAUNCHPAD_DETAIL_URL, LAUNCHPAD_MANAGE_URL } from '@/constants/route-path';
import SocialToken from '@/modules/Launchpad/components/Social';
import React, { useCallback, useMemo } from 'react';
import cx from 'clsx';
import { formatCurrency } from '@/utils/format';
import Countdown from '@/components/Countdown';
import cs from 'classnames';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { requestReload } from '@/stores/states/common/reducer';
import { ILaunchpad } from '../../services/launchpad.interfaces';

interface IProps {
  data: ILaunchpad;
}

const LaunchpadManageItem = (props: IProps) => {
  const { data } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const socials = useMemo(() => {
    return {
      website: data?.website,
      twitter: data?.twitter,
      telegram: data?.telegram,
      discord: data?.discord,
    };
  }, [data]);

  const timeText = useMemo(() => {
    return data?.status === 'ended'
      ? 'End time'
      : data?.status === 'ido'
      ? 'End time'
      : 'IDO starts in';
  }, [data]);

  const timeValue = useMemo(() => {
    return data?.status === 'ended'
      ? data?.end_date
      : data?.status === 'ido'
      ? data?.end_ido_date
      : data?.pre_launch_end_date;
  }, [data]);

  const isDisable = useMemo(() => {
    return ['upcoming'].includes(data?.status as string);
  }, [data]);

  const textAction = useMemo(() => {
    return data?.status === 'ended'
      ? 'Learn more'
      : data?.status === 'ido'
      ? 'Participate Now'
      : data?.status === 'prelaunch'
      ? 'Participate Now'
      : '';
  }, [data]);

  const handleParticipate = useCallback(() => {
    if (!isDisable) {
      router.push(`${LAUNCHPAD_MANAGE_URL}/${data?.id}`);
    }
  }, [isDisable]);

  return (
    <Flex
      direction={['column', 'row']}
      gap={['24px', '60px']}
      className={s.container}
      cursor={isDisable ? 'initial' : 'pointer'}
    >
      <Box onClick={handleParticipate}>
        <Image src={data?.image} className={s.imageApp} />
      </Box>
      <Flex direction={'column'} gap={'12px'} flex={1}>
        <Flex
          direction={['column', 'row']}
          gap={'12px'}
          alignItems={['flex-start', 'center']}
        >
          <Flex
            columnGap={'24px'}
            rowGap={'12px'}
            alignItems={'center'}
            flexWrap={'wrap'}
          >
            <Text className={s.name} onClick={handleParticipate}>
              {data?.name}
            </Text>
            <SocialToken socials={socials} theme={'light'} />
          </Flex>
          <LaunchpadStatus data={data} className={s.status} />
        </Flex>
        <Flex direction={'column'} gap={'32px'} onClick={handleParticipate}>
          <div
            className={s.desc}
            dangerouslySetInnerHTML={{
              __html: data?.teaser_description as string,
            }}
          />
          <Divider orientation={'horizontal'} />
          <SimpleGrid
            columns={[1, 2]}
            gridColumnGap={'60px'}
            gridRowGap={'12px'}
          >
            {data?.launchpad_allocation && (
              <HorizontalItem
                className={cx(
                  s.info,
                  Number(data?.launchpad_allocation) === 0 && s.redacted,
                )}
                label={'Tokens Offered'}
                value={
                  Number(data?.launchpad_allocation) === 0
                    ? 'TBA'
                    : `${formatCurrency(
                        data?.launchpad_allocation,
                        0,
                        0,
                        'BTC',
                        true,
                      )}`
                }
              />
            )}
            {data?.participants && data?.participants !== '-' && (
              <HorizontalItem
                className={cx(
                  s.info,
                  isNaN(Number(data?.participants)) && s.redacted,
                )}
                label={'Tickets'}
                value={
                  isNaN(Number(data?.participants))
                    ? data?.participants
                    : `${formatCurrency(data?.participants, 0, 0)}`
                }
              />
            )}
            {data?.launchpad_price && Number(data?.launchpad_price) > 0 && (
              <HorizontalItem
                className={cx(
                  s.info,
                  isNaN(Number(data?.launchpad_price)) && s.redacted,
                )}
                label={'Price'}
                value={`$${formatCurrency(
                  data?.launchpad_price,
                  0,
                  6,
                  'BTC',
                  true,
                )}`}
              />
            )}
            {data?.total_committed && data?.total_committed !== '-' && (
              <HorizontalItem
                className={cx(
                  s.info,
                  isNaN(Number(data?.total_committed)) && s.redacted,
                )}
                label={'Total commited'}
                value={
                  isNaN(Number(data?.total_committed))
                    ? data?.total_committed
                    : `$${formatCurrency(
                        data?.total_committed,
                        0,
                        0,
                        'BTC',
                        true,
                      )}`
                }
              />
            )}
            {data?.hard_cap && data?.hard_cap !== '-' && (
              <HorizontalItem
                className={cx(
                  s.info,
                  isNaN(Number(data?.hard_cap)) && s.redacted,
                )}
                label={'Hard Cap'}
                value={
                  isNaN(Number(data?.hard_cap))
                    ? data?.hard_cap
                    : `$${formatCurrency(data?.hard_cap, 0, 0, 'BTC', true)}`
                }
              />
            )}
          </SimpleGrid>
          <Divider orientation={'horizontal'} />
          <Flex direction={['column-reverse', 'row']} gap={['32px', '48px']}>
            <Button
              className={cx(
                s.btnParticipate,
                data?.status === 'ended' && s.isEnd,
              )}
              isDisabled={isDisable}
            >
              <Flex
                w={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'14px'}
              >
                <Text fontSize={'20px'} fontWeight={500}>
                  {textAction}
                </Text>
                <Image src={`/images/launchpad/upcoming/arrow-right.svg`} />
              </Flex>
            </Button>
            {timeValue && (
              <Flex direction={'column'}>
                <Text fontSize={'14px'} fontWeight={400}>
                  {timeText}
                </Text>
                <Text fontSize={'20px'} fontWeight={600} whiteSpace={'nowrap'}>
                  {data?.status === 'ended' ? (
                    dayjs.utc(timeValue).local().format('L LT')
                  ) : (
                    <Text whiteSpace={'nowrap'} minW={'200px'}>
                      <Countdown
                        className={cs(s.countdownTime)}
                        expiredTime={timeValue as string}
                        onRefreshEnd={() => dispatch(requestReload())}
                        hideIcon={true}
                        showDay={true}
                      />
                    </Text>
                  )}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LaunchpadManageItem;
