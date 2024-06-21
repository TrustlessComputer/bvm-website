import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import ModalLoading from '@/components/ModalLoading';
import useL2Service from '@/hooks/useL2Service';
import {
  estimateTotalCostAPI_V2,
  orderBuyAPI,
} from '@/services/api/l2services';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchAvailableList } from '@/stores/states/l2services/actions';
import {
  setShowAllChains,
  setViewMode,
  setViewPage,
} from '@/stores/states/l2services/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { getErrorMessage } from '@/utils/errorV2';
import sleep from '@/utils/sleep';
import {
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CardInfor from './components/CardInfor';
import { orderRegisterBootstrapParams } from './services';
import s from './styles.module.scss';
import {
  ORDER_BUY_NO_PROVER,
  ORDER_BUY_YES_PROVER,
  PRICING_PACKGE,
} from './constants';
import { IOrderBuyEstimateRespone_V2 } from '@/services/api/l2services/types';
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
        const { message } = getErrorMessage(error);
        toast.error(message);
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

  const renderBootstrapUI = () => {
    if (!availableList) return null;
    return (
      <CardInfor
        title="Hacker"
        desc="The easiest way to launch your own ZK Rollup on Bitcoin"
        price={
          <Flex direction={'column'}>
            <Flex
              direction={'row'}
              align={'center'}
              justify={'center'}
              gap={'10px'}
            >
              <Text
                fontSize={'40px'}
                lineHeight={'52px'}
                fontWeight={500}
                textAlign={'center'}
              >
                {`${availableList['package']?.['2']?.[0]?.price || '--'}`}
              </Text>
              <Text
                fontSize={'24px'}
                lineHeight={'31px'}
                fontWeight={300}
                textAlign={'center'}
                opacity={0.7}
                className={s.fontType2}
              >
                {`${availableList['package']?.['2']?.[0]?.priceNote || '--'}`}
              </Text>
            </Flex>

            <Text
              fontSize={'12px'}
              lineHeight={'16px'}
              fontWeight={400}
              textAlign={'center'}
            >
              {`per chain / month`}
            </Text>
          </Flex>
        }
        color="#fff"
        // bgGradient={'linear(to-r, #8AABF9, #627EEA)'}
        bgGradient={'linear(to-r, #3C6BE2, #3C6BE2)'}
        ctaButton={
          <button className={s.ctaBtn1} onClick={bootstrapLaunchOnClick}>
            {'Launch now with 1-Click'}
          </button>
        }
        hardwareList={[
          'Memory: 16 GB RAM',
          'CPU: 8 cores',
          'Storage: 320 GB SSD',
        ]}
        blockChainInforsList={[
          'Data availability: Polygon',
          'Max block gas limit: 30,000,000',
          'Zk Prover: No',
          'Withdrawal period: 6 hours',
        ]}
        preInstallDAppList={[
          'Network Explorer',
          'BVM Bridge',
          'Bitcoin Bridge',
          'Ethereum Bridge',
        ]}
        supportList={[
          'Support response time: 48h',
          'Telegram support: Yes',
          'Dedicated Telegram group: No',
          'Access to BVM engineering team: No',
        ]}
      />
    );
  };
  const renderGrowthUI = () => {
    if (!availableList) return null;
    return (
      <CardInfor
        title="Growth"
        desc="Scale your Bitcoin ZK rollup as you go"
        price={
          <Flex direction={'column'}>
            <Flex
              direction={'row'}
              align={'center'}
              justify={'center'}
              gap={'10px'}
            >
              <Text
                fontSize={'40px'}
                lineHeight={'52px'}
                fontWeight={500}
                textAlign={'center'}
              >
                {`$${
                  new BigNumber(dataNoProver?.TotalCostUSD || 0)
                    .decimalPlaces(2)
                    .toString() || '--'
                }`}
              </Text>
              <Text
                fontSize={'24px'}
                lineHeight={'31px'}
                fontWeight={300}
                textAlign={'center'}
                opacity={0.5}
                color={'#000'}
                className={s.fontType2}
              >
                {/* {`${availableList['package']?.['2']?.[1]?.priceNote || '--'}`} */}
                {`${
                  new BigNumber(dataNoProver?.TotalCostBVM || 0)
                    .decimalPlaces(1)
                    .toString() || '--'
                } BVM`}
              </Text>
            </Flex>

            <Text
              fontSize={'12px'}
              lineHeight={'16px'}
              fontWeight={400}
              textAlign={'center'}
            >
              {`per chain / month`}
            </Text>
          </Flex>
        }
        ctaButton={
          <button className={s.ctaBtn} onClick={growthLaunchOnClick}>
            {'Customize your rollup'}
          </button>
        }
        hardwareList={[
          'Memory: 64 GB RAM',
          'CPU: 32 cores',
          'Storage: 650 GB SSD',
        ]}
        blockChainInforsList={[
          'Data availability: Polygon, Celestia, Near DA, Eigen DA',
          'Max block gas limit: 50,000,000',
          'ZK Prover: No',
          'Withdrawal period: 4 hours',
        ]}
        preInstallDAppList={[
          'Network Explorer',
          'BVM Bridge',
          'Bitcoin Bridge',
          'Ethereum Bridge',
        ]}
        supportList={[
          'Support response time: 24h',
          'Telegram support: Yes',
          'Dedicated Telegram group: Yes',
          'Access to BVM engineering team: No',
        ]}
      />
    );
  };

  const renderBusinessUI = () => {
    if (!availableList) return null;
    return (
      <CardInfor
        title="Secure"
        desc="Fully secure your Bitcoin ZK rollup with a cryptographic prover"
        price={
          <Flex direction={'column'}>
            <Flex
              direction={'row'}
              align={'center'}
              justify={'center'}
              gap={'10px'}
            >
              <Text
                fontSize={'40px'}
                lineHeight={'52px'}
                fontWeight={500}
                textAlign={'center'}
              >
                {/* {`${availableList['package']?.['1']?.[1]?.price || '--'}`} */}
                {`$${
                  new BigNumber(dataProver?.TotalCostUSD || 0)
                    .decimalPlaces(2)
                    .toString() || '--'
                }`}
              </Text>
              <Text
                fontSize={'24px'}
                lineHeight={'31px'}
                fontWeight={300}
                textAlign={'center'}
                opacity={0.5}
                color={'#000'}
                className={s.fontType2}
              >
                {/* {`${availableList['package']?.['1']?.[1]?.priceNote || '--'}`} */}
                {`${
                  new BigNumber(dataProver?.TotalCostBVM || 0)
                    .decimalPlaces(1)
                    .toString() || '--'
                } BVM`}
              </Text>
            </Flex>

            <Text
              fontSize={'12px'}
              lineHeight={'16px'}
              fontWeight={400}
              textAlign={'center'}
            >
              {`per chain / month`}
            </Text>
          </Flex>
        }
        ctaButton={
          <button className={s.ctaBtn} onClick={bussinessLaunchOnClick}>
            {'Customize your rollup'}
          </button>
        }
        hardwareList={[
          'Memory: 64 GB RAM',
          'CPU: 32 cores',
          'Storage: 650 GB SSD',
        ]}
        blockChainInforsList={[
          'Data availability: Polygon, Celestia, Near DA, Eigen DA',
          'Max block gas limit: 100,000,000',
          'ZK Prover: Yes',
          'Withdrawal period: 2 hours',
        ]}
        preInstallDAppList={[
          'Network Explorer',
          'BVM Bridge',
          'Bitcoin Bridge',
          'Ethereum Bridge',
        ]}
        supportList={[
          'Support response time: 12h',
          'Telegram support: Yes',
          'Dedicated Telegram group: Yes',
          'Access to BVM engineering team: No',
        ]}
      />
    );
  };

  const renderEnterpriseUI = () => {
    return (
      <CardInfor
        title="Enterprise"
        desc="For organizations who need customization, BVM engineering team access, and dedicated support"
        price={
          <Text
            fontSize={'25px'}
            lineHeight={'30px'}
            fontWeight={500}
            textAlign={'center'}
            mt={'20px'}
          >
            {`Custom pricing`}
          </Text>
        }
        ctaButton={
          <button className={s.ctaBtn} onClick={enterpriseLaunchOnClick}>
            Contact us
          </button>
        }
        // isHideBlockchainInfor={true}
        // isHideHardware={true}
        // includes={[
        //   'Customize-able',
        //   'Unlimited Requests with Auto-scaling',
        //   'Higher Throughput',
        //   'Committed usage discounts',
        //   'Custom on-demand discounts',
        //   'VIP support channels',
        //   'Engineering team access',
        // ]}
        hardwareList={['Memory: Custom', 'CPU: Custom', 'Storage: Custom']}
        blockChainInforsList={[
          'Data availability: Custom',
          'Max block gas limit: Custom',
          'ZK Prover: Custom',
          'Withdrawal period: Custom',
        ]}
        preInstallDAppList={[
          'Network Explorer: Custom',
          'BVM Bridge: Custom',
          'Bitcoin Bridge: Custom',
          'Withdrawal period: Custom',
        ]}
        supportList={[
          'Support response time: 1h',
          'Telegram support: Yes',
          'Dedicated Telegram group: Yes',
          'Access to BVM engineering team: Yes',
        ]}
      />
    );
  };

  return (
    <div className={s.container}>
      {availableListFetching || !availableList ? (
        <Flex w={'100%'} minH={'500px'} justify={'center'} align={'center'}>
          <Spinner></Spinner>
        </Flex>
      ) : (
        <Flex
          flexDir={'column'}
          align={'center'}
          gap={'60px'}
          w={'100%'}
          maxW={'1700px'}
        >
          {/* Heaader*/}
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

            {/* Footer */}
            {/* <Text
                fontSize={'24px'}
                fontWeight={500}
                lineHeight={'33px'}
                color={'#FA4E0E'}
                className={s.fontType3}
                textAlign={'center'}
                opacity={0.7}
                _hover={{
                  opacity: 0.8,
                  cursor: 'pointer',
                }}
                onClick={manageYourChainsOnClick}
              >
                Manage your chains
              </Text> */}
          </Flex>

          {/* Body */}
          <SimpleGrid columns={4} row={1} spacing={'20px'} w={'100%'}>
            {renderBootstrapUI()}
            {renderGrowthUI()}
            {renderBusinessUI()}
            {renderEnterpriseUI()}
          </SimpleGrid>
        </Flex>
      )}
      {isOpenLoadingModal && (
        <ModalLoading show={isOpenLoadingModal} onClose={onCloseLoadingModal} />
      )}
    </div>
  );
};

export default PriceModule;
