'use client';

import { Box, Link, Popover, PopoverTrigger, Stack } from '@chakra-ui/react';

import { NAV_ITEMS } from '../menuConfig';

export const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'16px'}
                fontWeight={500}
                color={'#fff'}
                _hover={{}}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
