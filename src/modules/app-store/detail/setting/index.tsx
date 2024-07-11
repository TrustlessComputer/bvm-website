import { useAppSelector } from '@/stores/hooks';
import {
  getL2ServicesStateSelector,
  myOrderListFilteredByNetwork,
} from '@/stores/states/l2services/selector';
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import useL2Service from '@hooks/useL2Service';
import React, { useEffect, useMemo, useState } from 'react';
import Loading from '@components/Loading';
import s from './styles.module.scss';
import { APP_STORE, PRICING } from '@constants/route-path';
import { OrderItem } from '@/stores/states/l2services/types';
import SvgInset from '@components/SvgInset';
import ChainItem from '@/modules/app-store/detail/setting/chainItem';
import InputWrapper from '@/components/Form/inputWrapper';
import PackageItem from '@/modules/app-store/detail/setting/packageItem';
import { useRouter } from 'next/navigation';
import TopupModal from '@/modules/blockchains/components/TopupModal';
import SubmitResultFormModal from '@/modules/blockchains/Buy/SubmitResultFormModal';
import SendFormModal from '@/modules/blockchains/components/SendFormModal';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import Form from '@/modules/app-store/detail/setting/form';
import { IDApp, IDAppDetails } from '@/services/api/DAServices/types';
import AccountAbstractionInputArea from './accountAbstractionInput';
import useDAppHelper from '@/hooks/useDAppHelper';
import { checkDAInstallHelper } from '../helper';

const SettingView = ({
  app,
  appPackage,
  onClose,
}: {
  app?: IDApp;
  appPackage: IDAppDetails;
  onClose: any;
}) => {
  const router = useRouter();

  const { loopFetchAccountInfor, getMyOrderList } = useL2Service();
  const { loggedIn } = useWeb3Auth();
  const { accountInforL2Service, isMyOrderListFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const [selectedOrder, setSelectedOrder] = useState<OrderItem | undefined>(
    undefined,
  );
  const [selectedPackage, setSelectedPackage] = useState<
    IDAppDetails | undefined
  >(app?.details?.[0] || undefined);

  const [inputs, setInputs] = useState<any[]>([]);
  const [isInValidFromInputArea, setInValidFromInputArea] =
    useState<boolean>(false);

  const { hasIntalledByNetworkID } = useDAppHelper({
    dApp: app,
  });

  useEffect(() => {
    loopFetchAccountInfor();
    if (loggedIn) {
      getMyOrderList();
    }
  }, [loggedIn]);

  const myOrders = useAppSelector(myOrderListFilteredByNetwork);

  useEffect(() => {
    if (myOrders?.length === 1) {
      setSelectedOrder(myOrders[0]);
    }
  }, [myOrders]);

  const isDisabledSelectChain = useMemo(() => {
    return !(myOrders.length > 1);
  }, [myOrders]);

  const { isInstalled, statusPackage } = useMemo(() => {
    // return hasIntalledByNetworkID(selectedOrder?.chainId);
    const { disabeldInstallDA, statusPackage } = checkDAInstallHelper(
      selectedOrder,
      app!,
    );
    return {
      isInstalled: disabeldInstallDA,
      statusPackage,
    };
  }, [app, selectedOrder]);

  const {
    showSubmitFormResult,
    setShowSubmitFormResult,
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
    if (app?.code === 'account_abstraction' && !isInstalled) {
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
    if (myOrders?.length === 0) {
      return (
        <Text className={s.note}>
          There is no chain, please launch a chain before install Dapp
        </Text>
      );
    }

    if (selectedOrder?.isNeedTopup) {
      return (
        <Text className={s.note}>
          Please pay to launch a chain before install Dapp
        </Text>
      );
    }

    if (isInstalled) {
      return (
        <Text className={s.note}>
          This Dapp basic have been installed in this chain, install other Dapp
          or launch a new chain.
        </Text>
      );
    }

    return <></>;
  };

  const renderActionButtons = () => {
    if (myOrders?.length === 0) {
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

    if (selectedOrder?.isNeedTopup) {
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
      Number(accountInforL2Service?.balanceFormatted) <
      Number(appPackage?.price_bvm)
    ) {
      return (
        <Button
          className={s.btnPrimary}
          isDisabled={!selectedPackage || !selectedOrder}
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
        app={app}
        selectedPackage={selectedPackage}
        selectedOrder={selectedOrder}
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
      {isMyOrderListFetched ? (
        <>
          <Flex gap={'12px'} justifyContent={'center'} alignItems={'center'}>
            <Image className={s.avatar} src={app?.icon_url} />
            <Text className={s.title}>{app?.name}</Text>
          </Flex>
          <Divider orientation={'horizontal'} bg={'#ECECEC'} />
          <InputWrapper label={'Package'} className={s.inputWrapper}>
            <Flex gap={'24px'}>
              {app?.details?.map((p, index) => {
                return (
                  <PackageItem
                    key={`${p.id}-${index}`}
                    data={p}
                    isSelected={p.id === selectedPackage?.id}
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
                  <ChainItem data={selectedOrder} isButton dApp={app} />
                  <SvgInset svgUrl="/icons/ic-arrow-down.svg" />
                </MenuButton>
                <MenuList>
                  {myOrders.map((t) => (
                    <ChainItem
                      packageSelected={selectedPackage}
                      user_package={app?.user_package || []}
                      key={t.chainId}
                      data={t}
                      dApp={app}
                      onSelectChain={(c: OrderItem) => setSelectedOrder(c)}
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
        <Flex className={s.loadingContainer}>
          <Loading />
        </Flex>
      )}
      {showSubmitFormResult && (
        <SubmitResultFormModal
          show={showSubmitFormResult}
          onClose={() => {
            setShowSubmitFormResult(false);
          }}
          onSuccess={async () => {}}
        />
      )}

      {showTopupModal && (
        <TopupModal
          show={showTopupModal}
          // warningMessage={
          //   'Operating your Bitcoin L2 testnet requires 1 $BVM per day.'
          // }
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
            selectedOrder?.isNeedTopup
              ? selectedOrder
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
