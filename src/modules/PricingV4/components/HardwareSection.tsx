import { Flex, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import s from './styles.module.scss';
import TitleSection from './TitleSection';
import BodySection from './BodySection';

const DATA_LIST = [
  ['Memory', '16 GB RAM', '32 GB RAM', ' 64 GB RAM', 'Custom'],
  ['CPU', '8 cores', '16 cores', '32 cores', 'Custom'],
  ['Storage', '320 GB SSD', '400 GB SSD', '650 GB SSD', 'Custom'],
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
