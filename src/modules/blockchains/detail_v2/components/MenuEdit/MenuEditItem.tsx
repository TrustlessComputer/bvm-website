'use client';

import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

type Props = {
  title: string;
  onClick: () => void;
};

const MenuEditItem = (props: Props) => {
  const { title, onClick } = props;

  return (
    <Flex
      className={s.container}
      onClick={onClick}
      fontWeight={500}
      px="10px"
      py="5px"
      borderRadius={'16px'}
      _hover={{
        cursor: 'pointer',
        bgColor: '#F4F4F4',
      }}
    >
      <Text
        textAlign={'center'}
        fontSize={['14px']}
        color={'#333333'}
        w={'100%'}
      >
        {title}
      </Text>
    </Flex>
  );
};

export default MenuEditItem;
