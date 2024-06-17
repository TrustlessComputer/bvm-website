'use client';

import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useL2Service from '@/hooks/useL2Service';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  setShowAllChains,
  setShowOnlyMyOrder,
  setViewMode,
} from '@/stores/states/l2services/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { Flex, Button, Image, Checkbox, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HeaderView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { onConnect } = useL2Service();

  const { viewMode, showOnlyMyOrder, showAllChain, isL2ServiceLogged } =
    useAppSelector(getL2ServicesStateSelector);
  const { loggedIn, setShowLoginModalCustomize } = useWeb3Auth();

  const isMainnnet = viewMode === 'Mainnet';

  useEffect(() => {
    dispatch(setShowOnlyMyOrder(isL2ServiceLogged));
  }, [isL2ServiceLogged]);

  useEffect(() => {
    if (!isL2ServiceLogged) {
      dispatch(setShowOnlyMyOrder(false));
    }
  }, []);

  return (
    <Flex flexDir={'row'} alignItems={'center'} justify={'space-between'}>
      <Flex flexDir={'row'} align={'center'} gap={'15px'}>
        <Button
          minH={'40px'}
          minW={'100px'}
          borderRadius={'100px'}
          fontWeight={400}
          fontSize={'16px'}
          borderWidth={isMainnnet ? '1px' : '0px'}
          borderColor={isMainnnet ? '#000' : 'transparent'}
          bgColor={'#fff'}
          opacity={isMainnnet ? 1 : 0.5}
          color={'#000'}
          _hover={{
            opacity: 0.8,
          }}
          onClick={() => {
            dispatch(setViewMode('Mainnet'));
          }}
        >
          {'Mainnet'}
        </Button>

        <Button
          minH={'40px'}
          minW={'100px'}
          borderRadius={'100px'}
          fontWeight={400}
          fontSize={'16px'}
          color={'#000'}
          borderWidth={!isMainnnet ? '1px' : '0px'}
          borderColor={!isMainnnet ? '#000' : '#fff'}
          bgColor={'#fff'}
          opacity={!isMainnnet ? 1 : 0.5}
          _hover={{
            opacity: 0.8,
          }}
          onClick={() => {
            dispatch(setViewMode('Testnet'));
          }}
        >
          {'Testnet'}
        </Button>

        {!loggedIn ? (
          // <Button
          //   px={'30px'}
          //   borderRadius={'14px'}
          //   minH={'40px'}
          //   bgColor={'#17066C'}
          //   color={'#fff'}
          //   _hover={{
          //     opacity: 0.8,
          //   }}
          //   fontSize={'15px'}
          //   onClick={() => onLogin()}
          // >
          //   {'Connect'}
          // </Button>
          <></>
        ) : (
          <Flex py={'10px'} px={'14px'} bgColor={'#fff'} borderRadius={'100px'}>
            {/* <Checkbox
              color={'black'}
              fontWeight={400}
              fontSize={'16px'}
              checked={showOnlyMyOrder}
              defaultChecked
              borderColor={'#828282'}
              onChange={() => {
                dispatch(setShowOnlyMyOrder(!showOnlyMyOrder));
              }}
            >
              {'Show only my Bitcoin L2s'}
            </Checkbox> */}
            <Checkbox
              color={'black'}
              fontWeight={400}
              fontSize={'16px'}
              checked={showAllChain}
              defaultChecked={showAllChain}
              borderColor={'#828282'}
              onChange={() => {
                dispatch(setShowAllChains(!showAllChain));
              }}
            >
              {'Show All Chains'}
            </Checkbox>
          </Flex>
        )}
      </Flex>

      <Flex
        align={'flex-end'}
        fontSize={'16px'}
        fontWeight={500}
        color={'#000'}
      >
        {loggedIn ? (
          <Button
            bgColor={'#FA4E0E'}
            color={'#fff'}
            borderRadius={'8px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'28px'}
            py={'16px'}
            minW={['180px']}
            height={'48px'}
            margin={'0 auto'}
            fontWeight={500}
            fontSize={'16px'}
            _hover={{
              bgColor: '#e5601b',
            }}
            onClick={() => {
              // router.push('/blockchains/customize');
              router.push('/pricing');
            }}
          >
            Build your ZK-powered Blockchain
          </Button>
        ) : (
          <Text>
            {`Check Your ZK-powered Blockchain Setup and Status - `}
            <Text
              as="span"
              color={'#4E4A8D'}
              textDecorationLine={'underline'}
              textUnderlineOffset={2}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
              onClick={() => {
                // onConnect();
                setShowLoginModalCustomize && setShowLoginModalCustomize(true);
              }}
            >
              {`Sign in`}
            </Text>
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default HeaderView;
