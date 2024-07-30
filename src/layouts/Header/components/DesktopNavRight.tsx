'use client';

import { Box, Button, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { NAV_ITEMS_RIGHT } from '../menuConfig';
import DropDown from '@/layouts/Header/components/Dropdown';
import ContactUs from './ContactUs';
import Community from './Community';
import useNakaAuthen from '@hooks/useRequestNakaAccount';
import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { isProduction } from '@/config';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const DesktopNavRight = (props: Props) => {
  const { buttonText, requestAccount, isAuthen, loading, nakaAddress } =
    useNakaAuthen();

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
              key={navItem.label}
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
      {/*{!isLogged ? <ButtonLoginTwitter color={'white'} /> : <UserInforBox />}*/}
      {!isAuthen ? (
        <Button
          height="48px"
          fontSize="16px"
          width="120px"
          fontWeight="600"
          background="#FA4E0E"
          borderRadius="0px"
          isDisabled={loading}
          isLoading={loading}
          onClick={requestAccount}
        >
          {buttonText}
        </Button>
      ) : (
        <Box
          cursor="pointer"
          as="a"
          target="_blank"
          href={
            (isProduction
              ? 'https://explorer.nakachain.xyz/'
              : 'https://nos-explorer.regtest.trustless.computer/') +
            `address/${nakaAddress}`
          }
        >
          <Jazzicon
            diameter={32}
            seed={jsNumberForAddress(nakaAddress || '')}
          />
        </Box>
      )}

      {/*<Link href={'/rollups/customize'} className={s.tryBVm}>*/}
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
