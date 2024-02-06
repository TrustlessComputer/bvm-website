import { Button, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import HorizontalItem from '@/components/HorizontalItem';
import React from 'react';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { ellipsisCenter, formatCurrency, formatString } from '@/utils/format';
import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { isAddress } from '@ethersproject/address';
import { validate } from 'bitcoin-address-validation';
import { removeUserToken } from '@/stores/states/user/reducer';
import { checkIsEndPublicSale } from '@/modules/Whitelist/utils';

const ContributorInfo = ({ data }: {data?: ILeaderBoardPoint}) => {
  const user = useAppSelector(userSelector)
  const isEVM = isAddress(user?.twitter_id || "");
  const isBTC = validate(user?.twitter_id || "");

  const isEnded = React.useMemo(() => checkIsEndPublicSale(), [])

  const dispatch = useAppDispatch()
  const onDisconnect = () => {
    dispatch(removeUserToken())
    setTimeout(() => window.location.reload(), 300)
  }

  return (
    <Flex direction={'column'} w={'284px'} gap={3} className={s.container}>
      {!!user && (isEVM || isBTC) ? (
        <HorizontalItem className={s.rowData} color={"#000000"} label="ADDRESS" value={formatString(user?.twitter_id, isEVM ? 6 : 8, '')} />
      ) : (
        <HorizontalItem className={s.rowData} color={"#000000"} label={'USER'} value={formatString(data?.twitter_name, 16)} />
      )}
      <HorizontalItem className={s.rowData} color={"#000000"} label={'RANK'} value={formatCurrency(data?.ranking, 0, 0, 'BTC', true)} />
      {isEnded && (
        <HorizontalItem className={s.rowData} color={"#000000"} label={'ALLOCATION'} value={
          <Flex flexDir="column" gap="2px">
            <Text>
              {formatCurrency(data?.bvm_balance, MIN_DECIMAL, MIN_DECIMAL)} BVM
            </Text>
            <Text>
              {formatCurrency(Number(data?.bvm_percent) * 100, MIN_DECIMAL, MIN_DECIMAL)}%
            </Text>
          </Flex>
        } />
      )}
      <Button onClick={onDisconnect} bg="black" color="white" borderRadius="0px" fontWeight="400" mt="12px" _hover={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
        Disconnect
      </Button>
    </Flex>
  );
};

export default ContributorInfo;
