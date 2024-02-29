'use client';

import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import cn from 'classnames';

import { getListBuilders } from '@/services/builder';
import SvgInset from '@/components/SvgInset';

import s from './styles.module.scss';
import { useEffect, useState } from 'react';

const BUILDER_POINTS = [
  {
    id: 0,
    title: 'Your Bitcoin L2 testnet goes live',
    point: '+1,000 PTS',
    extraText: null,
    description:
      'Simply customize and launch your own Bitcoin L2 block for free in just a few clicks.',
    renderFooter: (
      <button className={s.activeBtn}>
        Launch Bitcoin L2 Testnet For Free Now
      </button>
    ),
  },
  {
    id: 1,
    title: 'Deploy a smart contract on testnet',
    point: '+5,000 PTS',
    extraText: null,
    description:
      'Since BVM is EVM equivalent, you can migrate your Solidity smart contracts and dapps from Ethereum (or other chains) to your Bitcoin L2 with minimal or no modification.',
    renderFooter: <button className={s.activeBtn}>Developer guides</button>,
  },
  {
    id: 2,
    title: 'Number of active wallets on testnet',
    point: '+1 PTS',
    extraText: 'per active wallet',
    description:
      'The more active wallets in your Bitcoin L2 blockchain, the more Builder Points you get.',
    renderFooter: <button className={s.activeBtn}>Developer guides</button>,
  },
  {
    id: 3,
    title: 'Your Bitcoin L2 mainnet goes live',
    point: '+1,000,000 PTS',
    description:
      'Once you are ready, our team will support your Bitcoin L2 project to move from testnet to mainnet.',
    renderFooter: (
      <Box>
        <Text>Get in touch with us</Text>
        <Flex gap="12px">
          <a
            className={s.shareLink}
            href="https://twitter.com/bird_2836"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SvgInset svgUrl={`airdrop/tw_white.svg`} />
            Twitter
          </a>
          <a
            className={cn(s.shareLink, s.telegramBtn)}
            href="https://t.me/bird2836"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SvgInset svgUrl={`airdrop/ic_telegram.svg`} />
            Telegram
          </a>
        </Flex>
      </Box>
    ),
  },
  {
    id: 4,
    title: 'TVL of your Bitcoin L2 mainnet',
    point: '+10 PTS',
    extraText: 'per 1$ in TVL',
    description:
      'The higher the TVL in your Bitcoin L2 blockchain, the more Builder Points you get.',
    renderFooter: null,
  },
];

const BuilderSection = () => {
  const [listBuilders, setListBuilders] = useState<
    Record<string, number | string>[]
  >([]);

  const fetchData = async () => {
    const result = await getListBuilders({});
    setListBuilders(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      w={'100%'}
      py="80px"
      flexDir={'column'}
      bgColor={'#000000'}
      gap="60px"
      align={'center'}
    >
      <Text className={s.textHeadline}>For Builders</Text>
      <Box className="container">
        <Flex gap="80px">
          <Box w="70%">
            <Text className={s.title}>Live Bitcoin L2s</Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Rank</Th>
                    <Th>Live Bitcoin L2s</Th>
                    <Th isNumeric>Builder Points</Th>
                    <Th>Learn More</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listBuilders?.map?.((item) => (
                    <Tr key={item.id}>
                      <Td>#{item.ranking}</Td>
                      <Td>
                        <Text>{item.name}</Text>
                        <Text>{item.evn}</Text>
                      </Td>
                      <Td isNumeric>{item.point}</Td>
                      <Td>
                        <a
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name}
                        </a>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          <Box w="30%">
            <Text className={s.title}>Builder Points </Text>
            <Flex direction="column" gap="20px">
              {BUILDER_POINTS.map((item) => (
                <Box key={item.id} className={s.itemPoint}>
                  <Flex gap="24px">
                    <Box>
                      <Text>{item.title}</Text>
                      <Text>{item.description}</Text>
                    </Box>
                    <Box>
                      <Text>{item.point}</Text>
                      <Text>{item.extraText}</Text>
                    </Box>
                  </Flex>
                  {item.renderFooter}
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default BuilderSection;
