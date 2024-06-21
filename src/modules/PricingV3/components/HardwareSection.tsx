import { Flex, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import s from './styles.module.scss';
import TitleSection from './TitleSection';
import BodySection from './BodySection';

const DATA_LIST = [
  ['Memory', '16GB RAM', '64GB RAM', ' 64GB RAM', 'Custom'],
  ['CPU', '8 cores', '32 cores', '32 cores', 'Custom'],
  ['Storage', '320GB SSD', '650GB SSD', '650GB SSD', 'Custom'],
];

const HackerSection = () => {
  return (
    <>
      <TitleSection title="Hardware" />
      <BodySection dataList={DATA_LIST} />
    </>
  );
};

export default HackerSection;
