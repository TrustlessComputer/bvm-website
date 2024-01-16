import s from './styles.module.scss';
import { Button, Flex, Text } from '@chakra-ui/react';
import cx from 'clsx';
import React, { useMemo } from 'react';
import HistoryMessage from '@/modules/Whitelist/HistoryMessage';
import Image from 'next/image';
import { CDN_URL_ICONS } from '@/config';

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
  }
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
            <Button
              className={s.itemCommunity__btnCTA}
              onClick={() => {
                if (content?.actionHandle && isRunning) {
                  content?.actionHandle()
                }
              }}
              isLoading={isLoading}
            >
              {content?.actionText}
            </Button>
          )}
        </Flex>
      </div>
      {step === MultiplierStep.signMessage && (
        <HistoryMessage />
      )}
    </>
  );
}
