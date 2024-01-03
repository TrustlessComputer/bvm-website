'use client';

import { Box, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

const DevelopersModule = () => {
  return (
    <Box className={s.container}>
      <Text
        fontSize={['12px', '20px']}
        color={'#000'}
        lineHeight={'100%'}
        fontWeight={500}
      >
        {'Developers page. Coming soon!'}
      </Text>
    </Box>
  );
};

export default DevelopersModule;
