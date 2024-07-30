import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import FooterLeftView from './FooterLeftView';
import FooterRightView from './FooterRightView';

const FooterView = () => {
  return (
    <Flex
      flexDir={'row'}
      pos={'sticky'}
      w={'100%'}
      alignSelf={'flex-end'}
      minH={'80px'}
      // borderTopWidth={'1px'}
      // borderTopColor={'#585858'}
    >
      {/* LeftView */}
      {/* <FooterLeftView /> */}

      {/* RightView */}
      <FooterRightView />
    </Flex>
  );
};

export default memo(FooterView);
