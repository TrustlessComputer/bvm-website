'use client';

import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { CDN_URL_ICONS } from '@/config';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { DesktopNav } from './components/DesktopNav';
import { MobileNav } from './components/MobileNav';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  // const isMobile = useBreakpointValue({ base: true, md: false }) as boolean;
  // console.log('TEST   isMobile  ', isMobile);
  return (
    <Box position={'sticky'} top={0}>
      <Flex
        // bg={useColorModeValue('white', 'gray.800')}
        bg={'black'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 12, md: 24, lg: 36 }}
        borderBottom={1}
        borderStyle={'solid'}
        display={'flex'}
        // borderColor={'black'}
        align={'center'}
      >
        {/* Left View */}
        <Flex
          flex={{ base: 1 }}
          justify={'left'}
          _hover={{
            cursor: 'pointer',
          }}
        >
          <Button as="a" href="/" variant={'link'}>
            <img src={`${CDN_URL_ICONS}/logo.png`} width={35} height={35} />
          </Button>
        </Flex>

        {/* Right View */}
        <Flex flex={1} justify={{ base: 'flex-end' }}>
          <Flex display={{ base: 'flex', md: 'none' }} ml={10}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              aria-label={'Toggle Navigation'}
            />
          </Flex>
        </Flex>

        <Flex display={{ base: 'none', md: 'flex' }}>
          <DesktopNav />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Header;
