import s from './styles.module.scss';
import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { INFT, IRollupNFT, IRollupNFTDetail } from '@/services/api/dapp/rollupl2-detail/interface';
import { L2RollupDetailContext } from '@/modules/l2-rollup-detail/providers/l2-rollup-detail-context';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';

const NFTItem = ({item}: {item: INFT}) => {
  const { address } = useContext(L2RollupDetailContext);

  const rollupApi = new CRollupL2DetailAPI();

  const [rollupNFTs, setRollupNFTs] = useState<IRollupNFTDetail[]>(
    [],
  );

  const refParams = useRef({
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    fetchData();
  }, [address]);

  const fetchData = async () => {
    try {
      const res = (await rollupApi.getRollupL2NFTsList({
        rollup_id: item.chain?.id,
        user_address: address,
        token_address: item.token_contract_address,
        ...refParams.current,
      })) as any;

      setRollupNFTs(res);
    } catch (e) {

    } finally {

    }
  }

  return (
    <Flex direction={'column'} className={s.container}>
      <Image borderTopRadius={'12px'} w={'100%'} aspectRatio={1} src={rollupNFTs?.[0].token_uri}/>
      <Flex direction={'column'} p={'8px'}>
        <Text>{item.token_name}</Text>
        <Text color={'#898989'}>{item.value}</Text>
      </Flex>
    </Flex>
  );
};

export default NFTItem;
