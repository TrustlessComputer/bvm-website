'use client';

import { HStack, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { NAV_ITEMS } from '../menuConfig';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const DesktopNav = (props: Props) => {
  return (
    <HStack direction={'row'} spacing={6}>
      {NAV_ITEMS.map((navItem) => (
        <Link
          key={navItem.label}
          href={navItem.href ?? '#'}
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
      ))}
    </HStack>
  );
};
