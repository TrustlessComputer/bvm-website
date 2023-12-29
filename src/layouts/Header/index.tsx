'use client';
import SvgInset from '@/components/SvgInset';
import { CDN_URL_ICONS } from '@/config';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { DesktopNav } from './components/DesktopNav';
import { MobileNav } from './components/MobileNav';
import Link from 'next/link';

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

  const renderMenuButton = () => {
    return (
      <IconButton
        onClick={onToggle}
        icon={<Image src={'/icons/menu_ic.svg'} w={'24px'} h={'24px'} />}
        aria-label={'Toggle Menu'}
        bgColor={'transparent'}
        _hover={{
          bgColor: 'transparent',
        }}
        style={{
          filter: primaryColor === 'white' ? 'invert(1)' : 'none',
        }}
      />
    );
  };

  return (
    <>
      <Box
        position={position === 'absolute' ? 'absolute' : 'relative'}
        bgColor={bgColor}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        top={0}
        left={0}
        right={0}
        zIndex={2}
      >
        <Flex
          minH={'60px'}
          className="maxWidth"
          alignSelf={'center'}
          py={{ base: 2 }}
          px={[4, null]}
          display={'flex'}
          flex={1}
          align={'center'}
          id="header"
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
              <SvgInset
                svgUrl={`${CDN_URL_ICONS}/logo_bvm.svg`}
                size={200}
                style={{
                  filter: primaryColor === 'white' ? 'invert(1)' : 'black',
                }}
              />
            </Link>
          </Flex>

          {/* Right View */}
          <Flex flex={1} justify={'right'}>
            {isMobile ? (
              renderMenuButton()
            ) : (
              <DesktopNav primaryColor={primaryColor} />
            )}
          </Flex>
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onToggle} size={'sm'}>
        <DrawerOverlay />
        <DrawerContent zIndex={3}>
          <DrawerBody bgColor={'#F3F1E8'}>{<MobileNav />}</DrawerBody>
          <DrawerFooter
            bgColor={'#F3F1E8'}
            justifyContent={'center'}
            alignItems={'center'}
            padding={'40px'}
          >
            <Image
              src={'/icons/close_ic.svg'}
              borderRadius={100}
              width={50}
              height={50}
              alignSelf={'center'}
              onClick={onToggle}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
