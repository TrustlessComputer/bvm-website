import { Box, Flex, Image, SimpleGrid, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import s from './styles.module.scss';
import SvgInset from '@components/SvgInset';
import { useContext, useEffect, useMemo, useState } from 'react';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '@utils/format';
import BigNumberJS from 'bignumber.js';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import { IConfirmedBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import dayjs from 'dayjs';
import { shortCryptoAddress } from '@utils/address';
import { compareString } from '@utils/string';
import { MemPoolContext } from '@/modules/l2-rollup-detail/MemPool/provider/mempool-context';

const BlockDetail = () => {
  const { selectedBlock, setSelectedBlock } = useContext(MemPoolContext);
  const coinPrices = useSelector(commonSelector).coinPrices;
  const btcPrice = useMemo(() => coinPrices?.['BTC'] || '0', [coinPrices]);
  const [poolImgUrl, setPoolImgUrl] = useState('');

  const onSelectBlock = () => {
    setSelectedBlock(undefined);
  }

  const isPending = useMemo(() => {
    return !selectedBlock?.height;
  }, [selectedBlock]);

  const medianFeeUsd = useMemo(() => {
    return new BigNumberJS(btcPrice || 0)
      .multipliedBy(selectedBlock?.medianFee || 0)
      .multipliedBy(140)
      .dividedBy(1e8)
      .toFixed(2);
  }, [selectedBlock?.medianFee, btcPrice]);

  const totalFeeUsd = useMemo(() => {
    return new BigNumberJS(btcPrice || 0)
      .multipliedBy(selectedBlock?.totalFees || 0)
      .dividedBy(1e8)
      .toString();
  }, [selectedBlock?.totalFees, btcPrice]);

  const rewardUsd = useMemo(() => {
    if((selectedBlock?.data as IConfirmedBlock)?.extras) {
      return new BigNumberJS(btcPrice || 0)
        .multipliedBy((selectedBlock?.data as IConfirmedBlock).extras?.reward)
        .dividedBy(1e8)
        .toString();
    }

    return '0';
  }, [(selectedBlock?.data as IConfirmedBlock)?.extras, btcPrice]);

  const blockTitle = useMemo(() => {
    if(isPending) {
      if (compareString(selectedBlock?.id, '0')) {
        return 'Next Block';
      } else if (compareString(selectedBlock?.id, '7')) {
        return `Stack of 125 mempool blocks`;
      } else {
        return `Mempool block ${Number(selectedBlock?.id as string) + 1}`;
      }
    } else {
      return 'Block';
    }
  }, [selectedBlock, isPending]);

  useEffect(() => {
    if((selectedBlock?.data as IConfirmedBlock)?.extras) {
      setPoolImgUrl(`https://mempool.space/resources/mining-pools/${(selectedBlock?.data as IConfirmedBlock).extras.pool.slug}.svg`);
    }
  }, [selectedBlock]);

  const onLoadPoolImgError = () => {
    setPoolImgUrl(`https://mempool.space/resources/mining-pools/default.svg`);
  }

  const renderPendingInfo = () => {
    return (
      <Table className={s.table}>
        <Tbody>
          <Tr>
            <Td>Median fee</Td>
            <Td>~{formatCurrency(selectedBlock?.medianFee, 0, 0)} <span className={s.unit}>sat/vB</span> <span className={s.price}>${formatCurrency(medianFeeUsd, 0, 2)}</span></Td>
          </Tr>
          <Tr>
            <Td>Fee span</Td>
            <Td><span className={s.feeSpan}>{formatCurrency(selectedBlock?.feeRange[0], 0, 0)} - {formatCurrency(selectedBlock?.feeRange[selectedBlock?.feeRange.length - 1], 0, 0)}</span> <span className={s.unit}>sat/vB</span></Td>
          </Tr>
          <Tr>
            <Td>Total fees</Td>
            <Td>{formatCurrency(new BigNumberJS(selectedBlock?.totalFees as number).dividedBy(1e8).toFixed(3), 0, 2, 'BTC', true)} <span className={s.unit}>BTC</span> <span className={s.price}>${formatCurrency(totalFeeUsd, 0, 0)}</span></Td>
          </Tr>
          <Tr>
            <Td>Transactions</Td>
            <Td>{formatCurrency(selectedBlock?.transactions, 0, 0)}</Td>
          </Tr>
          <Tr>
            <Td>Size</Td>
            <Td><Box className={s.sizeProgress}>{new BigNumberJS(selectedBlock?.blockSize as number).dividedBy(1e6).toFixed(2)} MB</Box></Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  const handleOpenBlock = () => {
    window.open(`https://mempool.space/block/${(selectedBlock?.data as IConfirmedBlock).id}`, '_blank');
  }

  const renderBaseReleaseInfo = () => {
    return (
      <Table className={s.table}>
        <Tbody>
          <Tr>
            <Td>Hash</Td>
            <Td>
              <Flex gap={"8px"} cursor={"pointer"} alignItems={"center"}>
                <span className={s.link} onClick={handleOpenBlock}>{shortCryptoAddress((selectedBlock?.data as IConfirmedBlock).id)}</span>
                <Box
                  onClick={() => {
                    toast.success('Copied!');
                    copy((selectedBlock?.data as IConfirmedBlock).id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" viewBox="0 0 1000 1000" className="ng-star-inserted"><path fill="#FFFFFF" d="M128 768h256v64H128v-64z m320-384H128v64h320v-64z m128 192V448L384 640l192 192V704h320V576H576z m-288-64H128v64h160v-64zM128 704h160v-64H128v64z m576 64h64v128c-1 18-7 33-19 45s-27 18-45 19H64c-35 0-64-29-64-64V192c0-35 29-64 64-64h192C256 57 313 0 384 0s128 57 128 128h192c35 0 64 29 64 64v320h-64V320H64v576h640V768zM128 256h512c0-35-29-64-64-64h-64c-35 0-64-29-64-64s-29-64-64-64-64 29-64 64-29 64-64 64h-64c-35 0-64 29-64 64z"></path></svg>
                </Box>
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>Timestamp</Td>
            <Td>{dayjs.unix(selectedBlock?.timestamp as number).format('YYYY-MM-DD HH:mm:ss')} <span className={s.unit}>({dayjs.unix(selectedBlock?.timestamp as number).fromNow()})</span></Td>
          </Tr>
          <Tr>
            <Td>Size</Td>
            <Td>{new BigNumberJS((selectedBlock?.data as IConfirmedBlock).size).dividedBy(1e6).toFixed(2)} <span className={s.unit}>MB</span></Td>
          </Tr>
          <Tr>
            <Td>Weight</Td>
            <Td>{new BigNumberJS((selectedBlock?.data as IConfirmedBlock).weight).dividedBy(1e6).toFixed(2)} <span className={s.unit}>MWU</span></Td>
          </Tr>
          <Tr>
            <Td>Health</Td>
            <Td><Text className={s.health}>{(selectedBlock?.data as IConfirmedBlock).extras.matchRate}%</Text></Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  const renderReleaseInfo = () => {
    return (
      <Table className={s.table}>
        <Tbody>
          <Tr>
            <Td>Fee span</Td>
            <Td><span>{formatCurrency(selectedBlock?.feeRange[0], 0, 0)} - {formatCurrency(selectedBlock?.feeRange[selectedBlock?.feeRange.length - 1], 0, 0)}</span> <span className={s.unit}>sat/vB</span></Td>
          </Tr>
          <Tr>
            <Td>Median fee</Td>
            <Td>~{formatCurrency(selectedBlock?.medianFee, 0, 0)} <span className={s.unit}>sat/vB</span> <span className={s.price}>${formatCurrency(medianFeeUsd, 0, 2)}</span></Td>
          </Tr>
          <Tr>
            <Td>Total fees</Td>
            <Td>{formatCurrency(new BigNumberJS(selectedBlock?.totalFees as number).dividedBy(1e8).toFixed(3), 0, 2, 'BTC', true)} <span className={s.unit}>BTC</span> <span className={s.price}>${formatCurrency(totalFeeUsd, 0, 0, 'BTC', true)}</span></Td>
          </Tr>
          <Tr>
            <Td>Subsidy + fees</Td>
            <Td>{formatCurrency(new BigNumberJS((selectedBlock?.data as IConfirmedBlock).extras.reward as number).dividedBy(1e8).toFixed(3), 0, 3, 'BTC', true)} <span className={s.unit}>BTC</span> <span className={s.price}>${formatCurrency(rewardUsd, 0, 0, 'BTC', true)}</span></Td>
          </Tr>
          <Tr>
            <Td>Miner</Td>
            <Td>
              <Flex gap={"4px"}>
                <Image
                  src={poolImgUrl}
                  onError={onLoadPoolImgError}
                  className={s.poolImg}
                />
                {(selectedBlock?.data as IConfirmedBlock).extras.pool.name}
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  return (
    <Flex className={s.container} direction={"column"} gap={"16px"} pt={"8px"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={"8px"}>
          <Text className={s.title}>{blockTitle}</Text>
          {!isPending && <Text className={s.blockNumber}>{selectedBlock?.height}</Text>}
        </Flex>
        <Box onClick={onSelectBlock} className={s.btnClose}>
          <SvgInset size={36} svgUrl={`/icons/icon-close.svg`} />
        </Box>
      </Flex>
      <Box className={s.content}>
        {isPending ? (
          <SimpleGrid columns={1}>
            {renderPendingInfo()}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={2} gap={"20px"}>
            {renderBaseReleaseInfo()}
            {renderReleaseInfo()}
          </SimpleGrid>
        )}
      </Box>
    </Flex>
  )
};

export default BlockDetail;
