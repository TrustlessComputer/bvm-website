import s from './styles.module.scss';
import { Button, Flex, Text } from '@chakra-ui/react';
import cx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { CDN_URL_ICONS } from '@/config';
import AuthenStorage from '@/utils/storage/authen.storage';
import AllowBTCMessage from '@/modules/Whitelist/AllowBTCMessage';
import cs from 'classnames';
import AllowCelestiaMessage from '@/modules/Whitelist/AllowCelestiaMessage';

export enum MultiplierStep {
  authen,
  post,
  signMessage,
  modular
}

export interface IItemCommunity {
  title: string,
  desc: string | React.ReactNode,
  actionText: string,
  actionHandle: any,
  actionTextSecondary?: string,
  actionHandleSecondary?: any,
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
        <Image className={s.itemCommunity__logo} width={48} height={48} src={`${CDN_URL_ICONS}/${image}`} alt="ic-section" />
        <Flex direction="column" gap="8px" flex={1}>
          <Flex direction={["column", "row"]} justifyContent="space-between" gap={[1, 4]}>
            <Flex direction="column" w="100%">
              <div className={s.itemCommunity__title}>{content?.title}</div>
              {!!content?.desc && (<div className={s.itemCommunity__desc}>{content?.desc}</div>)}
            </Flex>
            <Flex direction={["row", 'column']} justifyContent={["space-between", "flex-start"]}>
              <div className={s.itemCommunity__point}>{content?.right.title}</div>
              {!!content?.desc && (<div className={s.itemCommunity__pointNote}>{content?.right.desc}</div>)}
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
                      if (step === MultiplierStep.authen) {
                        setTimeout(() => {
                          setShowManualCheck(true);
                        }, 15000);
                      }
                    }
                  }}
                  isLoading={isLoading}
                >
                  {content?.actionText}
                </Button>
                {!!content.actionHandleSecondary && (
                  <Button
                    className={cs(s.itemCommunity__btnCTA, s.itemCommunity__btnSecondary)}
                    onClick={() => {
                      if (content?.actionHandleSecondary && isRunning && !isLoading) {
                        content?.actionHandleSecondary();
                      }
                    }}
                  >
                    {content?.actionTextSecondary}
                  </Button>
                )}
                {step === MultiplierStep.signMessage && (
                  <AllowBTCMessage />
                )}
                {step === MultiplierStep.modular && (
                  <AllowCelestiaMessage />
                )}
              </Flex>
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
        </Flex>
      </div>
    </>
  );
}
