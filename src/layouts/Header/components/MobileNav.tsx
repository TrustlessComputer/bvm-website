'use client';

import { Link, StackDivider, VStack } from '@chakra-ui/react';
import { NAV_ITEMS } from '../menuConfig';
import MobileDropdown from '@/layouts/Header/components/MobileDropdown';
import Community from './Community';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const MobileNav = (props: Props) => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={10}
      alignItems={'flex-start'}
      px={'24px'}
      py={'32px'}
    >
      {NAV_ITEMS.map((item) => (
        <>
          {item.subMenu ? (
            <MobileDropdown
              primaryColor={props.primaryColor}
              title={item.label}
              lists={item.subMenu}
            />
          ) : (
            <Link
              p={2}
              href={item.href ?? '#'}
              fontSize={['16px', '16px']}
              fontWeight={400}
              color={'#000'}
              target={item.isNewWindow ? '_blank' : '_self'}
              _hover={{}}
            >
              {item.label}
            </Link>
          )}
        </>
      ))}
      <Community />
    </VStack>
  );
};
