import { CDN_URL_ICONS } from '@/config';
import AllowBTCMessage from '@/modules/Whitelist/AllowBTCMessage';
import { Button, Flex } from '@chakra-ui/react';
import cs from 'classnames';
import cx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';
import s from './styles.module.scss';
import sanitizeHtml from 'sanitize-html';
import { ALLOWED_ATTRIBUTES } from '@/constants/constants';

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
          <Flex justifyContent="space-between" gap="16px">
            <Flex direction="column" w="100%">
              <div className={s.itemCommunity__project}>{content?.project}</div>
              <div className={s.itemCommunity__title}>{content?.title}</div>
              {!!content?.desc && (
                <div
                  className={s.itemCommunity__desc}
                  dangerouslySetInnerHTML={{
                    __html: content?.desc,
                  }}
                />
              )}
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
                      {content?.actionText}
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
                      >
                        {content?.actionTextSecondary}
                      </Button>
                    )}
                  </Flex>
                </Flex>
              )}
            </Flex>
            <Flex direction="column">
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
    </>
  );
}
