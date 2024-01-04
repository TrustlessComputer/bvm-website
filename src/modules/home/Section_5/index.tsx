'use client';

import {
  Box,
  Flex,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

const News = {
  content: [
    'Earn sequencer fees',
    'Have dedicated throughput',
    'Offer low transaction fees to your users',
    'Complete control over gas fee, gas block limit, and withdrawal periods',
    'And more',
  ],
};

const Section_5 = () => {
  return (
    <Box bgColor={'#fff'} display={'flex'} flexDirection={'column'}>
      <HStack
        display={'flex'}
        flexDirection={'row'}
        className="maxWidth"
        alignSelf={'center'}
        spacing={['80px']}
      >
        <Flex flex={1}>
          <Image src="/images/image_section_2.png" />
        </Flex>
        <Flex flex={1} flexDirection={'column'}>
          <Text fontSize={['48px']} color={'#000'}>
            Why launch
            <Text fontSize={['48px']} color={'#00C250'} as="span">
              {' '}
              your own blockchain?{' '}
            </Text>{' '}
          </Text>
          <Box height={['12px']} />
          <Text fontSize={['16px']} fontWeight={400} color={'#000'}>
            Whatever your vision — a dapp, a fully onchain game, a DEX, or an
            ecosystem — there are many benefits of running your own blockchain.
          </Text>
          <Box height={['32px']} />
          <Box
            bgColor={'#F2FCF6'}
            padding={['24px']}
            border={'1px solid #C2F0D5'}
            color={'#000'}
          >
            <List spacing={['20px']}>
              {News.content.map((item, index) => (
                <ListItem
                  key={`${item + index}`}
                  flexDir={'row'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Box
                    w={'8px'}
                    h={'8px'}
                    borderRadius={100}
                    bgColor={'#00C250'}
                    marginRight={'12px'}
                  ></Box>
                  {item || ''}
                </ListItem>
              ))}
            </List>
          </Box>
        </Flex>
      </HStack>
      <Box height={['120px']} />
    </Box>
  );
};

export default Section_5;
