'use client';

import { Box, Flex, GridItem, SimpleGrid, Text, Image } from '@chakra-ui/react';
import s from './styles.module.scss';
import React from 'react';
import cs from 'classnames';

interface IRoadMap {
  color: string;
  time: string;
  title: string;
  desc: any;
  button?: string;
  link?: string;
  isDone?: boolean;
}

const Roadmap = () => {
  const ROAD_MAPS = React.useMemo<IRoadMap[]>(() => {
    return [
      {
        color: '#6E16FE26',
        time: 'Mar 2023',
        title: 'Perceptrons',
        button: 'Learn more',
        link: 'https://twitter.com/punk3700/status/1640770159135846401',
        desc: 'Deployed 554 fully onchain neural networks on Bitcoin',
      },
      {
        color: '#6E16FE26',
        time: 'April 2023',
        title: 'AI Dojo',
        button: 'Learn more',
        link: 'https://twitter.com/punk3700/status/1651978318764462080',
        desc: 'Released a no-code tool for anyone to build their own AI model in a few clicks.',
      },
      {
        color: '#6E16FE26',
        time: 'Feb 2024',
        title: 'Eternal AI Testnet',
        button: 'Learn more',
        link: 'https://twitter.com/CryptoEternalAI/status/1755190519104508207',
        desc: 'Released a Bitcoin L2 custom-made for AI tasks',
      },
      {
        color: '#6E16FE26',
        time: 'Mar 2024',
        title: 'Eternal AI Smart Contracts Library',
        button: 'Learn more',
        link: 'https://twitter.com/punk3700/status/1770468970925031809',
        desc: 'Released a library for developers to build fully onchain neural networks in Solidity.',
      },
      {
        color: '#6E16FE26',
        time: 'Mar 2024',
        title: '$EAI Public Sale',
        button: 'Learn more',
        link: 'https://twitter.com/CryptoEternalAI/status/1772483218261922212',
        desc: 'No VC. No private sale. To the public only.',
      },
      {
        color: '#CECECE',
        time: 'Apr 2024',
        title: 'Eternal AI Mainnet',
        button: '',
        link: '',
        desc: 'To kickstart the network, release tokens, and list $EAI on exchanges.',
      },
      {
        color: '#CECECE',
        time: 'May 2024',
        title: 'EAI-20',
        button: '',
        link: '',
        desc: 'To release EAI-20, a new standard for AI tokens.',
      },
      {
        color: '#CECECE',
        time: 'May 2024',
        title: 'Eternal Bazaar',
        button: '',
        link: '',
        desc: 'To release a marketplace for people to trade Eternals.',
      },
      {
        color: '#CECECE',
        time: 'June 2024',
        title: 'AI Dojo v2',
        button: '',
        link: '',
        desc: 'To upgrade AI Dojo with decentralized training capabilities.',
      },
      {
        color: '#CECECE',
        time: 'Q3 2024',
        title: 'Transformers',
        button: '',
        link: '',
        desc: 'To add transformers to Eternal AI (reference: https://arxiv.org/abs/1706.03762)',
      },
      {
        color: '#CECECE',
        time: 'Q4 2024',
        title: 'Parallel Computation',
        button: '',
        link: '',
        desc: 'To add parallel computation to Eternal AI.',
      },
    ];
  }, []);

  const renderItem = (item: IRoadMap, index: number) => {
    const isFeature = index > 4;
    return (
      <GridItem className={cs(s.item, isFeature && s.item__feature)}>
        <Box
          bg={item.color}
          width={{ base: '36px', md: '36px' }}
          height={{ base: '36px', md: '36px' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="100px"
        >
          <Text
            fontSize={{ base: '14px', md: '14px' }}
            fontWeight="700"
            color={isFeature ? '#2E2E2E' : '#6E16FE'}
          >
            {index + 1}
          </Text>
        </Box>
        <Flex
          flex={1}
          flexDir="column"
          justifyContent="space-between"
          height="100%"
          gap="8px"
        >
          <Flex flex={1} flexDir="column">
            {/*<Text color="black" fontSize="12px" fontWeight="400" lineHeight="140%">{item.time}</Text>*/}
            <Flex alignItems="center" gap="6px">
              <Text
                color="black"
                fontSize={'20px'}
                fontWeight="600"
                lineHeight="140%"
                mt="4px"
              >
                {item.title} - {item.time}
              </Text>
            </Flex>
            <Box
              as="p"
              color="black"
              fontSize="16px"
              fontWeight="400"
              lineHeight="140%"
              mt="8px"
              dangerouslySetInnerHTML={{ __html: item.desc }}
            />
          </Flex>
          {item.button && (
            <a
              href={item.link}
              target="_blank"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                color: '#6E16FE',
                fontSize: '14px',
                fontWeight: 400,
              }}
            >
              {item.button}
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4613 8.19061C14.4359 8.25194 14.3994 8.30721 14.3534 8.35321L9.68669 13.0199C9.58935 13.1172 9.46133 13.1665 9.33333 13.1665C9.20533 13.1665 9.07731 13.1179 8.97998 13.0199C8.78465 12.8245 8.78465 12.5078 8.97998 12.3125L12.7933 8.4992H2C1.724 8.4992 1.5 8.2752 1.5 7.9992C1.5 7.7232 1.724 7.4992 2 7.4992H12.7926L8.97933 3.68589C8.784 3.49055 8.784 3.17386 8.97933 2.97853C9.17466 2.7832 9.49135 2.7832 9.68669 2.97853L14.3534 7.6452C14.3994 7.6912 14.4359 7.74646 14.4613 7.8078C14.5119 7.93046 14.5119 8.06794 14.4613 8.19061Z"
                    fill="#6E16FE"
                  />
                </svg>
              </span>
            </a>
          )}
        </Flex>
      </GridItem>
    );
  };

  return (
    <div className={s.wrapper}>
      <Text className={s.title}>Roadmap</Text>
      <Box className={s.container}>
        <Image
          src={'/images/launchpad/eternal_ai/roadmap_2.png'}
          alt={'road map'}
          maxW="100%"
          maxH={'650px'}
          mx="auto"
          mb={{ base: '24px', md: '80px' }}
          display={{ base: 'none', sm: 'block' }}
        />
        <SimpleGrid
          gridTemplateColumns={{
            base: '1fr',
            lg: '1fr 1fr',
            xl: '1fr 1fr 1fr',
          }}
          gap={{ base: '16px', md: '24px' }}
        >
          {ROAD_MAPS.map(renderItem)}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default Roadmap;
