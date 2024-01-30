import { CDN_URL_ICONS } from '@/config';
import { Button, Flex, Text, Image } from '@chakra-ui/react';
import cs from 'classnames';
import cx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import utc from 'dayjs/plugin/utc';
import {
  airdropAlphaUsersSelector,
  userSelector,
} from '@/stores/states/user/selector';
import { useSelector } from 'react-redux';
import { formatCurrency } from '@/utils/format';
import { useAppSelector } from '@/stores/hooks';
import AirdropStorage from '@/utils/storage/airdrop.storage';
import AuthenStorage from '@/utils/storage/authen.storage';

dayjs.extend(utc);

export enum AirdropStep {
  timeChain,
  generativeUsers,
  perceptronsHolders,
  gmHolders,
  alphaUsers,
}

export enum AirdropType {
  NONE,
  NEW,
  RETROSPECTIVE,
}

export const AirdropText = ['', 'New', 'Retrospective'];

export interface IItemCommunity {
  title: string;
  desc: string | React.ReactNode;
  actionText?: string;
  actionTextEnd?: string;
  actionHandle: any;
  actionTextSecondary?: string;
  actionHandleSecondary?: any;
  isActive?: boolean;
  isDone?: boolean;
  image: string;
  right: {
    title: string;
    desc: string;
    tooltip?: any;
  };
  expiredTime?: string;
  isDisable?: boolean;
  showExpireTime?: boolean;
  airdropType: AirdropType;
  step?: AirdropStep;
  result?: any;
  isDisableButton?: boolean;
  handleShowManualPopup?: () => void;
}

export default function ItemCommunity({
  index,
  content,
  isLoading,
}: {
  index: number;
  content: IItemCommunity;
  isLoading?: boolean;
}) {
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format()),
  );
  const { isActive, image, isDisable = false, step } = content;
  const airdropAlphaUsers = useSelector(airdropAlphaUsersSelector);
  const airdropGMHolders = AirdropStorage.getAirdropGMHolders();
  const airdropGenerativeUsers = AirdropStorage.getAirdropGenerativeUsers();
  const airdropPerceptronsHolders =
    AirdropStorage.getAirdropPerceptronsHolders();
  const user = useAppSelector(userSelector);
  const isConnectMetaMask = AirdropStorage.getIsConnectMetaMask();
  const isConnectBitcoinWallet = AirdropStorage.getIsConnectBitcoinWallet();

  const isRunning = useMemo(() => {
    return isActive;
  }, [isActive, index]);

  const [showManualCheck, setShowManualCheck] = useState(false);
  const token = AuthenStorage.getAuthenKey();

  useEffect(() => {
    if (!!token) {
      setShowManualCheck(false);
    }
  }, [token]);

  return (
    <>
      <div className={cx(s.itemCommunity, isRunning ? '' : s.isDone)}>
        <Image
          className={s.itemCommunity__logo}
          maxW={'280px'}
          maxH={'224px'}
          src={image}
          alt="ic-section"
          fit="cover"
        />
        <Flex direction="column" gap="12px" flex={1}>
          <Flex
            direction={['column', 'row']}
            justifyContent="space-between"
            gap={[1, 4]}
          >
            <Flex direction="column" w="100%">
              <Flex gap={2} w="100%">
                {!!AirdropText[content?.airdropType] && (
                  <div
                    className={cx(
                      s.itemCommunity__tag,
                      s[AirdropText[content?.airdropType].toLowerCase()],
                    )}
                  >
                    {AirdropText[content?.airdropType]}
                  </div>
                )}
                <div className={s.itemCommunity__title}>{content?.title}</div>
                {!!content?.right.title && (
                  <div
                    className={s.itemCommunity__point}
                    style={{ alignSelf: 'flex-end', width: '100%' }}
                  >
                    {content?.right.title}
                    {content?.right.tooltip && <>{content?.right.tooltip}</>}
                  </div>
                )}
              </Flex>
              {!!content?.desc && (
                <div
                  className={s.itemCommunity__desc}
                  dangerouslySetInnerHTML={{
                    __html: content?.desc,
                  }}
                />
              )}
              {
                <Flex direction={'column'}>
                  {content?.showExpireTime && !!content?.expiredTime && (
                    <Flex
                      direction={'column'}
                      justifyContent={'center'}
                      gap={1}
                      mt={2}
                      mb={2}
                    >
                      {/* <Countdown
                        className={s.itemCommunity__countdown}
                        expiredTime={dayjs
                          .utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss')
                          .toString()}
                        hideIcon={true}
                        onRefreshEnd={() => setIsEnd(true)}
                      /> */}
                      {!isEnd && (
                        <Text
                          fontSize={'12px'}
                          fontWeight={400}
                          color={'#000000'}
                        >
                          TIME REMAIN
                        </Text>
                      )}
                    </Flex>
                  )}
                  {isEnd && (
                    <Flex className={s.resultWrapper}>{content?.result}</Flex>
                  )}
                </Flex>
              }
            </Flex>
          </Flex>
          {!!content?.actionText && (
            <Flex direction="column" w="100%" mt="8px">
              <Flex gap="8px" flexDirection="column" w="100%">
                <Button
                  isDisabled={content.isDisableButton}
                  className={s.itemCommunity__btnCTA}
                  onClick={() => {
                    if (content?.actionHandle && isRunning && !isLoading) {
                      content?.actionHandle();
                      if (step === AirdropStep.alphaUsers) {
                        setTimeout(() => {
                          setShowManualCheck(true);
                        }, 10000);
                      }
                    }
                  }}
                  isLoading={isLoading}
                >
                  {content?.actionText && (
                    <Flex
                      direction={'column'}
                      justifyContent={'center'}
                      gap={1}
                      mt={2}
                      mb={2}
                    >
                      {content?.actionText}
                    </Flex>
                  )}
                </Button>
                {step === AirdropStep.alphaUsers && showManualCheck && (
                  <Text
                    cursor={'pointer'}
                    fontSize={'14px'}
                    fontWeight={400}
                    color={'#000000'}
                    textDecoration={'underline'}
                    onClick={content?.handleShowManualPopup}
                    mt={1}
                  >
                    Missing from the Leaderboard?
                  </Text>
                )}
                {!!content.actionHandleSecondary && (
                  <Button
                    className={cs(
                      s.itemCommunity__btnCTA,
                      s.itemCommunity__btnSecondary,
                    )}
                    onClick={() => {
                      if (
                        content?.actionHandleSecondary &&
                        isRunning &&
                        !isLoading
                      ) {
                        content?.actionHandleSecondary();
                      }
                    }}
                    isLoading={isLoading}
                  >
                    {content?.actionTextSecondary}
                  </Button>
                )}
              </Flex>
            </Flex>
          )}
          <Flex>
            {content?.step === AirdropStep.alphaUsers && (
              <>
                {airdropAlphaUsers ? (
                  <Text color={'#000000'}>
                    {user?.twitter_name} - Airdrop:{' '}
                    {formatCurrency(airdropAlphaUsers?.balance)} $BVM - Vesting
                    at:{' '}
                    {dayjs(airdropAlphaUsers?.claimeable_at).format(
                      'MMM D, YYYY',
                    )}
                  </Text>
                ) : (
                  user?.twitter_id && (
                    <Text color={'#000000'}>
                      Your alpha account do not have airdrop
                    </Text>
                  )
                )}
              </>
            )}
            {content?.step === AirdropStep.gmHolders && (
              <>
                {airdropGMHolders ? (
                  <Text color={'#000000'}>
                    Airdrop: {formatCurrency(airdropGMHolders?.balance)} $BVM -
                    Vesting at:{' '}
                    {dayjs(airdropGMHolders?.claimeable_at).format(
                      'MMM D, YYYY',
                    )}
                  </Text>
                ) : (
                  isConnectMetaMask && (
                    <Text color={'#000000'}>
                      Your wallet do not have airdrop
                    </Text>
                  )
                )}
              </>
            )}
            {content?.step === AirdropStep.generativeUsers && (
              <>
                {airdropGenerativeUsers ? (
                  <Text color={'#000000'}>
                    Airdrop: {formatCurrency(airdropGenerativeUsers?.balance)}{' '}
                    $BVM - Vesting at:{' '}
                    {dayjs(airdropGenerativeUsers?.claimeable_at).format(
                      'MMM D, YYYY',
                    )}
                  </Text>
                ) : (
                  isConnectMetaMask && (
                    <Text color={'#000000'}>
                      Your wallet do not have airdrop
                    </Text>
                  )
                )}
              </>
            )}
            {content?.step === AirdropStep.perceptronsHolders && (
              <>
                {airdropPerceptronsHolders ? (
                  <Text color={'#000000'}>
                    Airdrop:{' '}
                    {formatCurrency(airdropPerceptronsHolders?.balance)} $BVM -
                    Vesting at:{' '}
                    {dayjs(airdropPerceptronsHolders?.claimeable_at).format(
                      'MMM D, YYYY',
                    )}
                  </Text>
                ) : (
                  (isConnectMetaMask || isConnectBitcoinWallet) && (
                    <Text color={'#000000'}>
                      Your wallet do not have airdrop
                    </Text>
                  )
                )}
              </>
            )}
          </Flex>
        </Flex>
      </div>
    </>
  );
}
