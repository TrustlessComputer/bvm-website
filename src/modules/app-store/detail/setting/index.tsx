import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector, myOrderListFilteredByNetwork } from '@/stores/states/l2services/selector';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import useL2Service from '@hooks/useL2Service';
import React, { useEffect, useState } from 'react';
import Loading from '@components/Loading';
import s from './styles.module.scss';
import { PRICING, ROLLUPS } from '@constants/route-path';
import { OrderItem } from '@/stores/states/l2services/types';

const SettingView = () => {
  const { getMyOrderList } = useL2Service();
  const { accountInforL2Service, isMyOrderListFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getMyOrderList();
  }, []);

  const myOrders = useAppSelector(myOrderListFilteredByNetwork);

  useEffect(() => {
    if(myOrders?.length > 0) {
      setSelectedOrder(myOrders[0]);
    }
  }, [isMyOrderListFetched, myOrders]);

  useEffect(() => {
    if(myOrders?.length === 1 && selectedOrder && !selectedOrder.isNeedTopup) {

    }
  }, [selectedOrder]);

  const requestBuyApp = () => {
    try {
      setSubmitting(true);
    } catch (e) {

    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box>
      {
        isMyOrderListFetched ? (
          <>
            {
              myOrders?.length === 0 ? (
                <>
                  <Text>Please <Text as={"a"} href={`${PRICING}`} textDecoration={"underline"}>buy</Text> a ZK Rollup chain.</Text>
                </>
              ) : (
                <>
                  {
                    myOrders?.length >= 1 && (
                      <Flex>
                        {myOrders?.map(order => {
                          return (
                            <Button
                              border={selectedOrder?.chainId === order?.chainId ? `1px solid red` : 'none'}
                              onClick={() => {
                                setSelectedOrder(order);
                              }}>{order?.chainName}</Button>
                          )
                        })}
                      </Flex>
                    )
                  }
                  {
                    selectedOrder?.isNeedTopup && (
                      <>
                        {
                          myOrders?.length === 1 ? (
                            <Text>You have a pending payment for an order. Please <Text as={"a"} href={`${ROLLUPS}`} textDecoration={"underline"}>complete the payment</Text>.</Text>
                          ) : (
                            <Text>This chain you haven't pay yet. Please <Text as={"a"} href={`${ROLLUPS}`} textDecoration={"underline"}>complete the payment</Text>.</Text>
                          )
                        }
                      </>
                    )
                  }
                  <Button onClick={requestBuyApp} isDisabled={selectedOrder?.isNeedTopup || submitting} isLoading={submitting}>Install</Button>
                </>
              )
            }
            {
              submitting && (
                <Flex className={s.loadingContainer}>
                  <Loading />
                </Flex>
              )
            }
          </>
        ) : (
          <Flex className={s.loadingContainer}>
            <Loading />
          </Flex>
        )
      }
    </Box>
  );
};

export default SettingView;
