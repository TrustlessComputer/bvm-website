import s from './styles.module.scss';
import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { IRollupNFTDetail } from '@/services/api/dapp/rollupl2-detail/interface';

const NFTItem = ({item}: {item: IRollupNFTDetail}) => {
  return (
    <Flex direction={'column'} className={s.container}>
      <Image borderTopRadius={'12px'} w={'100%'} aspectRatio={1} src={item.token_uri}/>
      <Flex direction={'column'} p={'8px'}>
        <Text>#{item.token_id}</Text>
        {/*<Text color={'#898989'}>{item.value}</Text>*/}
      </Flex>
    </Flex>
  );
};

export default NFTItem;
