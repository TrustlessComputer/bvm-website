import { Box, Flex, SimpleGrid, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import s from './styles.module.scss';
import SvgInset from '@components/SvgInset';
import { useContext, useMemo } from 'react';
import { L2RollupDetailContext } from '@/modules/l2-rollup-detail/providers/l2-rollup-detail-context';
import { compareString } from '@utils/string';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';

const BlockDetail = () => {
  const { selectedBlock, setSelectedBlock } = useContext(L2RollupDetailContext);

  const onSelectBlock = () => {
    setSelectedBlock(undefined);
  }

  const isPending = useMemo(() => {
    return compareString(selectedBlock?.release_tx_hash, 'pending');
  }, [selectedBlock]);

  const renderPendingInfo = () => {
    return (
      <Table className={s.table}>
        <Tbody>
          <Tr>
            <Td>Fee span</Td>
            <Td>2 - 469 <span className={s.unit}>sat/vB</span></Td>
          </Tr>
          <Tr>
            <Td>Median fee</Td>
            <Td>~3 <span className={s.unit}>sat/vB$0.25</span></Td>
          </Tr>
          <Tr>
            <Td>Total fees</Td>
            <Td>0.074 <span className={s.unit}>BTC</span> <span className={s.price}>$4,411</span></Td>
          </Tr>
          <Tr>
            <Td>Transactions</Td>
            <Td>5388</Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  const handleOpenBlock = () => {
    window.open('https://mempool.space/block/00000000000000000000a65947afccfcf96289245677f5e980445d7bb3da81e7', '_blank');
  }

  const renderBaseReleaseInfo = () => {
    return (
      <Table className={s.table}>
        <Tbody>
          <Tr>
            <Td>Hash</Td>
            <Td>
              <Flex gap={"4px"} cursor={"pointer"}>
                <span className={s.link} onClick={handleOpenBlock}>000000...f86d421</span>
                <SvgInset
                  size={20}
                  svgUrl="/icons/ic-copy.svg"
                  onClick={() => {
                    toast.success('Copied!');
                    copy('0000000000000000000231f977a9d1325f256d8a4c4552c06d5125295237764d');
                  }}
                />
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>Timestamp</Td>
            <Td>2024-08-29 15:42:43 <span className={s.unit}>(2 minutes ago)</span></Td>
          </Tr>
          <Tr>
            <Td>Size</Td>
            <Td>1.53 <span className={s.unit}>MB</span></Td>
          </Tr>
          <Tr>
            <Td>Weight</Td>
            <Td>3.99 <span className={s.unit}>MWU</span></Td>
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
            <Td>2 - 469 <span className={s.unit}>sat/vB</span></Td>
          </Tr>
          <Tr>
            <Td>Median fee</Td>
            <Td>~3 <span className={s.unit}>sat/vB$0.25</span></Td>
          </Tr>
          <Tr>
            <Td>Total fees</Td>
            <Td>0.074 <span className={s.unit}>BTC</span> <span className={s.price}>$4,411</span></Td>
          </Tr>
          <Tr>
            <Td>Subsidy + fees</Td>
            <Td>3.151 <span className={s.unit}>BTC</span> <span className={s.price}>$187,767</span></Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  return (
    <Flex className={s.container} direction={"column"} gap={"16px"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={"8px"}>
          <Text className={s.title}>{isPending ? 'Next Block' : 'Block'}</Text>
          {!isPending && <Text className={s.blockNumber}>123456</Text>}
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