import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useBuy } from '../../providers/Buy.hook';
import s from './styles.module.scss';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { useSearchParams } from 'next/navigation';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';
import { fetchAvailableList } from '@/stores/states/l2services/actions';

const FooterRightView = () => {
  const {
    isMainnet,
    estimateTotalCostFetching,
    estimateTotalCostData,
    estimateTotalCostData_V2,
    submitHandler,
    confirmBtnTitle,
    rollupProtocolSelected,
    isSubmiting,
  } = useBuy();

  const dispatch = useAppDispatch();
  const { availableListFetching, availableList } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Growth;

  const tierData = useMemo(() => {
    const packageData = availableList?.package['2'];
    const result = packageData?.filter((item, index) => {
      if (item.value === Number(packageParam)) {
        return true;
      }
      return false;
    });
    return result ? result[0] : undefined;
  }, [availableList, packageParam]);

  useEffect(() => {
    dispatch(fetchAvailableList());
  }, []);

  const renderOption1 = () => {
    return (
      <Flex
        flex={1}
        width={'50%'}
        height="auto"
        flexDir={'row'}
        align={'center'}
        gap={'20px'}
        justify={'flex-end'}
        className={s.container}
      >
        {/* <Text fontSize={'25px'} fontWeight={600} color={'#000'}>
          {isMainnet
            ? `Cost: $${estimateTotalCostData_V2?.TotalCostUSD || '--'} `
            : 'Cost: 1 BVM/day'}
        </Text> */}

        <Flex
          flexDir={'column'}
          align={'flex-end'}
          justify="flex-end"
          gap={'3px'}
        >
          <Text
            fontSize={'25px'}
            fontWeight={600}
            color={'#000'}
            textAlign={'center'}
            lineHeight={'25px'}
          >
            {/* {`${new BigNumber(estimateTotalCostData_V2?.TotalCostBVM || 0)
              .decimalPlaces(2)
              .toString()} BVM`} */}

            {`${tierData?.priceNote || '--'}`}
          </Text>
          <Text
            fontSize={'16px'}
            fontWeight={300}
            textAlign={'center'}
            lineHeight={'25px'}
            opacity={0.7}
            className={s.fontType2}
          >
            {/* {`$${estimateTotalCostData_V2?.TotalCostUSD || '--'}`} */}
            {`${tierData?.price || '--'}`}
          </Text>
        </Flex>

        <Button
          px={'30px'}
          borderRadius={'14px'}
          minH={'50px'}
          minW={'160px'}
          bgColor={'#17066C'}
          color={'#fff'}
          _hover={{
            opacity: 0.8,
          }}
          fontSize={'18px'}
          leftIcon={
            <Image
              src={'/blockchains/customize/ic-rocket.svg'}
              w={'25px'}
              h={'auto'}
              style={{ filter: 'invert(100%)' }}
              objectFit={'contain'}
            />
          }
          disabled={!!estimateTotalCostFetching}
          isLoading={isSubmiting}
          onClick={() => submitHandler()}
        >
          {isMainnet ? 'Launch' : confirmBtnTitle}
        </Button>
      </Flex>
    );
  };

  const renderOption2 = () => {
    return (
      <Flex
        flex={1}
        width={'50%'}
        height="auto"
        flexDir={'column'}
        gap={'20px'}
      >
        <Flex flexDir={'row'} align={'center'} gap={'10px'}>
          <Image
            src={'/blockchains/customize/ic-computer.svg'}
            w={'35px'}
            h={'auto'}
            objectFit={'contain'}
          />
          <Text fontSize={'20px'} fontWeight={600} color={'#000'}>
            Service costs
          </Text>
        </Flex>

        <Flex flexDir={'column'} gap={'10px'} color="#000">
          <Flex gap={'5px'}>
            <Text fontSize={'18px'} fontWeight={500}>
              • Setup cost:
            </Text>
            <Text fontSize={'18px'} fontWeight={400} color={'#1c1c1c'}>
              {estimateTotalCostData?.SetupCode || '0'}
            </Text>
          </Flex>

          <Flex gap={'5px'} alignItems={'flex-end'}>
            <Text fontSize={'18px'} fontWeight={500}>
              • Operation cost:
            </Text>
            <Text fontSize={'18px'} fontWeight={400} color={'#1c1c1c'}>
              {estimateTotalCostData?.OperationCost || '0'}
            </Text>
          </Flex>

          <Flex gap={'5px'}>
            <Text fontSize={'18px'} fontWeight={500}>
              • Rollup cost:
            </Text>
            <Text fontSize={'18px'} fontWeight={400} color={'#1c1c1c'}>
              {estimateTotalCostData?.RollupCost || '0'}
            </Text>
          </Flex>

          <Flex align={'center'} gap={'30px'}>
            <Text fontSize={'25px'} fontWeight={600}>
              {`Total: ${estimateTotalCostData?.TotalCost} BVM`}
            </Text>
            <Button
              px={'30px'}
              borderRadius={'14px'}
              minH={'50px'}
              minW={'160px'}
              bgColor={'#17066C'}
              color={'#fff'}
              _hover={{
                opacity: 0.8,
              }}
              fontSize={'18px'}
              leftIcon={
                <Image
                  src={'/blockchains/customize/ic-rocket.svg'}
                  w={'25px'}
                  h={'auto'}
                  style={{ filter: 'invert(100%)' }}
                  objectFit={'contain'}
                />
              }
              disabled={!!estimateTotalCostFetching}
              isLoading={isSubmiting}
              onClick={() => submitHandler()}
            >
              {confirmBtnTitle}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  // if !isMainnet ? renderOption1() :  renderOption2()

  return renderOption1();
};

export default FooterRightView;
