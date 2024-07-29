import { useAppSelector } from '@/stores/hooks';
import { airdropSelector } from '@/stores/states/airdrop/reducer';
import {
  airdropAlphaUsersSelector,
  userSelector,
} from '@/stores/states/user/selector';
import { formatCurrency } from '@/utils/format';
import AuthenStorage from '@/utils/storage/authen.storage';
import { compareString } from '@/utils/string';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import cs from 'classnames';
import cx from 'clsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import BigNumber from 'bignumber.js';
import { claimBVMAirdrop } from '@/services/player-share';
import { shortCryptoAddress } from '@/utils/address';
import { showError, showSuccess } from '@/components/toast';
import { requestReload } from '@/stores/states/common/reducer';
import { getErrorMessage } from '@/utils/errorV2';
import { ClaimAirdropType } from '../../Section_2';

dayjs.extend(utc);

export enum AirdropStep {
  timeChain,
  alphaUsers,
  gmHolders,
  perceptronsHolders,
  generativeUsers,
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
  actionHandle?: any;
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
  loading?: boolean;
}

export default function ItemCommunity({
  index,
  content,
  isLoading,
  onClickTweetToClaim,
  loading,
}: {
  index: number;
  content: IItemCommunity;
  isLoading?: boolean;
  onClickTweetToClaim: (airdropType: AirdropStep) => void;
  loading?: boolean;
}) {
  const dispatch = useDispatch();
  const [claiming, setClaiming] = useState(false);
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format()),
  );
  const { isActive, image, isDisable = false, step } = content;
  const airdropAlphaUsers = useSelector(airdropAlphaUsersSelector);
  const user = useAppSelector(userSelector);

  const airdrops = useSelector(airdropSelector).airdrops;

  const airdropContent = useMemo(() => {
    return airdrops.find((v) => compareString(v?.type, content.step));
  }, [airdrops, content]);

  const isRunning = useMemo(() => {
    return isActive;
  }, [isActive, index]);

  const [showManualCheck, setShowManualCheck] = useState(false);
  const token = AuthenStorage.getAuthenKey();

  const availableBalanceClaim = useMemo(() => {
    if (content?.step === 1) {
      if (!airdropAlphaUsers) {
        return 0;
      }

      return new BigNumber(airdropAlphaUsers.vested_amount)
        .minus(airdropAlphaUsers.claimed_amount)
        .toNumber();
    } else {
      if (!airdropContent) {
        return 0;
      }
      return new BigNumber(airdropContent.vested_amount)
        .minus(airdropContent.claimed_amount)
        .toNumber();
    }
  }, [airdropContent, airdropAlphaUsers, content]);

  useEffect(() => {
    if (!!token) {
      setShowManualCheck(false);
    }
  }, [token]);

  const onClaim = async () => {
    try {
      setClaiming(true);
      if (content?.airdropType === 1) {
        await claimBVMAirdrop({
          address: airdropAlphaUsers?.address,
          type: airdropAlphaUsers?.type,
        });
        content?.actionHandle?.(airdropAlphaUsers?.type);
      } else {
        await claimBVMAirdrop({
          address: airdropContent?.address,
          type: airdropContent?.type,
        });
        content?.actionHandle?.(airdropContent?.type);
      }
      showSuccess({
        message: `Claimed ${formatCurrency(
          availableBalanceClaim,
        )} $BVM successfully!`,
      });
      dispatch(requestReload());
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setClaiming(false);
    }
  };

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
                  isDisabled={content.isDisableButton || loading || isLoading}
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
                  loadingText={'Verifying'}
                  isLoading={isLoading || loading}
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
                    Can't link account?
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
                  availableBalanceClaim > 0 ? (
                    <Flex gap="8px" mt="4px" alignItems={'center'}>
                      <Box>
                        <Text color={'#000000'}>
                          Claimable: {formatCurrency(availableBalanceClaim)}{' '}
                          $BVM
                        </Text>
                        <Text color={'#000000'}>
                          Receiver address:{' '}
                          {shortCryptoAddress(
                            airdropAlphaUsers?.receiver_address,
                          )}
                        </Text>
                      </Box>

                      <Button
                        isDisabled={claiming}
                        isLoading={claiming}
                        onClick={onClaim}
                        bg={'#990aff'}
                      >
                        Claim now
                      </Button>
                    </Flex>
                  ) : (
                    <Flex direction="column" gap="2px">
                      <Flex direction="column" gap="8px">
                        <Text color={'#000000'}>
                          Airdrop: {formatCurrency(airdropAlphaUsers?.balance)}{' '}
                          $BVM - Vesting at:{' '}
                          {dayjs(airdropAlphaUsers?.claimeable_at).format('LL')}
                        </Text>
                        <Text color={'#000000'}>
                          Vested:{' '}
                          {formatCurrency(airdropAlphaUsers?.vested_amount)}{' '}
                          $BVM - Claimed:{' '}
                          {formatCurrency(airdropAlphaUsers?.claimed_amount)}{' '}
                          $BVM
                        </Text>
                        <Text color={'#000000'}>
                          Receiver address:{' '}
                          {shortCryptoAddress(
                            airdropAlphaUsers?.receiver_address,
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  )
                ) : (
                  user?.twitter_id && (
                    <Text color={'#000000'}>
                      Your Alpha account does not qualify for this airdrop.
                    </Text>
                  )
                )}
              </>
            )}
            {content?.step === AirdropStep.gmHolders && (
              <>
                {airdropContent && !loading ? (
                  <>
                    {airdropContent?.balance ? (
                      availableBalanceClaim > 0 ? (
                        <Flex gap="8px" mt="4px" alignItems={'center'}>
                          <Box>
                            <Text color={'#000000'}>
                              Claimable: {formatCurrency(availableBalanceClaim)}{' '}
                              $BVM
                            </Text>
                            <Text color={'#000000'}>
                              Receiver address:{' '}
                              {shortCryptoAddress(
                                airdropContent?.receiver_address,
                              )}
                            </Text>
                          </Box>

                          <Button
                            isDisabled={claiming}
                            isLoading={claiming}
                            onClick={onClaim}
                            bg={'#990aff'}
                          >
                            Claim now
                          </Button>
                        </Flex>
                      ) : (
                        <Flex direction="column" gap="2px">
                          <Text color={'#000000'}>
                            Airdrop: {formatCurrency(airdropContent?.balance)}{' '}
                            $BVM - Vesting at:{' '}
                            {dayjs(airdropContent.claimeable_at).format('LL')}
                          </Text>
                          <Text color={'#000000'}>
                            Vested:{' '}
                            {formatCurrency(airdropContent?.vested_amount)} $BVM
                            - Claimed:{' '}
                            {formatCurrency(airdropContent?.claimed_amount)}{' '}
                            $BVM
                          </Text>
                          <Text color={'#000000'}>
                            Receiver address:{' '}
                            {shortCryptoAddress(
                              airdropContent?.receiver_address,
                            )}
                          </Text>
                        </Flex>
                      )
                    ) : (
                      <Text color={'#000000'}>
                        Your wallet do not have airdrop
                      </Text>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
            {content?.step === AirdropStep.generativeUsers && (
              <>
                {airdropContent && !loading ? (
                  <>
                    {airdropContent?.balance ? (
                      availableBalanceClaim > 0 ? (
                        <Flex gap="8px" mt="4px" alignItems={'center'}>
                          <Box>
                            <Text color={'#000000'}>
                              Claimable: {formatCurrency(availableBalanceClaim)}{' '}
                              $BVM
                            </Text>
                            <Text color={'#000000'}>
                              Receiver address:{' '}
                              {shortCryptoAddress(
                                airdropContent?.receiver_address,
                              )}
                            </Text>
                          </Box>

                          <Button
                            isDisabled={claiming}
                            isLoading={claiming}
                            onClick={onClaim}
                            bg={'#990aff'}
                          >
                            Claim now
                          </Button>
                        </Flex>
                      ) : (
                        <Flex direction="column" gap="2px">
                          <Text color={'#000000'}>
                            Airdrop: {formatCurrency(airdropContent?.balance)}{' '}
                            $BVM - Vesting at:{' '}
                            {dayjs(airdropContent.claimeable_at).format('LL')}
                          </Text>
                          <Text color={'#000000'}>
                            Vested:{' '}
                            {formatCurrency(airdropContent?.vested_amount)} $BVM
                            - Claimed:{' '}
                            {formatCurrency(airdropContent?.claimed_amount)}{' '}
                            $BVM
                          </Text>
                          <Text color={'#000000'}>
                            Receiver address:{' '}
                            {shortCryptoAddress(
                              airdropContent?.receiver_address,
                            )}
                          </Text>
                        </Flex>
                      )
                    ) : (
                      <Text color={'#000000'}>
                        Your wallet do not have airdrop
                      </Text>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
            {content?.step === AirdropStep.perceptronsHolders && (
              <>
                {airdropContent && !loading ? (
                  <>
                    {airdropContent?.balance ? (
                      availableBalanceClaim > 0 ? (
                        <Flex gap="8px" mt="4px" alignItems={'center'}>
                          <Box>
                            <Text color={'#000000'}>
                              Claimable: {formatCurrency(availableBalanceClaim)}{' '}
                              $BVM
                            </Text>
                            <Text color={'#000000'}>
                              Receiver address:{' '}
                              {shortCryptoAddress(
                                airdropContent?.receiver_address,
                              )}
                            </Text>
                          </Box>

                          <Button
                            isDisabled={claiming}
                            isLoading={claiming}
                            onClick={onClaim}
                            bg={'#990aff'}
                          >
                            Claim now
                          </Button>
                        </Flex>
                      ) : (
                        <Flex direction="column" gap="8px" mt="4px">
                          <Text color={'#000000'}>
                            Airdrop: {formatCurrency(airdropContent?.balance)}{' '}
                            $BVM - Vesting at:{' '}
                            {dayjs(airdropContent.claimeable_at).format('LL')}
                          </Text>
                          <Text color={'#000000'}>
                            Vested:{' '}
                            {formatCurrency(airdropContent?.vested_amount)} $BVM
                            - Claimed:{' '}
                            {formatCurrency(airdropContent?.claimed_amount)}{' '}
                            $BVM
                          </Text>
                          <Text color={'#000000'}>
                            Receiver address:{' '}
                            {shortCryptoAddress(
                              airdropContent?.receiver_address,
                            )}
                          </Text>
                        </Flex>
                      )
                    ) : (
                      <Text color={'#000000'}>
                        Your wallet do not have airdrop
                      </Text>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </div>
    </>
  );
}
