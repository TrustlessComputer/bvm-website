'use client';

import { Button, Link, StackDivider, Text, VStack } from '@chakra-ui/react';
import { NAV_ITEMS } from '../menuConfig';

export const MobileNav = () => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={10}
      alignItems={'flex-start'}
      px={'24px'}
      py={'60px'}
    >
      {NAV_ITEMS.map((item) => (
        <Link
          p={2}
          href={item.href ?? '#'}
          fontSize={'16px'}
          fontWeight={500}
          color={'#000'}
          _hover={{}}
        >
          {item.label}
        </Link>
      ))}
    </VStack>
  );
};
