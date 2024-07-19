import { OrderItem } from '@/stores/states/l2services/types';
import { SimpleGrid } from '@chakra-ui/react';
import ChainItem from './ChainItem';
import s from './styles.module.scss';
import { IExploreItem } from '@/services/api/l2services/types';

type Props = {
  orderList: IExploreItem[] | any[];
  cloneItemCallback: (template: IModelCategory[]) => void;
};

const ChainGrid = (props: Props) => {
  const { orderList = [], cloneItemCallback } = props;

  const cloneOnClickHandler = (item: IExploreItem) => {
    cloneItemCallback(item.template || []);
  };

  return (
    <SimpleGrid columns={[1, 2, 3]} w={'100%'} spacing={['24px']} my={'25px'}>
      {orderList.map((item, index) => (
        <ChainItem
          key={`${item}-${index}`}
          orderItem={item}
          cloneOnClick={() => cloneOnClickHandler(item)}
        />
      ))}
    </SimpleGrid>
  );
};

export default ChainGrid;
