import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector, myOrderListFilteredByNetwork } from '@/stores/states/l2services/selector';
import { Box, Button, Divider, Flex, Image, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import useL2Service from '@hooks/useL2Service';
import React, { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { APP_STORE, PRICING } from '@constants/route-path';
import { OrderItem } from '@/stores/states/l2services/types';
import SvgInset from '@components/SvgInset';
import ChainItem from '@/modules/app-store/detail/setting/chainItem';
import InputWrapper from '@/components/Form/inputWrapper';
import PackageItem from '@/modules/app-store/detail/setting/packageItem';
import { useRouter } from 'next/navigation';
import TopupModal from '@/modules/blockchains/components/TopupModal';
import SendFormModal from '@/modules/blockchains/components/SendFormModal';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import Form from '@/modules/app-store/detail/setting/form';
import { IDApp, IDAppDetails } from '@/services/api/DAServices/types';
import AccountAbstractionInputArea from './accountAbstractionInput';
import { checkDAInstallHelper } from '../helper';
import dAppServicesAPI from '@/services/api/DAServices';
import SkeletonLoading from './SkeletonLoading';
import { isProduction } from '@/config';

const SettingView = ({
  appID,
  appPackage,
  onClose,
}: {
  appID?: number;
  appPackage: IDAppDetails;
  onClose: any;
}) => {
  const router = useRouter();

  const { getMyOrderList, getAccountInfor } = useL2Service();
  const { loggedIn } = useWeb3Auth();
  const { accountInforL2Service, isMyOrderListFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const myChainOrders = useAppSelector(myOrderListFilteredByNetwork);
  const [selectedChain, setSelectedChain] = useState<OrderItem | undefined>(
    undefined,
  );
  const [selectedPackage, setSelectedPackage] = useState<
    IDAppDetails | undefined
  >(appPackage);

  const [isAppInforByUserFetched, setAppInforByUserFetched] = useState(false);
  const [appInforByUser, setAppInforByUser] = useState<IDApp | undefined>(
    undefined,
  );

  const [inputs, setInputs] = useState<any[]>([]);
  const [isInValidFromInputArea, setInValidFromInputArea] =
    useState<boolean>(false);

  const getAppInforByCurentUser = async () => {
    try {
      const result = await dAppServicesAPI.fetchAppInforByUserAddress(
        Number(appID),
        accountInforL2Service?.tcAddress,
      );
      setAppInforByUser(result);
    } catch (error) {
    } finally {
      setAppInforByUserFetched(true);
    }
  };

  const isFetched = useMemo(() => {
    return !!isMyOrderListFetched && !!isAppInforByUserFetched;
  }, [isMyOrderListFetched, isAppInforByUserFetched]);

  useEffect(() => {
    if (loggedIn) {
      getMyOrderList();
      getAccountInfor();
      getAppInforByCurentUser();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (myChainOrders?.length === 1) {
      setSelectedChain(myChainOrders[0]);
    }
  }, [myChainOrders]);

  const isDisabledSelectChain = useMemo(() => {
    return !(myChainOrders.length > 1);
  }, [myChainOrders]);

  const { disabeldInstallDA, statusPackage, isInstalled } = useMemo(() => {
    const { disabeldInstallDA, statusPackage, isInstalled } =
      checkDAInstallHelper(selectedChain, appInforByUser, selectedPackage);
    return {
      disabeldInstallDA,
      statusPackage,
      isInstalled,
    };
  }, [appInforByUser, selectedChain, selectedPackage]);

  const {
    showTopupModal,
    setShowTopupModal,
    showSendFormModal,
    setShowSendFormModal,
  } = useBuy();

  // console.log('accountInforL2Service', accountInforL2Service);
  // console.log('appapp', app);
  // console.log('appPackage', appPackage);
  // console.log('myOrders', myOrders);
  // console.log('inputs', inputs);
  // console.log('isInValidFromInputArea', isInValidFromInputArea);

  const renderInputFactory = () => {
    if (appInforByUser?.code === 'account_abstraction' && !isInstalled) {
      return (
        <AccountAbstractionInputArea
          resultCallback={({ isInValid, inputs }) => {
            setInputs(inputs);
            setInValidFromInputArea(isInValid);
          }}
        />
      );
    }
    return null;
  };

  const renderActionNote = () => {
    if (myChainOrders?.length === 0) {
      return (
        <Text className={s.note}>
          There is no chain, please launch a chain before install Dapp
        </Text>
      );
    }

    if (selectedChain?.isNeedTopup) {
      return (
        <Text className={s.note}>
          Please pay to launch a chain before install Dapp
        </Text>
      );
    }

    if (!selectedChain) {
      return null;
    }

    if (isInstalled) {
      return (
        <Text className={s.note}>
          <Text as="span" fontWeight={600}>{`${
            appInforByUser?.name || '--'
          }`}</Text>
          {` have been ${
            statusPackage?.toLowerCase() || '--'
          } in this chain, install other Dapp or launch a new chain.`}
        </Text>
      );
    }

    return null;
  };

  const renderActionButtons = () => {
    if (myChainOrders?.length === 0) {
      return (
        <Button
          className={s.btnPrimary}
          onClick={() => {
            router.push(PRICING);
            onClose();
          }}
        >
          Launch a chain
        </Button>
      );
    }

    if (selectedChain?.isNeedTopup) {
      return (
        <Button
          className={s.btnPrimary}
          onClick={() => {
            setShowTopupModal(true);
          }}
        >
          Payment
        </Button>
      );
    }

    if (isInstalled) {
      return (
        <>
          <Button
            className={s.btnSecondary}
            onClick={() => {
              router.push(APP_STORE);
              onClose();
            }}
          >
            Install other Dapp
          </Button>

          <Button
            className={s.btnPrimary}
            onClick={() => {
              router.push(PRICING);
              onClose();
            }}
          >
            Launch new chain
          </Button>
        </>
      );
    }

    if (
      isProduction && (Number(accountInforL2Service?.balanceFormatted) <
      Number(appPackage?.price_bvm))
    ) {
      return (
        <Button
          className={s.btnPrimary}
          isDisabled={!selectedPackage || !selectedChain}
          onClick={() => {
            setShowTopupModal(true);
          }}
        >
          Install
        </Button>
      );
    }

    return (
      <Form
        app={appInforByUser}
        selectedPackage={selectedPackage}
        selectedOrder={selectedChain}
        isInValid={isInValidFromInputArea}
        inputs={inputs}
        onSucessCb={() => {
          onClose();
        }}
      />
    );
  };

  return (
    <Flex className={s.container} direction={'column'} gap={'28px'}>
      {isFetched ? (
        <>
          <Flex gap={'12px'} justifyContent={'center'} alignItems={'center'}>
            <Image className={s.avatar} src={appInforByUser?.icon_url} />
            <Text className={s.title}>{appInforByUser?.name}</Text>
          </Flex>
          <Divider orientation={'horizontal'} bg={'#ECECEC'} />
          <InputWrapper label={'Package'} className={s.inputWrapper}>
            <Flex gap={'24px'}>
              {appInforByUser?.details?.map((p, index) => {
                return (
                  <PackageItem
                    key={`${p.id}-${index}`}
                    data={p}
                    isSelected={p.id === selectedPackage?.id}
                    isDisabled={p.status === 'incoming'}
                    isInstalled={isInstalled}
                    status={statusPackage}
                    onSelect={() => {
                      // setSelectedPackage(p);
                    }}
                  />
                );
              })}
            </Flex>
          </InputWrapper>

          <InputWrapper label="Install for chain" className={s.inputWrapper}>
            <Box className={s.menuChainWrapper}>
              <Menu>
                <MenuButton
                  className={s.btnSelectToken}
                  disabled={isDisabledSelectChain}
                >
                  <ChainItem
                    data={selectedChain}
                    packageSelected={selectedPackage}
                    isButton
                    dApp={appInforByUser}
                  />
                  <SvgInset svgUrl="/icons/ic-arrow-down.svg" />
                </MenuButton>
                <MenuList>
                  {myChainOrders.map((t, index) => (
                    <ChainItem
                      key={`${t.chainId}-${index}`}
                      packageSelected={selectedPackage}
                      user_package={appInforByUser?.user_package || []}
                      data={t}
                      dApp={appInforByUser}
                      onSelectChain={(c: OrderItem) => setSelectedChain(c)}
                    />
                  ))}
                </MenuList>
              </Menu>
            </Box>
          </InputWrapper>
          {renderInputFactory()}
          {renderActionNote()}
          <Divider orientation={'horizontal'} bg={'#ECECEC'} />
          <Flex justifyContent={'center'} alignItems={'center'} gap={'28px'}>
            {renderActionButtons()}
          </Flex>
        </>
      ) : (
        <SkeletonLoading />
      )}

      {showTopupModal && (
        <TopupModal
          show={showTopupModal}
          infor={{
            paymentAddress: `${accountInforL2Service?.topUpWalletAddress}`,
          }}
          onClose={() => {
            setShowTopupModal(false);
          }}
          onSuccess={async () => {}}
          payWithNakaWalletCB={() => {
            setShowSendFormModal(true);
          }}
          order={
            selectedChain?.isNeedTopup
              ? selectedChain
              : ({
                  needToTopupBalanceFormatted: appPackage?.price_bvm,
                } as unknown as OrderItem)
          }
        />
      )}

      {showSendFormModal && (
        <SendFormModal
          show={showSendFormModal}
          onClose={() => {
            setShowSendFormModal(false);
          }}
          onSuccess={async () => {
            setShowSendFormModal(false);
          }}
        />
      )}
    </Flex>
  );
};

export default SettingView;
