import { shortCryptoAddress } from '@/utils/address';
import { Flex, Box, Text } from '@chakra-ui/react';
import React from 'react';
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import s from './styles.module.scss';
import cs from 'classnames';
import { isMobile } from 'react-device-detect';

const AddressCopy = ({
  address,
  onClick,
}: {
  address: string;
  onClick?: any;
}) => {
  if (!address) {
    return <></>;
  }
  return (
    <Flex gap={'6px'} alignItems={'center'}>
      <Text
        onClick={() => onClick?.()}
        className={cs(s.address, onClick && s.isUrl)}
        title={address}
      >
        {shortCryptoAddress(address, isMobile ? 8 : 34)}
      </Text>
      <Box
        onClick={() => {
          copy(address);
          toast.success('Copied successfully!');
        }}
        cursor={'pointer'}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="336"
            height="336"
            x="128"
            y="128"
            fill="none"
            stroke-linejoin="round"
            stroke-width="32"
            rx="57"
            ry="57"
          ></rect>
          <path
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
          ></path>
        </svg>
      </Box>
    </Flex>
  );
};

export default AddressCopy;
