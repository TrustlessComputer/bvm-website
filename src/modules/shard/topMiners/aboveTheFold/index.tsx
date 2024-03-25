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
          <Text className={s.title}>Top SHARD miners</Text>
          <Flex className={s.content}>
            <Text className={s.description}>Join the staking program to earn up to <span>58% interest</span>, receive airdrops, and gain exclusive access to launchpads.</Text>
            <Flex direction={["column", "column"]} gap={"16px"}>
              <Button
                onClick={() => {
                  window.open('https://nakachain.xyz/staking', '_blank');
                }}
                className={`${s.btn}`}
                isOrange
              >
                Staking
              </Button>
              <Button
                onClick={() => {
                  window.open('https://nakachain.xyz/staking/dashboard', '_blank');
                }}
                className={`${s.btn} ${s.btnBorder}`}
              >
                View my staking records
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </BoxContent>
    </Flex>
  )
};

export default AboveTheFold;
