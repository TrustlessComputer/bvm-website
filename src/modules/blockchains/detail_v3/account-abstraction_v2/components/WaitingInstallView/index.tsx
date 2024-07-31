import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

const WaitingInstallView = () => {
  return (
    <Flex
      className={s.container}
      position={'absolute'}
      top={0}
      right={0}
      left={0}
      bottom={0}
      flex={1}
      flexDir={'column'}
      align={'center'}
      justify={'center'}
      bgColor={'grey'}
      gap={'10px'}
      backgroundColor={'#3d3d3daf'}
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
        The Account Abstraction module is currently being installed. Please
        wait...
      </Text>
    </Flex>
  );
};

export default WaitingInstallView;
