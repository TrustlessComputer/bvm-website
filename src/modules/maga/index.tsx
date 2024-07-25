import { Box, Flex, Text } from '@chakra-ui/react';

import CaseStudy from './CaseStudy';
import CommonSection from './CommonSection';
import s from './styles.module.scss';

const STEP_SECTION = [
  {
    id: 1,
    subTile: 'Craft the Bitcoin Wars blockchain with Bitcoin Studio',
    subDescription:
      'Bitcoin Studio makes blockchain building a breeze! We whipped up the Bitcoin Wars blockchain as a ZK rollup on Bitcoin using simple drag-and-drop tools. No sweat, just pure innovation.',
    image: '/maga/step-1.gif',
    specialImage: true,
    link: '/studio',
    isExternal: false,
    buttonText: 'Visit Bitcoin Studio',
  },
  {
    id: 2,
    subTile: 'Design the gameplay with smart contracts',
    subDescription:
      'Dive into the heart of the action! Our Bitcoin Wars blockchain isn’t just any blockchain; it’s a ZK rollup on Bitcoin and EVM compatible. We crafted every game state and logic as smart contracts in Solidity, deploying them effortlessly with Hardhat. Game on!',
    image: '/maga/step-2.svg',
    link: 'https://docs.bvm.network/bvm',
    isExternal: true,
    specialImage: false,
    buttonText: 'Developer docs',
  },
  {
    id: 3,
    subTile: 'Build the mobile app with PWA',
    subDescription:
      'We wrapped it all up in a sleek mobile app using Progressive Web App (PWA), making it super easy for players to jump into the game. Plus, with Social Login for wallet creation and Account Abstraction for smooth payments, the adventure is as seamless as it is exciting.',
    image: '/maga/step-3.svg',
    link: '/studio',
    isExternal: false,
    specialImage: false,
    buttonText: 'Learn more',
  },
];

const MagaModule = () => {
  return (
    <Box className={s.container}>
      <Flex className="containerV3" direction="column">
        <CaseStudy />
        <Text className={s.textHeadline} pt={['80px']}>
          Developers, see how we made the magic happen!
        </Text>
        <Flex gap={[0, '80px']} direction="column">
          {STEP_SECTION.map((step: any) => (
            <CommonSection key={step.id} {...step} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default MagaModule;
