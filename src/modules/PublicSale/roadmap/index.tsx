'use client';

import { Box, Flex, GridItem, Image, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import React from 'react';
import cs from 'classnames';

interface IRoadMap {
  color: string,
  time: string,
  title: string,
  desc: string,
  button?: string,
  link?: string
}

const RoadmapModule = () => {
  const ROAD_MAPS = React.useMemo<IRoadMap[]>(() => {
    return [
      {
        color: '#EAC133',
        time: 'March 2023',
        title: 'Added EVM to Bitcoin',
        button: 'Learn more',
        link: 'https://twitter.com/punk3700/status/1628406581510676480',
        desc: 'This marked our first experiment in bringing smart contracts to Bitcoin, aiming to expand its utility beyond being just a currency.'
      },
      {
        color: '#13BBC9',
        time: 'May 2023',
        title: 'Deployed Uniswap on Bitcoin',
        button: 'Learn more',
        link: 'https://twitter.com/punk3700/status/1651252683179978752',
        desc: 'Our second experiment involved building sophisticated applications on Bitcoin, with Uniswap being the first use case. We built a fully functional DEX on Bitcoin as a result.'
      },
      {
        color: '#E64790',
        time: 'Sep 2023',
        title: 'Deployed Optimism on Bitcoin',
        button: 'Learn more',
        link: 'https://twitter.com/punk3700/status/1699821767781658669',
        desc: 'In the third experiment, we focused on scaling up Bitcoin, with Optimism being the first scaling solution. We plan to deploy more scaling technologies over time.'
      },
      {
        color: '#96C35A',
        time: 'Oct 2023',
        title: 'The First Bitcoin L2',
        button: 'Learn more',
        desc: 'Alpha Chain was the first Bitcoin L2 powered by BVM. It hosts the second biggest SocialFi dapp by TVL, and facilitates $36 million in volume and over 1 million transactions so far.',
        link: 'https://twitter.com/punk3700/status/1703819001510682709'
      },
      {
        color: '#8E51DF',
        time: 'Feb 2024',
        title: '$BVM Public Sale',
        button: 'Learn more',
        link: 'https://bvm.network/',
        desc: 'After a year of building on Bitcoin with battle-tested protocol and infrastructure, the BVM token sale is open with one single public sale round to facilitate greater involvement and support the project\'s continued growth.'
      },
      {
        color: '#9E9E9E',
        time: 'March 2024',
        title: 'TGE & Listing',
        button: '',
        link: '',
        desc: 'Investors can claim their BVM tokens from the public sale. BVM token is to be listed on several exchanges for trading.'
      },
      {
        color: '#9E9E9E',
        time: 'April 2024',
        title: 'BVM Staking',
        button: '',
        link: '',
        desc: 'Holders can stake their BVM tokens to earn staking rewards from different Bitcoin L2 blockchains within the BVM ecosystem.'
      },
      {
        color: '#9E9E9E',
        time: 'May 2024',
        title: 'Developer Ecosystem',
        button: '',
        link: '',
        desc: 'BVM to power thousands of Bitcoin L2s with builder teams from around the world.'
      },
      {
        color: '#9E9E9E',
        time: 'June 2024',
        title: 'Modular Store',
        button: '',
        link: '',
        desc: 'When launching a Bitcoin L2 with BVM, developers have the option to deploy pre-installed dapps for their blockchain, such as DEX, NFT Marketplace, Bridge, etc. Think of an app store but for blockchain.'
      },
    ]
  }, [])

  const renderItem = (item: IRoadMap, index: number) => {
    return (
      <GridItem className={cs(s.item, {[s.item__public]: index === 4})}>
        <Box
          bg={item.color}
          width={{ base: "32px", md: "48px" }}
          height={{ base: "32px", md: "48px" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="100px"
        >
          <Text fontSize={{ base: "18px", md: "24px" }} fontWeight="700" color="white">{index + 1}</Text>
        </Box>
        <Flex flex={1} flexDir="column" justifyContent="space-between" height="100%" gap="8px">
          <Flex flex={1} flexDir="column">
            <Text color="black" fontSize="12px" fontWeight="400" lineHeight="140%">{item.time}</Text>
            <Text color="black" fontWeight="400" lineHeight="140%" mt="4px">{item.title}</Text>
            <Text color="black" fontSize="14px" fontWeight="400" lineHeight="180%" opacity={0.7} mt="8px">{item.desc}</Text>
          </Flex>
          {item.button && (
            <a href={item.link} target="_blank" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "8px", color: '#FA4E0E', fontSize: '14px' }}>
              {item.button}
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M14.4613 8.50018C14.4359 8.56151 14.3994 8.61678 14.3534 8.66278L9.68669 13.3294C9.58935 13.4268 9.46133 13.4761 9.33333 13.4761C9.20533 13.4761 9.07731 13.4274 8.97998 13.3294C8.78465 13.1341 8.78465 12.8174 8.97998 12.6221L12.7933 8.80877H2C1.724 8.80877 1.5 8.58477 1.5 8.30877C1.5 8.03277 1.724 7.80877 2 7.80877H12.7926L8.97933 3.99546C8.784 3.80013 8.784 3.48343 8.97933 3.2881C9.17466 3.09277 9.49135 3.09277 9.68669 3.2881L14.3534 7.95477C14.3994 8.00077 14.4359 8.05603 14.4613 8.11737C14.5119 8.24003 14.5119 8.37751 14.4613 8.50018Z" fill="#FA4E0E"/>
              </svg>
              </span>
            </a>
          )}
        </Flex>
      </GridItem>
    )
  }

  return (
    <Box className={s.container}>
      <BoxContent>
        <Text fontSize={{ base: 32, md: 48 }} color="black" textAlign="center" mt={{ base: '24px', md: '60px' }}>
          Roadmap
        </Text>
        <Image
          src={'/images/roadmap.png'}
          alt={'road map'}
          maxW="100%"
          mx='auto'
          mt={{ base: '24px', md: '80px' }}
          display={{ base: 'none', sm: 'block' }}
        />
        <SimpleGrid gridTemplateColumns={{ base: "1fr", lg: '1fr 1fr', xl: "1fr 1fr 1fr" }} gap={{ base: "16px", md: "24px" }}>
          {ROAD_MAPS.map(renderItem)}
        </SimpleGrid>
      </BoxContent>
    </Box>
  );
};

export default RoadmapModule;
