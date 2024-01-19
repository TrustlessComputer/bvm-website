import { CDN_URL_ICONS } from '@/config';
import { Button, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import cx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';
import s from './styles.module.scss';
import { ALLOWED_ATTRIBUTES } from '@/constants/constants';
import sanitizeHtml from 'sanitize-html';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export enum AirdropType {
  NONE,
  NEW,
  RETROSPECTIVE
}

export const AirdropText = ['', 'New', 'Retrospective'];

export interface IItemCommunity {
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
    tooltip?: any
  };
  expiredTime?: string;
  isDisable?: boolean;
  showExpireTime?: boolean;
  airdropType: AirdropType
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
              <Flex gap={2}>
                <div className={cx(s.itemCommunity__tag, s[AirdropText[content?.airdropType].toLowerCase()])}>{AirdropText[content?.airdropType]}</div>
                <div className={s.itemCommunity__title}>{content?.title}</div>
              </Flex>
              {!!content?.desc && (
                <div
                  className={s.itemCommunity__desc}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(content?.desc as string, {
                      allowedAttributes: ALLOWED_ATTRIBUTES,
                    }),
                  }}
                />
              )}
              {
                <Flex>
                  {
                    content?.showExpireTime && !!content?.expiredTime && (
                      <Flex direction={"column"} justifyContent={"center"} gap={1} mt={2} mb={2}>
                        <Countdown className={s.itemCommunity__countdown} expiredTime={dayjs.utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss').toString()} hideIcon={true} />
                        <Text fontSize={"12px"} fontWeight={400} color={"#000000"}>TIME REMAIN</Text>
                      </Flex>
                    )
                  }
                </Flex>
              }
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
                      isDisabled={isDisable}
                    >
                      {
                        !content?.showExpireTime && !!content?.expiredTime ? (
                          <Flex direction={"column"} justifyContent={"center"} gap={1} mt={2} mb={2}>
                            <Countdown className={s.itemCommunity__countdown_button} expiredTime={dayjs.utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss').toString()} hideIcon={true} />
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
                {
                  content?.right.tooltip && (
                    <>
                      {content?.right.tooltip}
                    </>
                  )
                }
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
