import { CDN_URL_ICONS } from '@/config';
import { Button, Flex } from '@chakra-ui/react';
import cs from 'classnames';
import cx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';
import s from './styles.module.scss';

export interface IItemCommunity {
  project: string;
  title: string;
  desc: string | React.ReactNode;
  actionText: string;
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
  tag?: StepTagType
}

export const STEP_TAG = ['', 'New'];

export enum StepTagType {
  NONE,
  NEW,
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
  const { isActive, image } = content;

  const isRunning = useMemo(() => {
    return isActive;
  }, [isActive, index]);

  return (
    <div className={cx(s.container, isRunning ? '' : s.isDone)}>
      <div className={cx(s.itemCommunity)}>
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
              <div className={s.itemCommunity__project}>{content?.project}</div>
              <Flex gap="4px" alignItems="center">
                {content?.tag !== undefined && (
                  <div className={cx(s.itemCommunity__tag, s[STEP_TAG[content?.tag].toLowerCase()])}>{STEP_TAG[content?.tag]}</div>
                )}
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
        </Flex>
      </div>
      {!!content?.actionText && (
        <Flex direction="column" w="100%" mt="8px">
          <Flex gap="8px" flexDirection="column" w="100%">
            <Button
              className={s.container__btnCTA}
              onClick={() => {
                if (content?.actionHandle && isRunning && !isLoading) {
                  content?.actionHandle();
                }
              }}
              isLoading={isLoading}
            >
              {content?.actionText}
            </Button>
            {!!content.actionHandleSecondary && (
              <Button
                className={cs(
                  s.container__btnCTA,
                  s.container__btnSecondary,
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
              >
                {content?.actionTextSecondary}
              </Button>
            )}
          </Flex>
        </Flex>
      )}
    </div>
  );
}
