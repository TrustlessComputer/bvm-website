import Template_1 from '@/modules/blockchains/Buy/Template/Template_1/index';
import { Flex } from '@chakra-ui/react';
import styles from './styles.module.scss';

const TemplatePage = () => {
  return (
    <Flex
      className={styles.container}
      flexDir="column"
      alignItems={'flex-start'}
      mt={['20px']}
      gap={['40px']}
    >
      <Template_1 />
    </Flex>
  );
}

export default TemplatePage;
