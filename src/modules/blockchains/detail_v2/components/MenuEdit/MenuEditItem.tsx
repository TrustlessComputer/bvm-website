'use client';

import { Flex } from '@chakra-ui/react';

type Props = {
  title: string;
  onClick: () => void;
};

const MenuEditItem = (props: Props) => {
  const { title, onClick } = props;

  return (
    <Flex
      onClick={onClick}
      fontWeight={500}
      fontSize={['16px']}
      color={'#000'}
      px="10px"
      py="5px"
      _hover={{
        cursor: 'pointer',
        opacity: 0.7,
      }}
    >
      {title}
    </Flex>
  );
};

export default MenuEditItem;
