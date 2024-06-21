import {
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import {
  estimateTotalCostAPI_V2,
  orderBuyAPI,
} from '@/services/api/l2services';
import BlockchainSection from './components/BlockchainSection';
import HardwareSection from './components/HardwareSection';
import MainCell from './components/MainCell';
import PreInstallDappSection from './components/PreInstallDappSection';
import SupportSection from './components/SupportSection';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { useRouter } from 'next/navigation';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useL2Service from '@/hooks/useL2Service';
import { useEffect, useMemo, useState } from 'react';
import { IOrderBuyEstimateRespone_V2 } from '@/services/api/l2services/types';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { fetchAvailableList } from '@/stores/states/l2services/actions';
import {
  setShowAllChains,
  setViewMode,
  setViewPage,
} from '@/stores/states/l2services/reducer';
import {
  ORDER_BUY_NO_PROVER,
  ORDER_BUY_YES_PROVER,
  PRICING_PACKGE,
} from '../PricingV2/constants';
import { orderRegisterBootstrapParams } from '../PricingV2/services';
import sleep from '@/utils/sleep';
import { getErrorMessage } from '@/utils/errorV2';
import toast from 'react-hot-toast';
import ModalLoading from '@/components/ModalLoading';
import BigNumber from 'bignumber.js';

const PriceModule = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  const { loggedIn, setShowLoginModalCustomize, userInfo } = useWeb3Auth();
  const { fetchAllData } = useL2Service();
  const [dataNoProver, setDataNoProver] = useState<
    IOrderBuyEstimateRespone_V2 | undefined
  >(undefined);
  const [dataProver, setDataProver] = useState<
    IOrderBuyEstimateRespone_V2 | undefined
  >(undefined);

  const {
    isOpen: isOpenLoadingModal,
    onOpen: onOpenLoadingModal,
    onToggle: onToggleLoadingModal,
    onClose: onCloseLoadingModal,
  } = useDisclosure({
    id: 'LOADING_MODAL',
  });

  const { availableListFetching, availableList } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const isFetchingData = useMemo(() => {
    return availableListFetching || !availableList;
  }, [availableListFetching, availableList]);

  useEffect(() => {
    dispatch(fetchAvailableList());
  }, []);

  const fetchData = async () => {
    try {
      const [dataNoProver, dataProver] = await Promise.all([
        estimateTotalCostAPI_V2(ORDER_BUY_NO_PROVER),
        estimateTotalCostAPI_V2(ORDER_BUY_YES_PROVER),
      ]);

      // console.log('--- DATA API --', {
      //   dataNoProver,
      //   dataProver,
      // });
      setDataNoProver(dataNoProver);
      setDataProver(dataProver);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // const result = await estimateTotalCostAPI_V2(orderBuyReq);
    fetchData();
  }, []);

  const bootstrapLaunchOnClick = async () => {
    if (!loggedIn) {
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } else {
      try {
        onOpenLoadingModal();

        const orderBuyReq = await orderRegisterBootstrapParams();
        const result = await orderBuyAPI(orderBuyReq);

        await sleep(1);

        if (result) {
          // Show Toast Success
          // toast.success('Your order has been submitted successfully.', {
          //   duration: 1000,
          // });

          await sleep(1);

          dispatch(setViewMode('Mainnet'));
          dispatch(setViewPage('ManageChains'));
          dispatch(setShowAllChains(false));

          router.push('/blockchains');
        }
      } catch (error) {
        // const { message } = getErrorMessage(error);
        // toast.error(message);
        dispatch(setViewMode('Mainnet'));
        dispatch(setViewPage('ManageChains'));
        dispatch(setShowAllChains(false));

        router.push('/blockchains?hasOrderFailed=true');
      } finally {
        onCloseLoadingModal();
      }
    }
  };

  const growthLaunchOnClick = () => {
    if (!loggedIn) {
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } else {
      router.push(`/blockchains/customize?package=${PRICING_PACKGE.Growth}`);
    }
  };

  const bussinessLaunchOnClick = () => {
    if (!loggedIn) {
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } else {
      router.push(`/blockchains/customize?package=${PRICING_PACKGE.Secure}`);
    }
  };

  const enterpriseLaunchOnClick = () => {
    showContactUsModal();
  };

  const manageYourChainsOnClick = () => {
    if (!loggedIn) {
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } else {
      dispatch(setViewMode('Mainnet'));
      dispatch(setViewPage('ManageChains'));
      dispatch(setShowAllChains(false));
      router.push('/blockchains');
    }
  };

  if (isFetchingData) {
    return (
      <Flex
        w={'100%'}
        minH={'100dvh'}
        justify={'center'}
        align={'center'}
        bgColor={'#f3f1e8'}
      >
        <Spinner color="black" mb={'150px'}></Spinner>
      </Flex>
    );
  }
  return (
    <Flex bgColor={'#f3f1e8'} flex={1} className={s.container}>
      <Flex
        maxW={'1800px'}
        minW={'100dvw'}
        p="0px"
        bgColor={'#f3f1e8'}
        flexDir={'column'}
        align={'center'}
      >
        <Flex flexDir={'column'} gap={'15px'}>
          <Text
            textAlign={'center'}
            fontSize={'40px'}
            lineHeight={'52px'}
            fontWeight={400}
          >
            {`Choose the ZK Rollup solutions you need.`}
          </Text>
          <Text
            textAlign={'center'}
            fontSize={'20px'}
            lineHeight={'28px'}
            fontWeight={400}
            opacity={0.7}
            className={s.fontType2}
          >
            {`It's a great time to build on Bitcoin.`}
          </Text>
        </Flex>

        <Flex p="50px" overflow={'visible'} mt={'30px'}>
          <TableContainer
            bgColor={'#fff'}
            minH={'800px'}
            color={'#000'}
            borderWidth={'1px'}
            borderRadius={'12px'}
            overflowX={'visible'}
            overflowY={'visible'}
            textTransform={'none'}
            shadow="0px 0px 12px 0px #00000026"
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                width: '4px',
                backgroundColor: '#5e5e5e',
                borderRadius: '4px',
              },
            }}
          >
            <Table variant="unstyled">
              <Thead>
                <Tr bgColor={'#fff'} borderRadius={'15px'}>
                  <Th
                    h="100px"
                    borderRadius={'15px'}
                    borderRightWidth={'1px'}
                    borderRightColor={'#E7E7E7'}
                  ></Th>
                  <Th
                    w={'22%'}
                    maxW={'22%'}
                    borderRightWidth={'1px'}
                    borderRightColor={'#E7E7E7'}
                  >
                    <MainCell
                      type="Hacker"
                      description="The easiest way to launch your own ZK Rollup on Bitcoin"
                      priceUSD={`${
                        (availableList &&
                          availableList['package']?.['2']?.[0]?.price) ||
                        '--'
                      }`}
                      priceBVM={`${
                        (availableList &&
                          availableList['package']?.['2']?.[0]?.priceNote) ||
                        '--'
                      }`}
                      ctaButtonElement={
                        <button
                          className={s.ctaBtn}
                          onClick={bootstrapLaunchOnClick}
                        >
                          {'Launch now with 1-Click'}
                        </button>
                      }
                    />
                  </Th>
                  <Th
                    w={'22%'}
                    maxW={'22%'}
                    borderRightWidth={'1px'}
                    borderRightColor={'#E7E7E7'}
                  >
                    <MainCell
                      type="Growth"
                      description="Scale your Bitcoin ZK rollup as you go"
                      priceUSD={`$${
                        new BigNumber(dataNoProver?.TotalCostUSD || 0)
                          .decimalPlaces(2)
                          .toString() || '--'
                      }`}
                      priceBVM={`${
                        new BigNumber(dataNoProver?.TotalCostBVM || 0)
                          .decimalPlaces(1)
                          .toString() || '--'
                      } BVM`}
                      ctaButtonElement={
                        <button
                          className={s.ctaBtn}
                          onClick={growthLaunchOnClick}
                        >
                          {'Customize your rollup'}
                        </button>
                      }
                    />
                  </Th>
                  <Th
                    w={'22%'}
                    maxW={'22%'}
                    borderRightWidth={'1px'}
                    borderRightColor={'#E7E7E7'}
                  >
                    <MainCell
                      type="Secure"
                      description="Fully secure your Bitcoin ZK rollup with a cryptographic prover"
                      priceUSD={`$${
                        new BigNumber(dataProver?.TotalCostUSD || 0)
                          .decimalPlaces(2)
                          .toString() || '--'
                      }`}
                      priceBVM={`${
                        new BigNumber(dataProver?.TotalCostBVM || 0)
                          .decimalPlaces(1)
                          .toString() || '--'
                      } BVM`}
                      ctaButtonElement={
                        <button
                          className={s.ctaBtn}
                          onClick={bussinessLaunchOnClick}
                        >
                          {'Customize your rollup'}
                        </button>
                      }
                    />
                  </Th>
                  <Th w={'22%'} maxW={'22%'}>
                    <MainCell
                      type="Enterprise"
                      description="For organizations who need customization, BVM engineering team access, and dedicated support"
                      isEnterprice={true}
                      ctaButtonElement={
                        <button
                          className={s.ctaBtn}
                          onClick={enterpriseLaunchOnClick}
                        >
                          {'Contact us'}
                        </button>
                      }
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <HardwareSection />
                <BlockchainSection />
                <PreInstallDappSection />
                <SupportSection />
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
      {isOpenLoadingModal && (
        <ModalLoading show={isOpenLoadingModal} onClose={onCloseLoadingModal} />
      )}
    </Flex>
  );
};

export default PriceModule;
