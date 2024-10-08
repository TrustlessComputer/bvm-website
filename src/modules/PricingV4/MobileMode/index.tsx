import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
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
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { PRICING_PACKGE } from '../../PricingV2/constants';
import { orderRegisterBootstrapParams } from '../../PricingV2/services';
import CheckedIcon from '../components/CheckedIcon';
import NoCheckIcon from '../components/NoCheckIcon';
import { DATA_LIST, PackageItemType } from './data';
import s from './styles.module.scss';

const PricingMobileModule = () => {
  const dispatch = useAppDispatch();
  const { tracking } = useL2ServiceTracking();
  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  const { loggedIn, login, userInfo } = useWeb3Auth();
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

  const manageYourChainsOnClick = () => {
    if (!loggedIn) {
      login();
    } else {
      dispatch(setViewMode('Mainnet'));
      dispatch(setViewPage('ManageChains'));
      dispatch(setShowAllChains(false));
      router.push('/rollups');
    }
  };

  const ctaButtonOnClick = (value: PRICING_PACKGE) => {
    if (value === PRICING_PACKGE.Hacker) {
      bootstrapLaunchOnClickV2();
    }
    if (value === PRICING_PACKGE.Growth) {
      growthLaunchOnClick();
    }
    if (value === PRICING_PACKGE.Secure) {
      bussinessLaunchOnClick();
    }
    if (value === PRICING_PACKGE.Enterprise) {
      enterpriseLaunchOnClick();
    }
  };

  const getPrice = (value: PRICING_PACKGE) => {
    let result = {
      priceUSD: '0',
      priceBVM: '0',
    };

    if (value === PRICING_PACKGE.Hacker) {
      result.priceUSD =
        getPackageDetailFunc(PRICING_PACKGE.Hacker)?.price || '--';
      result.priceBVM =
        getPackageDetailFunc(PRICING_PACKGE.Growth)?.price || '--';
    }
    if (value === PRICING_PACKGE.Growth) {
      result.priceUSD =
        getPackageDetailFunc(PRICING_PACKGE.Growth)?.price || '--';
      result.priceBVM =
        getPackageDetailFunc(PRICING_PACKGE.Growth)?.price || '--';
    }
    if (value === PRICING_PACKGE.Secure) {
      result.priceUSD =
        getPackageDetailFunc(PRICING_PACKGE.Secure)?.price || '--';
      result.priceBVM =
        getPackageDetailFunc(PRICING_PACKGE.Secure)?.price || '--';
    }
    if (value === PRICING_PACKGE.Enterprise) {
      //
    }
    return result;
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
  const renderHeader = (data: PackageItemType) => {
    const { title, description, isEnterprise, ctaBtnTitle, value } = data;
    return (
      <Flex direction={'column'} p={'10px'} gap={'10px'} textAlign={'center'}>
        <Flex direction={'column'} p={'10px'}>
          <Text
            fontSize={'20px'}
            lineHeight={'26px'}
            fontWeight={500}
            className={s.fontJetBrains}
            opacity={0.7}
          >
            {title || '--'}
          </Text>
          <Text
            fontSize={'16px'}
            lineHeight={'20px'}
            fontWeight={400}
            className={s.fontSFProDisplay}
            opacity={0.7}
          >
            {description || '--'}
          </Text>
        </Flex>

        {!isEnterprise && (
          <Flex flexDir={'column'} mb="15px">
            <Flex
              direction={'row'}
              justify={'center'}
              align={'center'}
              gap={'10px'}
            >
              <Text
                fontSize={'40px'}
                lineHeight={'52px'}
                fontWeight={500}
                className={s.fontJetBrains}
              >
                {`${getPrice(value).priceUSD}`}
              </Text>
              <Text
                fontSize={'24px'}
                lineHeight={'31px'}
                fontWeight={300}
                opacity={0.7}
                className={s.fontSFProDisplay}
              >
                {`${getPrice(value).priceBVM}`}
              </Text>
            </Flex>
            <Text
              fontSize={'12px'}
              lineHeight={'16px'}
              fontWeight={400}
              className={s.fontJetBrains}
            >
              {`per rollup / month`}
            </Text>
          </Flex>
        )}

        {isEnterprise && (
          <Text
            fontSize={'28px'}
            lineHeight={'32px'}
            fontWeight={500}
            textAlign={'center'}
            className={s.fontJetBrains}
            mb={'20px'}
          >
            {'Custom'}
          </Text>
        )}

        <button
          className={s.ctaBtn}
          onClick={() => {
            ctaButtonOnClick(value);
          }}
        >
          {ctaBtnTitle}
        </button>
      </Flex>
    );
  };

  const renderSection = (
    titleSection: string,
    dataSection: {
      [key: string]: string | boolean;
    },
  ) => {
    return (
      <Flex direction={'column'}>
        <Flex bgColor={'#f4f4f4'} align={'center'}>
          <Text
            ml={'5px'}
            py="5px"
            fontSize={'16px'}
            lineHeight={'20px'}
            fontWeight={600}
            className={s.fontSFProDisplay}
          >
            {titleSection}
          </Text>
        </Flex>
        {Object.keys(dataSection).map((key) => {
          const value = dataSection[key];
          return (
            <Flex
              flexDir={'row'}
              align={'center'}
              my="5px"
              mx="12px"
              key={`${key}-${value}`}
            >
              <Flex flex={1}>
                <Text
                  fontWeight={500}
                  fontSize={'14px'}
                  className={s.fontJetBrains}
                >
                  {key || '--'}
                </Text>
              </Flex>

              <Flex flex={1} align={'center'} justify={'center'}>
                <Text
                  textAlign={'center'}
                  fontSize={'14px'}
                  className={s.fontSFProDisplay}
                  borderRightWidth={'1px'}
                  borderRightColor={'#e7e7e781'}
                >
                  {typeof value === 'string' ? (
                    value
                  ) : typeof value === 'boolean' && value ? (
                    <CheckedIcon />
                  ) : (
                    <NoCheckIcon />
                  )}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    );
  };

  const renderBody = (data: PackageItemType, isEnterprice?: boolean) => {
    const { Blockchain, Hardware, PreInstalledDapps, Support } = data;
    return (
      <Flex direction={'column'} gap={'10px'}>
        {renderSection('Hardware', Hardware)}
        {renderSection('Blockchain', Blockchain)}
        {renderSection('Pre-installed dapps', PreInstalledDapps)}
        {renderSection('Support', Support)}
      </Flex>
    );
  };

  const renderDataItem = (data: PackageItemType) => {
    return (
      <Flex
        key={`${data.key} - ${data.title}`}
        direction={'column'}
        bgColor={'#fff'}
        borderRadius={'8px'}
        py="10px"
      >
        {renderHeader(data)}
        {renderBody(data)}
      </Flex>
    );
  };

  return (
    <Flex className={s.container}>
      <Flex
        flexDir={'column'}
        gap={'15px'}
        align={'center'}
        textAlign={'center'}
        mb={'20px'}
      >
        <Text fontSize={'22px'} lineHeight={'26px'} fontWeight={400}>
          {`Blockchain as a Service.`}
        </Text>
        <Text
          fontSize={'18px'}
          lineHeight={'20px'}
          fontWeight={400}
          opacity={0.7}
          className={s.fontType2}
        >
          {`Powerful solutions to build and scale your blockchain with ease.`}
        </Text>
      </Flex>
      <SimpleGrid column={1} row={DATA_LIST.length} spacing={'30px'}>
        {DATA_LIST.map((item) => renderDataItem(item))}
      </SimpleGrid>
    </Flex>
  );
};

export default PricingMobileModule;
