import { Flex, Image } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React from 'react';

interface IProps {
  country?: string;
}

const DepositBanned = (props: IProps) => {
  console.log(props);
  return (
    <Flex
      className={styles.bannedBox}
      gap="44px"
      alignItems="center"
      pb="32px"
      flexDir={{ base: 'column', lg: 'row' }}
    >
      <Flex flexDir="column" gap={{ base: '24px', md: '32px' }} flex={1}>
        {/*<Text className={styles.bannedBox_title}>*/}
        {/*  Your IP {props.ip} come from {props.country}*/}
        {/*</Text>*/}
        <Flex flexDir="column" gap="12px">
          <p className={styles.bannedBox_content}>
            Not available in your region.
          </p>
          {/*<Text className={styles.bannedBox_content}>*/}
          {/*  We’re planning to list BVM on exchanges soon. So you can purchase*/}
          {/*  BVM on exchanges in the future.*/}
          {/*</Text>*/}
          {/*<Text className={styles.bannedBox_content}>*/}
          {/*  Welcome to the future of Bitcoin.*/}
          {/*</Text>*/}
        </Flex>
      </Flex>
      <Flex maxW="340px">
        <Image src="/images/banned_img.png" />
      </Flex>
    </Flex>
  );
};

export default DepositBanned;
