'use client';

import { Box } from '@chakra-ui/react';
import { HTMLChakraProps } from '@chakra-ui/system';
import * as _chakra_ui_system from '@chakra-ui/system';

// const breakpoints = {
//   base: "0em", // 0px  => Mobile
//   sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
//   md: "48em", // ~768px
//   lg: "62em", // ~992px
//   xl: "80em", // ~1280px
//   "2xl": "96em", // ~1536px
// };

const BoxContent: _chakra_ui_system.ChakraComponent<'div', {}> = (
  props: HTMLChakraProps<'div'>,
) => {
  return (
    <Box
      {...props}
      display={'flex'}
      flexDir={'column'}
      w={'100%'}
      maxW={'1600px'}
      h="auto"
      px={{
        base: '20px', //  0px <= x < 1536px
        '2xl': '10px', // 1536px <= x < 1600px
        max: '0px', // 1600px= < x
      }}
    >
      {props.children}
    </Box>
  );
};

export default BoxContent;
