import { Box, Flex, Image, Text } from '@chakra-ui/react';

import s from '../styles.module.scss';

const CaseStudy = () => {
  return (
    <Flex
      gap={['80px']}
      py={['80px']}
      minW="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex gap={['24px']} direction="column">
        <Text className={s.label}>Case Study</Text>
        <Box>
          <Image src="/maga/trump.svg" alt="trump" />
        </Box>
        <Flex gap="12px" direction="column">
          <Text className={s.title} as="h6">
            BITCOIN MAGA
          </Text>
          <Text className={s.description}>
            The first fully on-chain game built on a ZK Rollup on the Bitcoin
            network.
          </Text>
          <Text className={s.description}>Powered by BVM.</Text>
        </Flex>

        <Box>
          <a
            className={s.playNowBtn}
            href="http://maga.bvm.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Play Now</button>
          </a>
        </Box>
      </Flex>
      <Box>
        <Image
          maxW="700px"
          maxH="400px"
          src="/maga/crypto-war.svg"
          alt="crypto war"
        />
      </Box>
    </Flex>
  );
};

export default CaseStudy;
