import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setViewMode } from '@/stores/states/l2services/reducer';
import {
  getL2ServicesStateSelector,
  myOrderListWithNetworkSelector,
} from '@/stores/states/l2services/selector';
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

const NetworkBar = () => {
  const dispatch = useAppDispatch();
  const { viewMode, viewPage, isMyOrderListFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const { mainnetOrderList, testnetOrderList } = useAppSelector(
    myOrderListWithNetworkSelector,
  );
  const isMainnet = viewMode === 'Mainnet';

  console.log('VIVVVVV ', viewPage);
  if (viewPage === 'Biiling') return null;

  if (!isMyOrderListFetched)
    return (
      <Flex
        flexDir={'row'}
        align={'center'}
        justify={'center'}
        gap={'12px'}
        mb="15px"
      >
        <Skeleton w={'120px'} h={'45px'} borderRadius={'100px'}></Skeleton>
        <Skeleton w={'120px'} h={'45px'} borderRadius={'100px'}></Skeleton>
      </Flex>
    );

  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      justify={'center'}
      gap={'12px'}
      mb="15px"
      className={s.fontSFProDisplay}
    >
      <Flex
        px={['12px', '14px', '16px']}
        py={['8px', '10px', '12px']}
        gap={'8px'}
        flexDir={'row'}
        borderRadius={'100px'}
        borderWidth={isMainnet ? '1px' : '0px'}
        borderColor={isMainnet ? '#000' : 'transparent'}
        bgColor={'#fff'}
        minW={['80px', '100px', '120px']}
        _hover={{
          cursor: 'pointer',
          opacity: 0.8,
        }}
        onClick={() => {
          dispatch(setViewMode('Mainnet'));
        }}
      >
        <Text
          fontSize={['13px', '13px', '14px']}
          fontWeight={500}
          color={isMainnet ? '#000' : '#B3B3B3'}
          opacity={isMainnet ? 1 : 0.5}
        >
          Mainnet
        </Text>
        <Flex
          borderRadius={'100px'}
          px={['6px', '7px', '8px']}
          py="0px"
          gap={'10px'}
          bgColor={isMainnet ? '#000' : '#B3B3B3'}
        >
          <Text fontSize={'14px'} fontWeight={500} lineHeight={'20px'}>
            {`${mainnetOrderList.length || 0}`}
          </Text>
        </Flex>
      </Flex>

      <Flex
        px={['12px', '14px', '16px']}
        py={['8px', '10px', '12px']}
        gap={'8px'}
        borderRadius={'100px'}
        borderWidth={!isMainnet ? '1px' : '0px'}
        borderColor={!isMainnet ? '#000' : 'transparent'}
        bgColor={'#fff'}
        minW={['80px', '100px', '120px']}
        _hover={{
          cursor: 'pointer',
          opacity: 0.8,
        }}
        onClick={() => {
          dispatch(setViewMode('Testnet'));
        }}
      >
        <Text
          fontSize={['13px', '13px', '14px']}
          fontWeight={500}
          opacity={!isMainnet ? 1 : 0.5}
          color={'#000'}
        >
          Testnet
        </Text>
        <Flex
          borderRadius={'100px'}
          px={['6px', '7px', '8px']}
          py="0px"
          gap={'10px'}
          bgColor={!isMainnet ? '#000' : '#B3B3B3'}
        >
          <Text fontSize={'14px'} fontWeight={500} lineHeight={'20px'}>
            {`${testnetOrderList.length || 0}`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NetworkBar;
