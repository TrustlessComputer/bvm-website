'use client';
import {
  Box,
  Flex,
  IconButton,
  Image,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import BoxContent from '../BoxContent';
import { DesktopNav } from './components/DesktopNav';
import DrawerMobileMenu from './components/DrawerMenu';

export type HeaderProps = {
  color?: 'black' | 'white';
  position?: 'absolute' | 'relative';
  bgColor?: string;
};

const Header = (props: HeaderProps) => {
  const primaryColor = props.color || 'white';
  const position = props.position || 'absolute';
  const bgColor = props.bgColor || 'transparent';

  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false }) as boolean;

  return (
    <>
      <Box
        id="HEADER_VIEW"
        position={position}
        bgColor={bgColor}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        py={['20px', '20px']}
        top={0}
        left={0}
        right={0}
        zIndex={2}
      >
        <BoxContent id="HEADER_CONTENT">
          <Flex
            display={'flex'}
            flexDir={'row'}
            w={'100%'}
            alignItems={'center'}
            minH={['40px', '40px']}
          >
            {/* Left View */}
            <Flex
              flex={1}
              justify={'left'}
              _hover={{
                cursor: 'pointer',
              }}
            >
              <Link href="/">
                {primaryColor === 'white' ? (
                  <Image src={`/icons/logo_white.svg`} />
                ) : (
                  <Image src={`/icons/logo_black.svg`} />
                )}
              </Link>
            </Flex>

            {/* Right View */}
            <Flex flex={1} justify={'right'}>
              {isMobile ? (
                <IconButton
                  onClick={onToggle}
                  icon={
                    <Image src={'/icons/menu_ic.svg'} w={'24px'} h={'24px'} />
                  }
                  aria-label={'Toggle Menu'}
                  _hover={{
                    bgColor: 'transparent',
                  }}
                />
              ) : (
                <DesktopNav primaryColor={primaryColor} />
              )}
            </Flex>
          </Flex>
        </BoxContent>
      </Box>
      <DrawerMobileMenu isOpen={isOpen} />
    </>
  );
};

export default Header;
