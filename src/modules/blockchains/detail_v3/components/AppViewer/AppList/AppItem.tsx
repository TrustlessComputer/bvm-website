'use client';

import { Flex, Text, Image } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useMemo } from 'react';
import { useAppSelector } from '@/stores/hooks';
import { getDappByAppNameIDSelector } from '@/stores/states/l2services/selector';

type Props = {
  item: IModelOption;
  isSelected: boolean;
  onAppItemClick: () => void;
};

const AppItem = (props: Props) => {
  const { item, isSelected, onAppItemClick } = props;
  const { setupLogo, title, key } = item;

  const getDappByAppNameIDFunc = useAppSelector(getDappByAppNameIDSelector);

  const statusMapper = useMemo(() => {
    let statusStr = '';
    let statusColor = 'transparent';
    // let statusColor = '#00AA6C';

    const dAppItem = getDappByAppNameIDFunc(key);

    console.log('AAAA ', {
      dAppItem,
      key,
    });

    if (dAppItem) {
      switch (dAppItem.status) {
        case 'new':
        case 'processing':
          statusStr = 'Setting up';
          statusColor = '#F9D03F';
          break;
        case 'done':
          statusStr = 'Running';
          statusColor = '#00AA6C';
          break;
        default:
          break;
      }
    }

    return {
      statusStr,
      statusColor,
    };
  }, [key, getDappByAppNameIDFunc]);

  return (
    <Flex
      className={s.container}
      flexDir={'row'}
      w={'100%'}
      align={'flex-start'}
      justify={'space-between'}
      gap={['10px']}
      px="12px"
      py="8px"
      onClick={onAppItemClick}
      _hover={{
        cursor: 'pointer',
        opacity: 0.7,
      }}
      bgColor={isSelected ? '#FFEDE7' : '#fff'}
    >
      <Image
        src={setupLogo || '/icons/app_config_default.svg'}
        h="16px"
        w={'16px'}
        fit={'contain'}
      />
      <Flex flex={1} flexDir={'column'} gap={'2px'} mt={'-3px'}>
        <Text
          fontSize={['15px']}
          fontWeight={500}
          color={isSelected ? '#FA4E0E' : '#000'}
        >
          {title || ''}
        </Text>
        <Text
          fontSize={['13px']}
          fontWeight={400}
          fontStyle={'italic'}
          color={statusMapper.statusColor}
        >
          {statusMapper.statusStr}
        </Text>
      </Flex>

      <Flex
        w={'10px'}
        h={'10px'}
        borderRadius={'100%'}
        bgColor={statusMapper.statusColor}
      ></Flex>
    </Flex>
  );
};

export default AppItem;
