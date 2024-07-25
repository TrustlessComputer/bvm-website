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
      className={s.container}
      flexDir="column"
      alignItems={'flex-start'}
      mt={['20px']}
      gap={['40px']}
    >
      <Section
        title="Template"
        description="A handy structure that may be adapted to various needs, ensuring flexibility and adaptability."
        dataList={templateList}
        cloneItemCallback={cloneItemCallback}
      />
      <Section
        title="Mainnet"
        description="Live network structures powered by BVM, fully operational and deployed."
        dataList={mainnetList}
        cloneItemCallback={cloneItemCallback}
      />
      <Section
        title="Testnet"
        description="Networks are currently in the testing phase and will go live in the future."
        dataList={testnetList}
        cloneItemCallback={cloneItemCallback}
      />
    </Flex>
  );
};

export default MainPage;
