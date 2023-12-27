'use client';

import { CDN_URL_ICONS } from '@/config';
import {
  AbsoluteCenter,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DataList } from './config';

const Section_2 = () => {
  const renderCard = (item: any) => {
    return (
      <Card>
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  };
  return (
    <Flex bgColor={'#fff'} flexDir={'column'} display={'flex'} p={[8, 24, 32]}>
      <Text
        textAlign={'left'}
        fontSize={['24px', '48px']}
        lineHeight={'110%'}
        color={'#000'}
      >
        {`The Bitcoin Superchain`}
      </Text>
      <Box height={'40px'} />
      <SimpleGrid minChildWidth="120px" spacing={['12px', '36px']}>
        {DataList.map((item) => renderCard(item))}
      </SimpleGrid>
    </Flex>
  );
};

export default Section_2;
