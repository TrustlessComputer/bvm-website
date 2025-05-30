'use client';

import { Flex, Text, Image } from '@chakra-ui/react';
import s from './styles.module.scss';
import AppItem from './AppItem';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { getOrderDetailSelected } from '@/stores/states/l2services/selector';
import { setDAppConfigSelected } from '@/stores/states/l2services/reducer';
import { IModelOption } from '@/types/customize-model';

type Props = {
  itemOnClick: (item: IModelOption) => void;
};

const AppList = (props: Props) => {
  const { dAppConfigList = [], dAppConfigSelected } = useAppSelector(
    getOrderDetailSelected,
  );
  const dispatch = useAppDispatch();

  return (
    <Flex className={s.container} flexDir={'column'} w={'100%'} gap={['12px']}>
      {dAppConfigList.map((item, index) => (
        <AppItem
          item={item}
          isSelected={dAppConfigSelected?.key === item.key}
          key={`${item.key}-${index}`}
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
