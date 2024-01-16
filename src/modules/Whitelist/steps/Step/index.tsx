import s from './styles.module.scss';
import { Button, Flex, Text } from '@chakra-ui/react';
import px2rem from '@/utils/px2rem';
import cx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import HistoryMessage from '@/modules/Whitelist/HistoryMessage';
import { useDispatch } from 'react-redux';
import { openModal } from '@/stores/states/modal/reducer';
import AuthenStorage from '@/utils/storage/authen.storage';
import VerifyTwModal, { ReferralModalID } from '@/modules/Whitelist/steps/VerifyTwModal';

export enum MultiplierStep {
  authen,
  post,
  signMessage
}

export default function ItemCommunity({
  index,
  content,
  isLoading,
  isActive,
  isDone,
  step,
  handleShowManualPopup
}: {
  index: number;
  content: any;
  isLoading?: boolean;
  isActive?: boolean
  isDone?: boolean;
  step?: MultiplierStep;
  handleShowManualPopup?: () => void;
}) {
  const dispatch = useDispatch();
  const [showManualCheck, setShowManualCheck] = useState(false);
  const token = AuthenStorage.getAuthenKey();

  useEffect(() => {
    if(!!token) {
      setShowManualCheck(false);
    }
  }, [token]);

  const isRunning = useMemo(() => {
    return isActive;
  }, [isActive, index]);

  return (
    <>
      <div className={cx(s.itemCommunity, isRunning ? '' : s.isDone)}>
        <div className={s.itemCommunity_inner}>
          <div className={s.itemCommunity_lego}>
            {
              isDone ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                >
                  <path
                    d="M7.00004 16.4199L0.790039 10.2099L3.62004 7.37988L7.00004 10.7699L16.88 0.879883L19.71 3.70988L7.00004 16.4199Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <Text fontSize={px2rem(20)} fontWeight={700}>{index + 1}</Text>
              )
            }
            <span className={s.itemCommunity_lego_stud} />
          </div>
          <p className={s.itemCommunity_content}>
            <Flex direction={["column", "row"]}  justifyContent={"space-between"} alignItems={["flex-start", "center"]} w={"100%"} gap={['12px', '24px']}>
              <Flex direction={"column"}>
                <div className={s.itemCommunity_content_title}>{content?.title}</div>
                {
                  content?.desc && (
                    <div className={s.itemCommunity_content_desc}>{content?.desc}</div>
                  )
                }
              </Flex>
              {
                content?.actionText && (
                  <Flex direction={"column"}>
                    <Button className={s.itemCommunity_content_action} onClick={() => {
                      if (content?.actionHandle && isRunning && !isLoading) {
                        content?.actionHandle();

                        if (step === MultiplierStep.authen) {
                          setTimeout(() => {
                            setShowManualCheck(true);
                          }, 3000);
                        }
                      }
                    }} isLoading={isLoading}>{content?.actionText}
                    </Button>
                    {
                      step === MultiplierStep.authen && showManualCheck && (
                        <Text
                          cursor={"pointer"}
                          fontSize={"14px"}
                          fontWeight={400}
                          color={"#000000"}
                          textDecoration={"underline"}
                          onClick={handleShowManualPopup}>
                          Missing from the leaderboard?
                        </Text>
                      )
                    }
                  </Flex>
                )
              }
            </Flex>
            <span className={s.itemCommunity_content_stud} />
          </p>
        </div>
      </div>
      {step === MultiplierStep.signMessage && (
        <HistoryMessage />
      )}
    </>
  );
}
