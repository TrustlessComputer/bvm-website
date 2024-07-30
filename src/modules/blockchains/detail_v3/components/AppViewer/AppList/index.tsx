'use client';

import { Flex, Text, Image } from '@chakra-ui/react';
import s from './styles.module.scss';
import AppItem from './AppItem';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { getOrderDetailSelected } from '@/stores/states/l2services/selector';
import { setDAppConfigSelected } from '@/stores/states/l2services/reducer';

type Props = {
  itemOnClick: (item: IModelOption) => void;
};

const AppList = (props: Props) => {
  const { dAppConfigList = [], dAppConfigSelected } = useAppSelector(
    getOrderDetailSelected,
  );
  const dispatch = useAppDispatch();

  return (
    <Flex
      className={s.container}
      flexDir={'column'}
      w={'100%'}
      px="12px"
      py="8px"
      gap={['12px']}
    >
      {dAppConfigList.map((item, index) => (
        <AppItem
          isSelected={dAppConfigSelected?.key === item.key}
          key={`${item.key}-${index}`}
          name={item.title}
          iconUrl={item.setupLogo || ''}
          onAppItemClick={() => {
            props.itemOnClick(item);
            dispatch(setDAppConfigSelected(item));
          }}
        />
      ))}
    </Flex>
  );
};

export default AppList;
