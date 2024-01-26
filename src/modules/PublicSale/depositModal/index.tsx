import BaseModal from '@/components/BaseModal';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { QRCode } from 'react-qrcode-logo';
import s from './styles.module.scss';
import { formatCurrency } from '@/utils/format';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import BigNumber from 'bignumber.js';

const DepositModal = ({ isShow, onHide, saleWalletInfo, payAmountUsd }: any) => {
  const coinPrices = useSelector(commonSelector).coinPrices;
  const btcPrice = useMemo(() => coinPrices?.['BTC'] || '0', [coinPrices]);
  const ethPrice = useMemo(() => coinPrices?.['ETH'] || '0', [coinPrices]);

  const payAmountBtc = useMemo(() => {
    return new BigNumber(payAmountUsd).dividedBy(btcPrice).toString();
  }, [payAmountUsd, btcPrice]);

  const payAmountEth = useMemo(() => {
    return new BigNumber(payAmountUsd).dividedBy(ethPrice).toString();
  }, [payAmountUsd, ethPrice]);

  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={'Deposit'}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
    >
      <div className={s.container}>
        <div className={s.content}>
          <Text className={s.desc}>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</Text>
          <Box className={s.qrWrapper}>
            <Flex gap={6} mt={4} w={'100%'} justifyContent={'space-between'}>
              <Flex direction={'column'} alignItems={'center'} gap={3}>
                <QRCode
                  size={130}
                  value={saleWalletInfo?.btc_address || ''}
                  logoImage={'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png'}
                />
                {payAmountUsd && <Text className={s.depositValue}>${formatCurrency(payAmountUsd, 0, 0, 'BTC', true)} ~ {formatCurrency(payAmountBtc, 4, 4)} BTC</Text>}
              </Flex>
              <Flex direction={'column'} alignItems={'center'} gap={3}>
                <QRCode
                  size={130}
                  value={saleWalletInfo?.eth_address || ''}
                  logoImage={'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'}
                />
                {payAmountUsd && <Text className={s.depositValue}>${formatCurrency(payAmountUsd, 0, 0, 'BTC', true)} ~ {formatCurrency(payAmountEth, 4, 4)} ETH</Text>}
              </Flex>
            </Flex>
          </Box>
        </div>
      </div>
    </BaseModal>
  );
};

export default DepositModal;
