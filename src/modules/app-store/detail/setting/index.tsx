import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector, myOrderListFilteredByNetwork } from '@/stores/states/l2services/selector';
import { Box, Button, Divider, Flex, Image, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import useL2Service from '@hooks/useL2Service';
import React, { useEffect, useMemo, useState } from 'react';
import Loading from '@components/Loading';
import s from './styles.module.scss';
import { APP_STORE, PRICING, ROLLUPS } from '@constants/route-path';
import { OrderItem } from '@/stores/states/l2services/types';
import SvgInset from '@components/SvgInset';
import ChainItem from '@/modules/app-store/detail/setting/chainItem';
import InputWrapper from '@/components/Form/inputWrapper';
import PackageItem from '@/modules/app-store/detail/setting/packageItem';
import { useRouter } from 'next/navigation';

const SettingView = ({app, appPackage}: {app:  IAppInfo, appPackage: IAppPackage}) => {
  const router = useRouter();

  const { getMyOrderList } = useL2Service();
  const { accountInforL2Service, isMyOrderListFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IAppPackage | undefined>(undefined);

  useEffect(() => {
    getMyOrderList();
  }, []);

  const myOrders = useAppSelector(myOrderListFilteredByNetwork);

  const isInstalled = useMemo(() => {
    return false;
  }, []);

  console.log('appapp', app);
  console.log('mode', appPackage);
  console.log('myOrders', myOrders);

  // useEffect(() => {
  //   if(myOrders?.length > 0) {
  //     setSelectedOrder(myOrders[0]);
  //   }
  // }, [isMyOrderListFetched, myOrders]);

  // useEffect(() => {
  //   if(myOrders?.length === 1 && selectedOrder && !selectedOrder.isNeedTopup) {
  //
  //   }
  // }, [selectedOrder]);

  const requestBuyApp = () => {
    try {
      setSubmitting(true);
    } catch (e) {

    } finally {
      setSubmitting(false);
    }
  }

  const renderActionNote = () => {
    if (myOrders?.length === 0) {
      return (
        <Text className={s.note}>There is no chain, please launch a chain before install Dapp</Text>
      );
    }

    if (selectedOrder?.isNeedTopup) {
      return (
        <Text className={s.note}>Please pay to launch a chain before install Dapp</Text>
      )
    }

    if (isInstalled) {
      return (
        <Text className={s.note}>This Dapp basic have been installed in this chain, install other Dapp or launch a new chain.</Text>
      )
    }

    return (
      <></>
    )
  }

  const renderActionButtons = () => {
    if (myOrders?.length === 0) {
      return (
        <Button className={s.btnPrimary} onClick={() => {
          router.push(PRICING);
        }}>Launch a chain</Button>
      );
    }

    if (selectedOrder?.isNeedTopup) {
      return (
        <Button className={s.btnPrimary} onClick={() => {

        }}>Payment</Button>
      )
    }

    if (isInstalled) {
      return (
        <>
          <Button className={s.btnSecondary} onClick={() => {
            router.push(APP_STORE);
          }}>Install other Dapp</Button>

          <Button className={s.btnPrimary} onClick={() => {
            router.push(PRICING);
          }}>Launch new chain</Button>
        </>
      )
    }

    return (
      <Button
        className={s.btnPrimary}
        isDisabled={!selectedPackage || !selectedOrder || submitting}
        isLoading={submitting}
        onClick={() => {
          router.push(PRICING);
        }
      }
      >Install</Button>
    )
  }

  return (
    <Flex className={s.container} direction={"column"} gap={"28px"}>
      {
        isMyOrderListFetched ? (
          <>
            <Flex gap={"12px"} justifyContent={'center'} alignItems={"center"}>
              <Image className={s.avatar} src={app?.image}/>
              <Text className={s.title}>{app?.title}</Text>
            </Flex>
            <Divider orientation={"horizontal"} bg={"#ECECEC"}/>
            <InputWrapper label={'Package'} className={s.inputWrapper}>
              <Flex gap={"24px"}>
                {
                  app?.modes?.map(p => {
                    return (
                      <PackageItem data={p} isSelected={p.id === selectedPackage?.id} onSelect={() => {setSelectedPackage(p)}}/>
                    )
                  })
                }
              </Flex>
            </InputWrapper>

            <InputWrapper label="Install for chain" className={s.inputWrapper}>
              <Box className={s.menuChainWrapper}>
                <Menu>
                  <MenuButton className={s.btnSelectToken}>
                    <ChainItem data={selectedOrder} isButton/>
                    <SvgInset svgUrl="/icons/ic-arrow-down.svg" />
                  </MenuButton>
                  <MenuList>
                    {myOrders.map((t) => (
                      <ChainItem
                        key={t.chainId}
                        data={t}
                        onSelectChain={(c: OrderItem) => setSelectedOrder(c)}
                      />
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            </InputWrapper>
            {renderActionNote()}
            <Divider orientation={"horizontal"} bg={"#ECECEC"}/>
            <Flex justifyContent={"center"} alignItems={"center"} gap={"28px"}>
              {renderActionButtons()}
            </Flex>
          </>
        ) : (
          <Flex className={s.loadingContainer}>
            <Loading />
          </Flex>
        )
      }
    </Flex>
  );
};

export default SettingView;
