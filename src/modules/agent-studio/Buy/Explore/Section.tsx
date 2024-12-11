import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import ChainItem from './ChainItem';
import { IExploreItem } from '@/services/api/l2services/types';

type Props = {
  title?: string;
  description?: string;
  dataList: IExploreItem[];
  cloneItemCallback?: (template: IExploreItem) => void;
};

const Section = (props: Props) => {
  const { dataList = [], cloneItemCallback, title, description } = props;

  return (
    <Flex flexDir={'column'} gap={['24px']} w={'100%'} position={'relative'}>
      <Flex flexDir={'column'} gap={['8px']}>
        {title && (
          <Text fontSize={['28px']} fontWeight={500}>
            {title}
          </Text>
        )}
        {description && (
          <Text fontSize={['20px']} fontWeight={400}>
            {description}
          </Text>
        )}
      </Flex>
      <SimpleGrid
        columns={[1, 2, 2, 3]}
        w={'100%'}
        spacing={['24px']}
        my={'25px'}
      >
        {dataList.map((item, index) => (
          <ChainItem
            key={`${item}-${index}`}
            orderItem={item}
            cloneOnClick={() => cloneItemCallback && cloneItemCallback(item)}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Section;
