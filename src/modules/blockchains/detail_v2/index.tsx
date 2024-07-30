'use client';

import { orderDetailByID } from '@/services/api/l2services';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ChainDetail from './components/ChainDetail';
import NavigationBar from './components/NavigatioBar';
import s from './styles.module.scss';

const ChainDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  console.log('ORDER ID: ', id);

  const [chainDetail, setChainDetail] = useState<OrderItem | undefined>(
    undefined,
  );
  const [isFetching, setFetching] = useState(true);

  const getOrderDetailByIDHandler = async (id: string) => {
    setFetching(true);
    const data = await orderDetailByID(id);
    setChainDetail(data);
    setFetching(false);
  };

  useEffect(() => {
    getOrderDetailByIDHandler(id as string);
  }, []);

  const isDataInvalid = useMemo(() => {
    if (!id || id.length < 1 || !chainDetail) return true;
    return false;
  }, [id, chainDetail]);

  return (
    <Flex flexDir={'column'} className={s.container}>
      <Flex
        flexDir={'column'}
        align={'center'}
        w="100%"
        minH={'110dvh'}
        overflow={'visible'}
        pos={'relative'}
        maxW={'1480px'}
        py={['10px', '30px', '60px']}
        px={'10px'}
        bgColor={'#fff'}
        gap={'20px'}
      >
        <NavigationBar />
        {isFetching ? (
          <Spinner colorScheme="#000"></Spinner>
        ) : isDataInvalid || !chainDetail ? (
          <Text fontSize={'20px'} color={'#000'} mt="200px">
            {`Chain Not Found`}
          </Text>
        ) : (
          <ChainDetail orderItem={chainDetail} />
        )}
      </Flex>
    </Flex>
  );
};

export default ChainDetailPage;
