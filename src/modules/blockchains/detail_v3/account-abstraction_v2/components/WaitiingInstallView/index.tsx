import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

const WaitiingInstallView = () => {
  return (
    <Flex
      className={s.container}
      flex={1}
      flexDir={'column'}
      align={'center'}
      justify={'center'}
      bgColor={'grey'}
      gap={'10px'}
    >
      <Flex>
        <div className={s.ldsroller}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Flex>
      <Text fontSize={['18px']} fontWeight={500}>
        Your Account Abstraction is installing. Please wait a few minutes
      </Text>
    </Flex>
  );
};

export default WaitiingInstallView;
