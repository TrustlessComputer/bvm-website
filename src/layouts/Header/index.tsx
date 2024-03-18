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
import DrawerMobileMenu from './components/DrawerMenu';
import useAnimationStore from '@/stores/useAnimationStore';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import s from './style.module.scss';
import useWindowSize from '@/hooks/useWindowSize';
import { DesktopNavLeft } from '@/layouts/Header/components/DesktopNavLeft';
import { DesktopNavRight } from '@/layouts/Header/components/DesktopNavRight';

export type HeaderProps = {
  color?: 'black' | 'white';
  position?: 'absolute' | 'relative';
  bgColor?: string;
};

export const HEADER_ID = 'HEADER_VIEW';

const Header = (props: HeaderProps) => {
  const primaryColor = props.color || 'white';
  const position = props.position || 'absolute';
  const bgColor = props.bgColor || 'transparent';
  const pathName = usePathname();

  const { isOpen, onToggle } = useDisclosure();
  const { play } = useAnimationStore();
  const isHome = useMemo(() => {
    return pathName === '/';
  }, [pathName]);
  const isMobile = useBreakpointValue({ base: true, md: false }) as boolean;
  const { tabletScreen, isDesktop } = useWindowSize();

  return (
    <>
      <Box
        id={HEADER_ID}
        position={position}
        bgColor={bgColor}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        py={['20px', '20px']}
        top={0}
        left={0}
        right={0}
        zIndex={5}
        className={cn(s.header, isHome ? s.isHome : '', play ? s.play : '')}
      >
        <BoxContent id='HEADER_CONTENT'>
          <Flex
            display={'flex'}
            flexDir={'row'}
            w={'100%'}
            alignItems={'center'}
            minH={['40px', '40px']}
          >

            {
              isDesktop && <DesktopNavLeft primaryColor={primaryColor} />
            }

            <Box
              className={s.logo}
              flex={tabletScreen ? '' : 1}
              _hover={{
                cursor: 'pointer',
              }}
            >
              <Link href='/'>
                {primaryColor === 'white' ? (
                  <Image src={`/icons/logo_white.svg`} />
                ) : (
                  <Image src={`/icons/logo_black.svg`} />
                )}
              </Link>
            </Box>

            <Flex flex={1} justify={'right'}>
              {!isDesktop ? (
                <IconButton
                  onClick={onToggle}
                  icon={
                    <Image
                      src={'/icons/menu_ic.svg'}
                      w={'24px'}
                      h={'24px'}
                      color={'white'}
                      filter={
                        primaryColor === 'white' ? 'invert(100)' : 'invert(0)'
                      }
                    />
                  }
                  color={'white'}
                  aria-label={'Toggle Menu'}
                  _hover={{
                    bgColor: 'transparent',
                  }}
                />
              ) : (
                <DesktopNavRight primaryColor={primaryColor} />
              )}
            </Flex>
          </Flex>
        </BoxContent>
      </Box>
      <DrawerMobileMenu isOpen={isOpen} onToggle={onToggle} />
    </>
  );
};

export default Header;
