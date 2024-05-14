import AppLoading from '@/components/AppLoading';
import SvgInset from '@/components/SvgInset';
import { compareString } from '@/utils/string';
import { Center, Flex, SimpleGrid } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import s from './styles.module.scss';
import DepositSubmitHash from './Deposit.submitHash';
import { DepositContentItem2 } from './Deposit.Item';
import CPaymentSWPAPI from '@/modules/Launchpad/services/payment.swp';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { useSelector } from 'react-redux';
import { depositAddressSelector } from '@/stores/states/user/selector';
import { WalletTokenDeposit } from '@/modules/Launchpad/services/launchpad.interfaces';

const DepositExternal = () => {
  const paymentSWPApi = useRef(new CPaymentSWPAPI()).current;
  const wallet = useAuthenticatedWallet();
  const address = wallet?.address;
  const depositAddress = useSelector(depositAddressSelector)(address);
  const { depositExternal } = React.useMemo(() => {
    return {
      depositNaka: depositAddress?.depositNaka || [],
      depositExternal: depositAddress?.depositExternal || [],
    };
  }, [depositAddress]);
  const [tokens] = useState<WalletTokenDeposit[]>(depositExternal || []);
  const [selectToken, setSelectToken] = useState<
    WalletTokenDeposit | undefined
  >(depositExternal ? depositExternal[0] : undefined);

  useEffect(() => {
    onRequestSolWallet();
  }, [selectToken]);

  const onRequestSolWallet = async () => {
    try {
      if (compareString(selectToken?.coin, 'SOL')) {
        await paymentSWPApi.requestSolWallet();
      }
    } catch (error) {
      //
    }
  };

  if (!depositExternal) {
    return (
      <Center>
        <AppLoading />
      </Center>
    );
  }

  return (
    <Flex className={s.depositContent}>
      <>
        <SimpleGrid className={s.tokenWrapper} columns={5}>
          {tokens.map((t) => (
            <DepositContentItem2
              key={t.coin}
              token={t}
              onSelectToken={(_token) => setSelectToken(_token)}
              isActive={compareString(t.coin, selectToken?.coin)}
            />
          ))}
        </SimpleGrid>
        {/* <Flex className={s.tokenWrapper}>
          {tokens.map((t) => (
            <DepositContentItem2
              key={t.coin}
              token={t}
              onSelectToken={(_token) => setSelectToken(_token)}
              isActive={compareString(t.coin, selectToken?.coin)}
            />
          ))}
        </Flex> */}

        {selectToken && (
          <Flex
            className={s.infoDepositWrap}
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Flex
              flexDirection="column"
              gap="20px"
              justifyContent="center"
              alignItems="center"
              width="100%"
              backgroundColor="ed"
            >
              <div className={s.addressBox}>
                <p className={s.addressBox_title}>
                  Please transfer any amount of{' '}
                  <strong>{selectToken.coin}</strong> to the following address.
                </p>
                <div className={s.addressBox_wapper}>
                  <p className={s.addressBox_wapper_address}>
                    {selectToken.address}
                  </p>
                  <SvgInset
                    onClick={() => {
                      copy(selectToken?.address || '');
                      toast.success('Address copied');
                    }}
                    svgUrl="/icons/ic-copy.svg"
                  />
                </div>
              </div>
              <Flex className={s.qrCodeContainer}>
                <QRCode size={184} value={selectToken?.address || ''} />
              </Flex>
            </Flex>
            <Flex className={s.networkBox}>
              <p className={s.networkBox_title}>Supported networks</p>
              <p className={s.networkBox_value}>
                {selectToken.network.join(', ')}
              </p>
            </Flex>
            {compareString(selectToken.coin, 'SOL') && <DepositSubmitHash />}
          </Flex>
        )}
      </>
      {/*{isShowWarningHardcap && <DepositWarning />}*/}
    </Flex>
  );
};

export default DepositExternal;
