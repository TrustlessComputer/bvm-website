import { ITxBTC } from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import CMempoolApi from '@/services/api/mempool';
import { IMempoolBlock } from '@/services/api/mempool/interface';
import { Box, Flex, Text, Progress } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const BlockConfirm = ({ txBTC }: { txBTC: ITxBTC }) => {
  const mempoolApi = useRef(new CMempoolApi()).current;
  const [blocks, setBlocks] = useState<IMempoolBlock[]>([]);

  const getData = async () => {
    try {
      const [rs] = await Promise.all([mempoolApi.getBlocks()]);
      setBlocks(rs);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const currentValue = useMemo(() => {
    const currentFee = new BigNumber(txBTC.txfee)
      .multipliedBy(1e8)
      .dividedBy(txBTC.virtual_size)
      .toNumber();

    console.log('currentFee', currentFee);

    return (
      (blocks
        .reverse()
        .findIndex(
          (v) =>
            currentFee >= v.feeRange[0] &&
            currentFee <= v.feeRange[v.feeRange.length - 1],
        ) || -1) + 1
    );
  }, [blocks, txBTC]);

  return (
    <Box width={'100%'}>
      <Flex mb={'10px'} alignItems={'center'} justifyContent={'space-between'}>
        <Text>Transaction process</Text>

        <Text>
          {currentValue} / {blocks.length}
        </Text>
      </Flex>
      {blocks.length > 0 && (
        <Progress
          value={(currentValue / blocks.length) * 100}
          isAnimated={true}
          min={0}
          max={100}
          colorScheme="green"
          backgroundColor={'#f5f5f5'}
        />
      )}
    </Box>
  );
};

export default BlockConfirm;
