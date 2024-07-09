import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import ModalLoading from '@/components/ModalLoading';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import { orderBuyAPI } from '@/services/api/l2services';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchAvailableList } from '@/stores/states/l2services/actions';
import {
  setShowAllChains,
  setViewMode,
  setViewPage,
} from '@/stores/states/l2services/reducer';
import {
  getL2ServicesStateSelector,
  packageDetailByPackageEnumSelector,
} from '@/stores/states/l2services/selector';
import sleep from '@/utils/sleep';
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
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { PRICING_PACKGE } from '../PricingV2/constants';
import { orderRegisterBootstrapParams } from '../PricingV2/services';
import BlockchainSection from './components/BlockchainSection';
import HardwareSection from './components/HardwareSection';
import MainCell from './components/MainCell';
import PreInstallDappSection from './components/PreInstallDappSection';
import SupportSection from './components/SupportSection';
import s from './styles.module.scss';

const PriceV2Module = () => {
  const dispatch = useAppDispatch();
  const { tracking } = useL2ServiceTracking();
  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  const { loggedIn, login } = useWeb3Auth();
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

  const getPackageDetailFunc = useAppSelector(
    packageDetailByPackageEnumSelector,
  );

  const isFetchingData = useMemo(() => {
    return availableListFetching || !availableList;
  }, [availableListFetching, availableList]);

  useEffect(() => {
    dispatch(fetchAvailableList());
  }, []);

  const bootstrapLaunchOnClick = async () => {
    tracking('SUBMIT_TIER1');
    if (!loggedIn) {
      login();
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

          router.push('/rollups');
        }
      } catch (error) {
        // const { message } = getErrorMessage(error);
        // toast.error(message);
        dispatch(setViewMode('Mainnet'));
        dispatch(setViewPage('ManageChains'));
        dispatch(setShowAllChains(false));

        router.push('/rollups?hasOrderFailed=true');
      } finally {
        onCloseLoadingModal();
      }
    }
  };

  const bootstrapLaunchOnClickV2 = async () => {
    tracking('SUBMIT_TIER1');
    if (!loggedIn) {
      login();
    } else {
      router.push(`/rollups/customizev2?package=${PRICING_PACKGE.Hacker}`);
    }
  };

  const growthLaunchOnClick = () => {
    tracking('CUSTOMIZE_TIER2');
    if (!loggedIn) {
      login();
    } else {
      router.push(`/rollups/customizev2?package=${PRICING_PACKGE.Growth}`);
    }
  };

  const bussinessLaunchOnClick = () => {
    tracking('CUSTOMIZE_TIER3');
    if (!loggedIn) {
      login();
    } else {
      router.push(`/rollups/customizev2?package=${PRICING_PACKGE.Secure}`);
    }
  };

  const enterpriseLaunchOnClick = () => {
    tracking('CONTACTS_US');
    showContactUsModal();
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
        maxW={'1700px'}
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
            {`Blockchain as a Service.`}
          </Text>
          <Text
            textAlign={'center'}
            fontSize={'20px'}
            lineHeight={'28px'}
            fontWeight={400}
            opacity={0.7}
            className={s.fontType2}
          >
            {`Powerful solutions to build and scale your blockchain with ease.`}
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
                    minWidth={'220px'}
                  ></Th>
                  <Th borderRightWidth={'1px'} borderRightColor={'#E7E7E7'}>
                    <MainCell
                      type="Hacker"
                      description="The easiest way to launch your own blockchain"
                      priceUSD={`${
                        getPackageDetailFunc(PRICING_PACKGE.Hacker)?.price ||
                        '--'
                      }`}
                      priceBVM={`${
                        getPackageDetailFunc(PRICING_PACKGE.Hacker)
                          ?.priceNote || '--'
                      }`}
                      ctaButtonElement={
                        <button
                          className={s.ctaBtn}
                          onClick={bootstrapLaunchOnClickV2}
                        >
                          {'Launch now with 1-Click 2'}
                        </button>
                      }
                    />
                  </Th>
                  <Th borderRightWidth={'1px'} borderRightColor={'#E7E7E7'}>
                    <MainCell
                      type="Growth"
                      description="Scale your blockchain as you go"
                      priceUSD={`${
                        getPackageDetailFunc(PRICING_PACKGE.Growth)?.price ||
                        '--'
                      }`}
                      priceBVM={`${
                        getPackageDetailFunc(PRICING_PACKGE.Growth)
                          ?.priceNote || '--'
                      }`}
                      ctaButtonElement={
                        <button
                          className={s.ctaBtn}
                          onClick={growthLaunchOnClick}
                        >
                          {'Customize'}
                        </button>
                      }
                    />
                  </Th>
                  <Th borderRightWidth={'1px'} borderRightColor={'#E7E7E7'}>
                    <MainCell
                      type="Secure"
                      description="Fully secure your blockchain with a cryptographic prover"
                      priceUSD={`${
                        getPackageDetailFunc(PRICING_PACKGE.Secure)?.price ||
                        '--'
                      }`}
                      priceBVM={`${
                        getPackageDetailFunc(PRICING_PACKGE.Secure)
                          ?.priceNote || '--'
                      }`}
                      ctaButtonElement={
                        <button
                          className={s.ctaBtn}
                          onClick={bussinessLaunchOnClick}
                        >
                          {'Customize'}
                        </button>
                      }
                    />
                  </Th>
                  <Th minW={'330px'}>
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

export default PriceV2Module;
