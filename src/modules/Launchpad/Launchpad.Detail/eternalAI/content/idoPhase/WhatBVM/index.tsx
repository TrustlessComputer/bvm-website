import styles from './styles.module.scss';
import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getUrlToSwap } from '@/utils/url';
import { TOKEN_ADDRESS } from '@/constants/token';
import BVM_ADDRESS from '@/contract/stakeV2/configs';

const WhatBVM = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <p className={styles.container_title}>What is $BVM?</p>
      <Flex flexDirection="column" gap="4px">
        <p className={styles.container_desc}>
          Bitcoin Virtual Machine (BVM) powers NakaChain to bring DeFi to Bitcoin
        </p>
      </Flex>
      <Button
        className={styles.button}
        onClick={() => {
          router.push(
            getUrlToSwap({
              from_token: TOKEN_ADDRESS.BTC_ADDRESS_L2,
              to_token: BVM_ADDRESS.bvm,
            }),
          );
        }}
      >
        Buy $BVM
      </Button>
    </div>
  );
};

export default WhatBVM;
