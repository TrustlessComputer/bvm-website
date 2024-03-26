import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import Button from '@/modules/ai-landing/components/Button';
import { SHARD_TOP_MINERS } from '@constants/route-path';
import React from 'react';
import { useRouter } from 'next/navigation';
import BoxContent from '@/layouts/BoxContent';

const AboveTheFold = () => {
  const router = useRouter();

  return (
    <Flex className={s.container}>
      <BoxContent>
        <Flex className={s.inner}>
          <Flex className={s.content}>
            <Flex direction={"column"} gap={"12px"}>
              <Text className={s.title}>Top SHARD miners</Text>
              <Text className={s.description}>Stake to mine SHARD, earn more BVM, receive airdrops, and gain exclusive access to launchpads.</Text>
            </Flex>
            <Flex direction={["column", "column"]} gap={"16px"}>
              <Button
                onClick={() => {
                  window.open('https://nakachain.xyz/staking', '_blank');
                }}
                className={`${s.btn}`}
                isOrange
              >
                Stake BVM
              </Button>
              <Button
                onClick={() => {
                  window.open('https://nakachain.xyz/staking/dashboard', '_blank');
                }}
                className={`${s.btn} ${s.btnBorder}`}
              >
                Mine SHARD
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </BoxContent>
    </Flex>
  )
};

export default AboveTheFold;
