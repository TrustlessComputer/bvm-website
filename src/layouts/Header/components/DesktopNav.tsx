'use client';

import {
  Box,
  Link,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useBreakpoint,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import { NAV_ITEMS } from '../menuConfig';
import { DesktopSubNav } from './DesktopSubNav';
import s from './style.module.scss';

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
                fontSize={'lg'}
                fontWeight={500}
                color={'#fff'}
                _hover={{}}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {/* {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <PopoverArrow />
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )} */}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
