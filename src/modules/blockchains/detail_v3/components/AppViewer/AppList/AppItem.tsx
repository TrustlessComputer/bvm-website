'use client';

import { Flex, Text, Image } from '@chakra-ui/react';
import s from './styles.module.scss';

type Props = {
  iconUrl: string;
  name: string;
  isSelected: boolean;
  onAppItemClick: () => void;
};

const AppItem = (props: Props) => {
  const { iconUrl, name, isSelected, onAppItemClick } = props;
  return (
    <Flex
      className={s.container}
      flexDir={'row'}
      w={'100%'}
      align={'center'}
      justify={'flex-start'}
      gap={['8px']}
      onClick={onAppItemClick}
      _hover={{
        cursor: 'pointer',
        opacity: 0.7,
      }}
    >
      <Image
        src={iconUrl || '/icons/app_config_default.svg'}
        h="16px"
        w={'16px'}
        fit={'contain'}
      />
      <Text
        fontSize={['14px']}
        fontWeight={500}
        color={isSelected ? '#FA4E0E' : '#555555'}
      >
        {name}
      </Text>
    </Flex>
  );
};

export default AppItem;
