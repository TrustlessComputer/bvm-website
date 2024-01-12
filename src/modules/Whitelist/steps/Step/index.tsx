import SvgInset from '@/components/SvgInset';
import useWindowSize from '@/hooks/useWindowSize';
import s from './styles.module.scss';
import { Button, Flex, Text } from '@chakra-ui/react';
import px2rem from '@/utils/px2rem';
import cx from 'clsx';
import { useMemo } from 'react';

export default function ItemCommunity({
  index,
  content,
  delay,
  isLoading,
  currentStep,
}: {
  index: number;
  content: any;
  delay: number;
  isLoading?: boolean;
  currentStep: number;
}) {
  const isRunning = useMemo(() => {
    return currentStep === index;
  }, [currentStep, index]);

  const isDone = useMemo(() => {
    return currentStep > index;
  }, [currentStep, index]);

  return (
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
          <span className={s.itemCommunity_lego_stud}></span>
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
                <Button className={s.itemCommunity_content_action} onClick={content?.actionHandle} isLoading={isLoading}>{content?.actionText}</Button>
              )
            }
          </Flex>
          <span className={s.itemCommunity_content_stud}></span>
        </p>
      </div>
    </div>
  );
}
