'use client';
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { CDN_URL_ICONS } from '@/config';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { DesktopNav } from './components/DesktopNav';
import { MobileNav } from './components/MobileNav';
import SvgInset from '@/components/SvgInset';
import s from './style.module.scss';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  // const isMobile = useBreakpointValue({ base: true, md: false }) as boolean;
  // console.log('TEST   isMobile  ', isMobile);
  return (
    <Box
      position={'absolute'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      top={0}
      left={0}
      right={0}
      zIndex={9999}
    >
      <Flex
        minH={'60px'}
        maxWidth={'1600px'}
        alignSelf={'center'}
        py={{ base: 2 }}
        px={[4, null]}
        display={'flex'}
        flex={1}
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
            <SvgInset
              svgUrl={`${CDN_URL_ICONS}/logo_bvm.svg`}
              size={200}
              style={{
                filter: 'invert(1)',
              }}
            />
          </Button>
        </Flex>

        {/* Right View */}
        <Flex flex={1} justify={{ base: 'flex-end' }}>
          <Flex display={{ base: 'flex', md: 'none' }}>
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
