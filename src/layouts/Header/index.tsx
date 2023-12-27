'use client';

import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { MobileNav } from './components/MobileNav';
import SvgInset from '@/components/SvgInset';
import { CDN_URL_ICONS } from '@/config';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position={'sticky'} top={0}>
      <Flex
        // bg={useColorModeValue('white', 'gray.800')}
        bg={'black'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 20, lg: 32 }}
        borderBottom={1}
        borderStyle={'solid'}
        display={'flex'}
        borderColor={'black'}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          {/* <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            <Button as="a" href="/" variant={'link'}>
              Logo
            </Button>
          </Text> */}

          <SvgInset svgUrl={`${CDN_URL_ICONS}/logo.svg`} size={32} />

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {/* <DesktopNav /> */}
          </Flex>
        </Flex>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          display={{ base: 'flex' }}
          justify={{ base: 'flex-end', md: 'auto' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            aria-label={'Toggle Navigation'}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Header;
