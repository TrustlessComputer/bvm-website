import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import FooterLeftView from './FooterLeftView';
import FooterRightView from './FooterRightView';

const FooterView = () => {
  return (
    <Flex
      flexDir={'row'}
      px="10px"
      py={'20px'}
      pos={'sticky'}
      w={'100%'}
      alignSelf={'flex-end'}
      minH={'200px'}
      borderTopWidth={'1px'}
      borderTopColor={'#585858'}
    >
      {/* LeftView */}
      <FooterLeftView />

      {/* RightView */}
      <FooterRightView />
    </Flex>
  );
};

export default memo(FooterView);
