import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import { ITxBTC } from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import CMempoolApi from '@/services/api/mempool';
import { IMempoolBlock } from '@/services/api/mempool/interface';
import { requestReload } from '@/stores/states/common/reducer';
import { Box, Flex, Text, Progress } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const BlockConfirm = ({
  txBTC,
  isFBTxAddress,
  setIndexBlock,
  setTimeAvg,
}: {
  txBTC: ITxBTC;
  isFBTxAddress: boolean;
  setIndexBlock: any;
  setTimeAvg: any;
}) => {
  const mempoolApi = useRef(new CMempoolApi()).current;
  const rollupDetailApi = useRef(new CRollupL2DetailAPI()).current;
  const [blocks, setBlocks] = useState<IMempoolBlock[]>([]);
  const refInterval = useRef<any>(null);
  const intervalDone = useRef<any>(true);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      if (!intervalDone.current) {
        return;
      }
      const [rs, rs1, rs2] = await Promise.all([
        mempoolApi.getBlocks(isFBTxAddress),
        mempoolApi.getTransactionStatus(txBTC.tx_id, isFBTxAddress),
        rollupDetailApi.getTimeAVG(),
      ]);
      if (rs1?.confirmed) {
        clearInterval(refInterval.current);
        dispatch(requestReload());
      }
      setTimeAvg(rs2);
      setBlocks(rs);
    } catch (error) {
    } finally {
      intervalDone.current = true;
    }
  };

  useEffect(() => {
    clearInterval(refInterval.current);
    getData();

    refInterval.current = setInterval(() => getData(), 5000);

    return () => {
      clearInterval(refInterval.current);
    };
  }, []);

  const currentValue = useMemo(() => {
    const currentFee = new BigNumber(txBTC.txfee)
      .multipliedBy(1e8)
      .dividedBy(txBTC.virtual_size)
      .toNumber();

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

  useEffect(() => {
    setIndexBlock(
      currentValue <= 0 ? 0 : Math.abs(blocks.length - currentValue),
    );
  }, [currentValue, blocks]);

  return (
    <Box width={'100%'}>
      <Flex mb={'10px'} alignItems={'center'} justifyContent={'space-between'}>
        <Text>Transaction processing</Text>

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
