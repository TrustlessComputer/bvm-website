'use client';

import { Box, Container, Stack, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={'2xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'center' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>OPEN-SOURCE SOFTWARE. MADE WITH ❤️ ON BITCOIN.</Text>
        {/* <Stack direction={'row'} spacing={6}></Stack> */}
      </Container>
    </Box>
  );
};

export default Footer;
