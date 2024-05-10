import styles from './styles.module.scss';
import { Flex, Text } from '@chakra-ui/react';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const Tokenomics = () => {
  return (
    <div className={styles.wrapper}>
      <Flex flexDirection="column" alignItems="center" gap="6px">
        <p className={styles.title}>$EAI Tokenomics</p>
        <Text as="p" color="black" fontSize="22px" opacity="0.7">
          The total supply of EAI is permanently fixed at 1B tokens.
        </Text>
      </Flex>
      <Flex
        gap="120px"
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="center"
        alignItems="center"
        className={styles.container}
      >
        <div className={styles.left}>
          <ImagePlaceholder
            src={'/images/eai-tokenomics-1.png'}
            alt="tokenomics"
            width={200}
            height={200}
          />
        </div>
        <div className={styles.right}>
          <ImagePlaceholder
            src={'/images/eai-5years-1.png'}
            alt="5years"
            width={200}
            height={200}
          />
        </div>
      </Flex>
    </div>
  );
};

export default Tokenomics;
