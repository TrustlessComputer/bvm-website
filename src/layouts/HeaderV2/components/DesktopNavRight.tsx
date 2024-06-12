'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import Link from 'next/link';
import DropDown from '@/layouts/Header/components/Dropdown';
import ButtonLoginTwitter from './ButtonLoginTwitter';
import UserInforBox from './UserInforBox';
import ContactUs from './ContactUs';
import Community from './Community';
import { NAV_ITEMS_RIGHT } from '@layouts/Header/menuConfig';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const DesktopNavRight = (props: Props) => {
  return (
    <HStack direction={'row'} spacing={['40px', '32px']}>
      {NAV_ITEMS_RIGHT.map((navItem, index) => (
        <>
          {navItem.subMenu ? (
            <DropDown
              key={`${navItem.label}-${index}`}
              primaryColor={props.primaryColor}
              title={navItem.label}
              lists={navItem.subMenu}
            />
          ) : (
            <Link
              key={`${navItem.label}-${index}`}
              href={navItem.href ?? '#'}
              target={navItem.isNewWindow ? '_blank' : '_self'}
              color={props?.primaryColor || 'white'}
            >
              <Text
                textAlign={'center'}
                fontSize={['14px', '16px']}
                lineHeight={'110%'}
                fontWeight={400}
                color={props.primaryColor || 'black'}
                _hover={{}}
              >
                {navItem.label}
              </Text>
            </Link>
          )}
        </>
      ))}
      {<Community color={props.primaryColor || 'white'} />}
      {<ContactUs color={props.primaryColor || 'white'} />}

      {/* {!isLogged ? <ButtonLoginTwitter color={'white'} /> : <UserInforBox />} */}

      {/*<Link href={'/blockchains/customize'} className={s.tryBVm}>*/}
      {/*  Try BVM*/}
      {/*</Link>*/}

      {/*<Link*/}
      {/*  href={'https://github.com/trustlesscomputer/'}*/}
      {/*  target={'_blank'}*/}
      {/*  color={props?.primaryColor || 'white'}*/}
      {/*>*/}

      {/*  <Box*/}
      {/*    m={0}*/}
      {/*    p={'0'}*/}
      {/*    display={'flex'}*/}
      {/*    alignItems={'center'}*/}
      {/*    borderRadius={100}*/}
      {/*    bgColor={*/}
      {/*      props?.primaryColor === 'white' ? '#fff' : '#fefefec5'*/}
      {/*    }*/}
      {/*    justifyContent={'center'}*/}
      {/*    _hover={{*/}
      {/*      opacity: 0.7,*/}
      {/*    }}*/}
      {/*    onClick={() => {*/}
      {/*      window.open('https://github.com/trustlesscomputer/', '_blank');*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <IcGit fillColor={'#000000'} />*/}
      {/*  </Box>*/}
      {/*</Link>*/}

      {/*<Link*/}
      {/*  href={'https://twitter.com/bvmnetwork'}*/}
      {/*  target={'_blank'}*/}
      {/*  color={props?.primaryColor || 'white'}*/}
      {/*>*/}

      {/*  <Box*/}
      {/*    m={0}*/}
      {/*    p={'0'}*/}
      {/*    display={'flex'}*/}
      {/*    alignItems={'center'}*/}
      {/*    borderRadius={100}*/}
      {/*    bgColor={*/}
      {/*      props?.primaryColor === 'white' ? '#fff' : '#fefefec5'*/}
      {/*    }*/}
      {/*    justifyContent={'center'}*/}
      {/*    _hover={{*/}
      {/*      opacity: 0.7,*/}
      {/*    }}*/}
      {/*    onClick={() => {*/}
      {/*      window.open('https://twitter.com/bvmnetwork', '_blank');*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <IcTW fillColor={'#000000'} />*/}
      {/*  </Box>*/}
      {/*</Link>*/}
    </HStack>
  );
};
