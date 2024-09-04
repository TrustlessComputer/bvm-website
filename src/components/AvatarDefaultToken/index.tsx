'use client';

import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const AvatarDefaultToken = ({
  name,
  fontSize,
  width,
}: {
  name: string;
  fontSize?: number;
  width?: number;
}) => {
  return (
    <Box
      style={{
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: width ? `${width}px` : '32px',
        aspectRatio: 1,
        borderRadius: '50%',
      }}
    >
      <Text
        style={{
          fontWeight: '700',
          fontSize: `${fontSize ? fontSize : 16}px`,
          color: '#fff',
        }}
      >
        {name.slice(0, 1).toUpperCase()}
      </Text>
    </Box>
  );
};

export default AvatarDefaultToken;
