import { CDN_URL_ICONS } from '@/config';
import { Button, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import cx from 'clsx';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import s from './styles.module.scss';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import utc from 'dayjs/plugin/utc';
import { airdropAlphaUsersSelector, userSelector } from '@/stores/states/user/selector';
import { useSelector } from 'react-redux';
import { formatCurrency } from '@/utils/format';
import { useAppSelector } from '@/stores/hooks';
import AirdropStorage from '@/utils/storage/airdrop.storage';

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
  RETROSPECTIVE
}

export const AirdropText = ['', 'New', 'Retrospective'];

export interface IItemCommunity {
  title: string;
  desc: string | React.ReactNode;
  actionText?: string;
  actionHandle: any;
  actionTextSecondary?: string;
  actionHandleSecondary?: any;
  isActive?: boolean;
  isDone?: boolean;
  image: string;
  right: {
    title: string;
    desc: string;
    tooltip?: any
  };
  expiredTime?: string;
  isDisable?: boolean;
  showExpireTime?: boolean;
  airdropType: AirdropType,
  step: AirdropStep
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
  const { isActive, image, isDisable = false } = content;
  const airdropAlphaUsers = useSelector(airdropAlphaUsersSelector);
  const airdropGMHolders = AirdropStorage.getAirdropGMHolders();
  const airdropGenerativeUsers = AirdropStorage.getAirdropGenerativeUsers();
  const airdropPerceptronsHolders = AirdropStorage.getAirdropPerceptronsHolders();
  const user = useAppSelector(userSelector);
  const [expireTimeEnd, setExpireTimeEnd] = useState(false);
  const isConnectMetaMask = AirdropStorage.getIsConnectMetaMask();
  const isConnectBitcoinWallet = AirdropStorage.getIsConnectBitcoinWallet();

  // console.log('airdropGMHolders', airdropGMHolders);
  // console.log('airdropGenerativeUsers', airdropGenerativeUsers);
  // console.log('airdropPerceptronsHolders', airdropPerceptronsHolders);
  // console.log('isConnectMetaMask', isConnectMetaMask);
  // console.log('isConnectBitcoinWallet', isConnectBitcoinWallet);
  // console.log('=======')

  const isRunning = useMemo(() => {
    return isActive;
  }, [isActive, index]);

  return (
    <>
      <div className={cx(s.itemCommunity, isRunning ? '' : s.isDone)}>
        <Image
          className={s.itemCommunity__logo}
          width={48}
          height={48}
          src={`${CDN_URL_ICONS}/${image}`}
          alt="ic-section"
        />
        <Flex direction="column" gap="8px" flex={1}>
          <Flex direction={["column", "row"]} justifyContent="space-between" gap={[1, 4]}>
            <Flex direction="column" w="100%">
              <Flex gap={2}>
                <div className={cx(s.itemCommunity__tag, s[AirdropText[content?.airdropType].toLowerCase()])}>{AirdropText[content?.airdropType]}</div>
                <div className={s.itemCommunity__title}>{content?.title}</div>
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
                <Flex>
                  {
                    content?.showExpireTime && !!content?.expiredTime && (
                      <Flex direction={"column"} justifyContent={"center"} gap={1} mt={2} mb={2}>
                        <Countdown
                          className={s.itemCommunity__countdown}
                          expiredTime={dayjs.utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss').toString()}
                          hideIcon={true}
                          onRefreshEnd={() => setExpireTimeEnd(true)}
                        />
                        <Text fontSize={"12px"} fontWeight={400} color={"#000000"}>TIME REMAIN</Text>
                      </Flex>
                    )
                  }
                </Flex>
              }
            </Flex>
            <Flex direction={["row", 'column']} justifyContent={["space-between", "flex-start"]}>
              <div className={s.itemCommunity__point}>
                {content?.right.title}
                {content?.right.tooltip && <>{content?.right.tooltip}</>}
              </div>
              {!!content?.desc && (
                <div className={s.itemCommunity__pointNote}>
                  {content?.right.desc}
                </div>
              )}
            </Flex>
          </Flex>
          {!!content?.actionText && (
            <Flex direction="column" w="100%" mt="8px">
              <Flex gap="8px" flexDirection="column" w="100%">
                <Button
                  className={s.itemCommunity__btnCTA}
                  onClick={() => {
                    if (content?.actionHandle && isRunning && !isLoading) {
                      content?.actionHandle();
                    }
                  }}
                  isLoading={isLoading}
                >
                  {
                    !content?.showExpireTime && !!content?.expiredTime && !expireTimeEnd  ? (
                      <Flex direction={"column"} justifyContent={"center"} gap={1} mt={2} mb={2}>
                        <Countdown
                          className={s.itemCommunity__countdown_button}
                          expiredTime={dayjs.utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss').toString()}
                          hideIcon={true}
                          onRefreshEnd={() => setExpireTimeEnd(true)}
                        />
                      </Flex>
                    ) : (content?.actionText)
                  }
                </Button>
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
            {
              content?.step === AirdropStep.alphaUsers && (
                <>
                  {
                    airdropAlphaUsers ? (
                      <Text color={"#000000"}>{user?.twitter_name} - Airdrop: {formatCurrency(airdropAlphaUsers?.balance)} $BVM - Vesting at: {dayjs(airdropAlphaUsers?.claimeable_at).format('MMM D, YYYY')}</Text>
                    ) : user?.twitter_id && (
                      <Text color={"#000000"}>Your alpha account do not have airdrop</Text>
                    )
                  }
                </>
              )
            }
            {
              content?.step === AirdropStep.gmHolders && (
                <>
                  {
                    airdropGMHolders ? (
                      <Text color={"#000000"}>Airdrop: {formatCurrency(airdropGMHolders?.balance)} $BVM - Vesting at: {dayjs(airdropGMHolders?.claimeable_at).format('MMM D, YYYY')}</Text>
                    ) : isConnectMetaMask && (
                      <Text color={"#000000"}>Your wallet do not have airdrop</Text>
                    )
                  }
                </>
              )
            }
            {
              content?.step === AirdropStep.generativeUsers && (
                <>
                  {
                    airdropGenerativeUsers ? (
                      <Text color={"#000000"}>Airdrop: {formatCurrency(airdropGenerativeUsers?.balance)} $BVM - Vesting at: {dayjs(airdropGenerativeUsers?.claimeable_at).format('MMM D, YYYY')}</Text>
                    ) : isConnectMetaMask && (
                      <Text color={"#000000"}>Your wallet do not have airdrop</Text>
                    )
                  }
                </>
              )
            }
            {
              content?.step === AirdropStep.perceptronsHolders && (
                <>
                  {
                    airdropPerceptronsHolders ? (
                      <Text color={"#000000"}>Airdrop: {formatCurrency(airdropPerceptronsHolders?.balance)} $BVM - Vesting at: {dayjs(airdropPerceptronsHolders?.claimeable_at).format('MMM D, YYYY')}</Text>
                    ) : (isConnectMetaMask || isConnectBitcoinWallet) && (
                      <Text color={"#000000"}>Your wallet do not have airdrop</Text>
                    )
                  }
                </>
              )
            }
          </Flex>
        </Flex>
      </div>
    </>
  );
}
