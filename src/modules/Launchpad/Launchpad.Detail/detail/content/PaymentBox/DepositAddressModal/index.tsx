import AppLoading from '@/components/AppLoading';
import BaseModal from '@/components/BaseModal';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { depositAddressSelector } from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { getLocation } from '@/services/public-sale';
import { isProduction } from '@/utils/commons';
import { compareString } from '@/utils/string';
import { Flex } from '@chakra-ui/react';
import BigNumberJS from 'bignumber.js';
import cs from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DepositBanned from './Deposit.banned';
import DepositFromNaka from './Deposit.naka';
import styles from './styles.module.scss';

interface IProps {
  isShow: boolean;
  onClose: () => void;
  btcBalance: string;
  ethBalance: string;
  bvmBalance: string;
  isLoadedBTC: boolean;
  isLoadedETH: boolean;
  isLoadedBVM: boolean;
}

interface ICountry {
  country: string;
  name: string;
}

const COUNTRY_BANNED: ICountry[] = [
  {
    country: 'Belarus',
    name: 'BY',
  },
  {
    country: 'Cuba',
    name: 'CU',
  },
  {
    country: 'Iran',
    name: 'IR',
  },
  {
    country: 'Sudan',
    name: 'SD',
  },
  {
    country: 'Zimbabwe',
    name: 'ZW',
  },
  {
    country: 'North Korea',
    name: 'KP',
  },
  {
    country: 'United States',
    name: 'US',
  },
];

const DepositAddressModal = (props: IProps) => {
  const {
    isShow,
    onClose,
    btcBalance,
    ethBalance,
    bvmBalance,
    isLoadedETH,
    isLoadedBTC,
    isLoadedBVM,
  } = props;

  const { nakaAddress } = useNakaAuthen();
  const address = nakaAddress;
  const [checkingLocation, setCheckingLocation] = useState(true);
  const [isBanned, setIsBanned] = useState(false);
  const [country, setCountry] = useState<ICountry | undefined>(undefined);

  const depositNakaState = React.useMemo(() => {
    const isLoading = !isLoadedBTC || !isLoadedETH || !isLoadedBVM;
    const isHasETH = new BigNumberJS(ethBalance).gt(0.03); // 105$
    const isHasBTC = new BigNumberJS(btcBalance).gt(0.0015); // 105$
    const isHasBVM = new BigNumberJS(bvmBalance).gt(20); // 105$
    const isShow = !isLoading && (isHasETH || isHasBTC || isHasBVM);
    let baseSymbol = isShow ? 'ETH' : '';

    if (isShow) {
      if (isHasBTC) {
        baseSymbol = 'BTC';
      } else if (isHasBVM) {
        baseSymbol = 'BVM';
      }
    }
    return {
      isLoading,
      isShow,
      baseSymbol,
    };
  }, [btcBalance, isLoadedBTC, ethBalance, isLoadedETH]);

  const depositAddress = useSelector(depositAddressSelector)(address);

  const checkLocation = async () => {
    try {
      const country_code = await getLocation();
      console.log('checkLocation: ', country_code);

      if (isProduction()) {
        COUNTRY_BANNED.push({
          country: 'Vietnam',
          name: 'VN',
        });
      }

      const banned = COUNTRY_BANNED.find((country) =>
        compareString(country.name, country_code),
      );
      setCountry(banned);
      setIsBanned(Boolean(banned));
    } catch (error) {
      console.log('checkLocation: error', error);
      // TODO
    } finally {
      setCheckingLocation(false);
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  const renderContent = () => {
    if (
      checkingLocation ||
      !depositAddress ||
      (!depositAddress.depositNaka.length &&
        !depositAddress.depositExternal.length) ||
      depositNakaState.isLoading
    ) {
      return <AppLoading />;
    }

    if (isBanned) {
      return <DepositBanned country={country?.country as any} />;
    }

    return (
      <Flex flexDirection="column">
        {depositNakaState.isShow && (
          <DepositFromNaka
            baseSymbol={depositNakaState.baseSymbol}
            ethBalance={ethBalance}
            btcBalance={btcBalance}
            bvmBalance={bvmBalance}
          />
        )}
        {/* <DepositExternal /> */}
      </Flex>
    );
  };

  return (
    <BaseModal
      isShow={isShow}
      onHide={onClose}
      size="small"
      className={cs(styles.modalBox, {
        [styles.modalBox__banned as string]: isBanned,
      })}
      title="Deposit from an external wallet or exchanges"
      headerClassName={styles.modalHeader}
    >
      {renderContent()}
    </BaseModal>
  );
};

export default DepositAddressModal;
