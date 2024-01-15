'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { NAV_ITEMS, NAV_ITEMS_LEFT } from '../menuConfig';
import { IcTW } from './IcTW';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const DesktopNavLeft = (props: Props) => {
  return (
    <HStack direction={'row'} spacing={['40px', '40px']}>
      {NAV_ITEMS_LEFT.map((navItem) => (
        <Link
          key={navItem.label}
          href={navItem.href ?? '#'}
          target={navItem.isNewWindow ? '_blank' : '_self'}
          color={props?.primaryColor || 'white'}
        >
          {navItem?.isTwitter ? (
            <Box
              m={0}
              p={'10px'}
              display={'flex'}
              alignItems={'center'}
              borderRadius={100}
              bgColor={
                props?.primaryColor === 'white' ? '#b2b1b158' : '#fefefec5'
              }
              justifyContent={'center'}
              _hover={{
                opacity: 0.7,
              }}
              onClick={() => {
                window.open(navItem.href, '_blank');
              }}
            >
              <IcTW fillColor={props?.primaryColor} />
            </Box>
          ) : (
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
          )}
        </Link>
      ))}
    </HStack>
  );
};
