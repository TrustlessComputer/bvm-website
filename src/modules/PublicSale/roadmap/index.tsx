'use client';

import { Box, Flex, GridItem, Image, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import React from 'react';
import cs from 'classnames';
import SvgInset from '@/components/SvgInset';
import { CDN_URL_ICONS } from '@/config';

interface IRoadMap {
  color: string,
  time: string,
  title: string,
  desc: any,
  button?: string,
  link?: string,
  isDone?: boolean
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
        desc: '• Deployed smart contracts on Bitcoin<br/>• Built BVM as EVM-equivalent Layer 1 on Bitcoin<br/>• Expand Bitcoin’s utility beyond being just a currency'
      },
      {
        color: '#13BBC9',
        time: 'May 2023',
        title: 'Deployed Uniswap on Bitcoin',
        button: 'Learn more',
        link: 'https://twitter.com/punk3700/status/1654532883388977158',
        desc: '• Built a DEX on Bitcoin using Uniswap smart contracts<br/>• An early example of DeFi on Bitcoin<br/>'
      },
      {
        color: '#E64790',
        time: 'Sep 2023',
        title: 'Deployed Optimism on Bitcoin',
        button: 'Learn more',
        link: 'https://twitter.com/punk3700/status/1699821767781658669',
        desc: '• Scaled up Bitcoin using OP rollups<br/>• This enabled Bitcoin L2s with high speed and low gas'
      },
      {
        color: '#96C35A',
        time: 'Oct 2023',
        title: 'The First Bitcoin L2',
        button: 'Learn more',
        desc: '• Alpha Chain is the first Bitcoin L2 powered by BVM<br/>• It hosts Alpha app - the second biggest SocialFi dapp by TVL<br/>• It facilitates $36M+ in volume & 1M+ transactions so far',
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
        color: '#75CDAD',
        time: 'March 2024',
        title: 'TGE & Listing',
        button: 'Learn more',
        link: 'https://twitter.com/BVMnetwork/status/1764925124262985839',
        desc: '• Investors can claim BVM tokens from the public sale.<br/>• BVM token to be listed on several exchanges<br/>'
      },
      {
        color: '#FF6868',
        time: 'April 2024',
        title: 'BVM Staking',
        button: 'Learn more',
        link: 'https://twitter.com/BVMnetwork/status/1764925124262985839',
        desc: '• Stake BVM tokens and earn staking rewards from different Bitcoin L2 blockchains within the BVM ecosystem'
      },
      {
        color: '#9E9E9E',
        time: 'May 2024',
        title: 'Developer Ecosystem',
        button: '',
        link: '',
        desc: '• BVM to power thousands of Bitcoin L2s with builder teams from around the world'
      },
      {
        color: '#9E9E9E',
        time: 'June 2024',
        title: 'Modular Store',
        button: '',
        link: '',
        desc: '• Developers have the option to deploy pre-installed dapps for their Bitcoin L2s, such as DEX, NFT Marketplace, etc<br/>'
      },
    ]
  }, [])

  const renderItem = (item: IRoadMap, index: number) => {
    const isDone = index < 6;
    const isFeature = index > 6;
    return (
      <GridItem className={cs(s.item, {[s.item__public]: index === 4, [s.item__feature]: isFeature})}>
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
            <Flex alignItems="center" gap="6px">
              <Text color="black" fontWeight="400" lineHeight="140%" mt="4px">{item.title}</Text>
              {!!isDone && (
                <span><SvgInset svgUrl={`${CDN_URL_ICONS}/check-green.svg`} /></span>
              )}
            </Flex>

            <Box as='p' color='black' fontSize='14px' fontWeight='400' lineHeight='180%' opacity={0.7} mt='8px' dangerouslySetInnerHTML={{ __html: item.desc }}/>
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
    <Box className={`containerV3 ${s.container}`}>
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
