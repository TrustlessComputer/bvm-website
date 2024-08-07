import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

import s from './styles.module.scss';

export default function Disclaimer(): React.JSX.Element {
  return (
    <Flex gap="8px" maxW={['auto', '867px']} className={s.disclaimer}>
      <Image src="/icons/bell.svg" alt="alert" />
      <Text className={s.disclaimer_text}>
        The following list is dedicated to demonstrating BVM technolog. Always
        DYOR and use this information at your own risk.
      </Text>
    </Flex>
  );
}
