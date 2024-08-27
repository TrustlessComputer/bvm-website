import { ITxBTCPutDetail } from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import { formatCurrency } from '@/utils/format';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import s from './styles.module.scss';

const ItemTransfer = ({
  data,
  symbol,
}: {
  data: ITxBTCPutDetail;
  symbol: string;
}) => {
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Flex gap={'6px'} alignItems={'center'}>
        <Text className={s.address}>{data.output_hash}</Text>
        {data.output_hash && (
          <Box
            onClick={() => {
              copy(data.output_hash);
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
        )}
      </Flex>
      <Text className={s.price}>
        {formatCurrency(data.amount, 0, 6)} <Text as="span">{symbol}</Text>
      </Text>
    </Flex>
  );
};

export default ItemTransfer;
