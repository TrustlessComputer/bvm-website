import s from './styles.module.scss';
import { Button, Flex, Text } from '@chakra-ui/react';
import cx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import HistoryMessage from '@/modules/Whitelist/HistoryMessage';
import Image from 'next/image';
import { CDN_URL_ICONS } from '@/config';
import AuthenStorage from '@/utils/storage/authen.storage';

export enum MultiplierStep {
  authen,
  post,
  signMessage
}

export interface IItemCommunity {
  title: string,
  desc: string,
  actionText: string,
  actionHandle: any,
  isActive?: boolean,
  isDone?: boolean,
  step: MultiplierStep,
  image: string
  right: {
    title: string;
    desc: string
  },
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
  const [showManualCheck, setShowManualCheck] = useState(false);
  const token = AuthenStorage.getAuthenKey();

  useEffect(() => {
    if(!!token) {
      setShowManualCheck(false);
    }
  }, [token]);

  const { isActive, image, step } = content;

  const isRunning = useMemo(() => {
    return isActive;
  }, [isActive, index]);

  return (
    <>
      <div className={cx(s.itemCommunity, isRunning ? '' : s.isDone)}>
        <Image width={48} height={48} src={`${CDN_URL_ICONS}/${image}`} alt="ic-section" />
        <Flex direction="column" gap="8px" flex={1}>
          <Flex justifyContent="space-between" gap="8px">
            <Flex direction="column">
              <div className={s.itemCommunity__title}>{content?.title}</div>
              {!!content?.desc && (<div className={s.itemCommunity__desc}>{content?.desc}</div>)}
            </Flex>
            <Flex direction="column" w="200px">
              <div className={s.itemCommunity__point}>{content?.right.title}</div>
              {!!content?.desc && (<div className={s.itemCommunity__pointNote}>{content?.right.desc}</div>)}
            </Flex>
          </Flex>
          {!!content?.actionText && (
            <Flex direction={"column"}>
              <Button
                className={s.itemCommunity__btnCTA}
                onClick={() => {
                  if (content?.actionHandle && isRunning && !isLoading) {
                    content?.actionHandle();

                    if (step === MultiplierStep.authen) {
                      setTimeout(() => {
                        setShowManualCheck(true);
                      }, 3000);
                    }
                  }
                }}
                isLoading={isLoading}
              >
                {content?.actionText}
              </Button>
              {
                step === MultiplierStep.authen && showManualCheck && (
                  <Text
                    cursor={"pointer"}
                    fontSize={"14px"}
                    fontWeight={400}
                    color={"#000000"}
                    textDecoration={"underline"}
                    onClick={content?.handleShowManualPopup}
                    mt={1}
                  >
                    Missing from the Leaderboard?
                  </Text>
                )
              }
            </Flex>
          )}
          {step === MultiplierStep.signMessage && (
            <HistoryMessage />
          )}
        </Flex>
      </div>
    </>
  );
}
