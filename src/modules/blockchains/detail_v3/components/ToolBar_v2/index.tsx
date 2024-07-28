'use client';

import { Flex } from '@chakra-ui/react';
import s from './styles.module.scss';

type Props = {
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
};

const ToolBar = (props: Props) => {
  const { leftView, rightView } = props;

  return (
    <Flex
      flexDir={'row'}
      className={s.container}
      justify={'space-between'}
      align={'center'}
      w={'100%'}
    >
      {leftView && (
        <Flex flex={1} align={'center'} justify={'flex-start'} gap={'10px'}>
          {leftView}
        </Flex>
      )}
      {rightView && (
        <Flex
          flex={1}
          flexDir={'row'}
          align={'center'}
          justify={'flex-end'}
          gap={['24px']}
        >
          {rightView}
        </Flex>
      )}
    </Flex>
  );
};

export default ToolBar;
