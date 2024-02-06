'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { NAV_ITEMS, NAV_ITEMS_RIGHT } from '../menuConfig';
import { IcTW } from './IcTW';
import { ReactElement } from 'react';
import SvgInset from '@/components/SvgInset';
import s from './styles.module.scss';
import { IcGit } from '@/layouts/Header/components/IcGit';
import DropDown from '@/layouts/Header/components/Dropdown';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const DesktopNavRight = (props: Props) => {
  return (
    <HStack direction={'row'} spacing={['40px', '40px']}>
      {NAV_ITEMS_RIGHT.map((navItem) => (
        <>

          {
            navItem.subMenu ?
              <DropDown primaryColor={props.primaryColor} title={navItem.label} lists={navItem.subMenu} />
              :
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
                  fontWeight={500}
                  color={props.primaryColor || 'black'}
                  _hover={{}}
                >
                  {navItem.label}
                </Text>
              </Link>
          }



        </>
      ))}

      <Link
        href={'https://github.com/trustlesscomputer/'}
        target={ '_blank'}
        color={props?.primaryColor || 'white'}
      >

        <Box
          m={0}
          p={'0'}
          display={'flex'}
          alignItems={'center'}
          borderRadius={100}
          bgColor={
            props?.primaryColor === 'white' ? '#fff' : '#fefefec5'
          }
          justifyContent={'center'}
          _hover={{
            opacity: 0.7,
          }}
          onClick={() => {
            window.open('https://github.com/trustlesscomputer/', '_blank');
          }}
        >
          <IcGit fillColor={'#000000'} />
        </Box>
      </Link>

      <Link
        href={'https://twitter.com/bvmnetwork'}
        target={ '_blank'}
        color={props?.primaryColor || 'white'}
      >

        <Box
          m={0}
          p={'0'}
          display={'flex'}
          alignItems={'center'}
          borderRadius={100}
          bgColor={
            props?.primaryColor === 'white' ? '#fff' : '#fefefec5'
          }
          justifyContent={'center'}
          _hover={{
            opacity: 0.7,
          }}
          onClick={() => {
            window.open('https://twitter.com/bvmnetwork', '_blank');
          }}
        >
          <IcTW fillColor={'#000000'} />
        </Box>
      </Link>
    </HStack>
  );
};
