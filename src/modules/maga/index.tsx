import { Box, Flex, Text } from '@chakra-ui/react';

import CaseStudy from './CaseStudy';
import CommonSection from './CommonSection';
import s from './styles.module.scss';

const STEP_SECTION = [
  {
    id: 1,
    subTile: 'Drag and drop customization with BVM Studio',
    subDescription:
      'Deploying and managing a ZK rollup is made simple and fun, allowing you to optimize performance and cost effectively while accessing reliable, scalable infrastructure on demand.',
    image: '/maga/step-1.gif',
    specialImage: true,
    link: '/studio',
    isExternal: false,
  },
  {
    id: 2,
    subTile: 'Write smart contracts',
    subDescription:
      'Write and deploy smart contracts as on the Ethereum network to handle game logic on-chain, ensuring it runs exactly as programmed without the risk of fraud or interference.',
    image: '/maga/step-2.svg',
    link: 'https://x.com/punk3700/status/1650524119136628736',
    isExternal: true,
    specialImage: false,
  },
  {
    id: 3,
    subTile: 'Expand the network capabilities',
    subDescription:
      'Issue tokens, in-game NFTs, and more to enable trading and create a dynamic and interactive gaming ecosystem.',
    image: '/maga/step-3.svg',
    link: '/studio',
    isExternal: false,
    specialImage: false,
  },
];

const MagaModule = () => {
  return (
    <Box className={s.container}>
      <Flex className="containerV3" direction="column">
        <CaseStudy />
        <Text className={s.textHeadline} pt={['80px']}>
          Developers? Check out how we built it!
        </Text>
        <Flex gap={[0, '80px']} direction="column">
          {STEP_SECTION.map((step) => (
            <CommonSection key={step.id} {...step} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default MagaModule;
