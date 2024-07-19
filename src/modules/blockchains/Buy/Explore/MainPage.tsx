import { SimpleGrid, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { IExploreItem } from '@/services/api/l2services/types';
import Section from './Section';
import { useAppSelector } from '@/stores/hooks';
import { templateV2Selector } from '@/stores/states/l2services/selector';

type Props = {
  cloneItemCallback?: (item: IExploreItem) => void;
};

const MainPage = (props: Props) => {
  const { cloneItemCallback } = props;

  const { templateList, mainnetList, testnetList } =
    useAppSelector(templateV2Selector);

  return (
    <Flex
      flexDir="column"
      alignItems={'flex-start'}
      mt={['40px']}
      gap={['40px']}
    >
      <Section
        title="Template"
        description=""
        dataList={templateList}
        cloneItemCallback={cloneItemCallback}
      />
      <Section
        title="Mainnet"
        description=""
        dataList={mainnetList}
        cloneItemCallback={cloneItemCallback}
      />
      <Section
        title="Testnet"
        description=""
        dataList={testnetList}
        cloneItemCallback={cloneItemCallback}
      />
    </Flex>
  );
};

export default MainPage;
