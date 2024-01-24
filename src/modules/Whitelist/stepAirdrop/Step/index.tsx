import { CDN_URL_ICONS } from '@/config';
import { Button, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import cx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';
import s from './styles.module.scss';
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
    tooltip?: any
  };
  expiredTime?: string;
  isDisable?: boolean;
  showExpireTime?: boolean;
  airdropType: AirdropType,
  result?: any
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
      .isBefore(dayjs().utc().format())
  );
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
          <Flex direction={["column", "row"]} justifyContent="space-between" gap={[1, 4]}>
            <Flex direction="column" w="100%">
              <Flex gap={2} w="100%">
                <div className={cx(s.itemCommunity__tag, s[AirdropText[content?.airdropType].toLowerCase()])}>{AirdropText[content?.airdropType]}</div>
                <div className={s.itemCommunity__title}>{content?.title}</div>
                {!!content?.right.title && (
                  <div className={s.itemCommunity__point} style={{ alignSelf: "flex-end", width: "100%" }}>
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
                <Flex direction={"column"}>
                  {
                    content?.showExpireTime && !!content?.expiredTime && (
                      <Flex direction={"column"} justifyContent={"center"} gap={1} mt={2} mb={2}>
                        <Countdown className={s.itemCommunity__countdown} expiredTime={dayjs.utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss').toString()} hideIcon={true} onRefreshEnd={() => setIsEnd(true)}/>
                        {!isEnd && <Text fontSize={"12px"} fontWeight={400} color={"#000000"}>TIME REMAIN</Text>}
                      </Flex>
                    )
                  }
                  {
                    isEnd && (
                      <Flex className={s.resultWrapper}>
                        {content?.result}
                      </Flex>
                    )
                  }
                </Flex>
              }
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
                    !content?.showExpireTime && !!content?.expiredTime ? (
                      <Flex direction={"column"} justifyContent={"center"} gap={1} mt={2} mb={2}>
                        <Countdown className={s.itemCommunity__countdown_button} expiredTime={dayjs.utc(content?.expiredTime, 'YYYY-MM-DD HH:mm:ss').toString()} hideIcon={true} onRefreshEnd={() => setIsEnd(true)}/>
                      </Flex>
                    ) : (isEnd ? content?.actionTextEnd || content?.actionText : content?.actionText)
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
      </div>
    </>
  );
}
