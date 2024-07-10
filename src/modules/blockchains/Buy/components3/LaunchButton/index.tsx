import React, { useMemo, useState } from 'react';

import ImagePlaceholder from '@/components/ImagePlaceholder';

import s from './styles.module.scss';
import { FormOrder, ORDER_FIELD, useFormOrderStore } from '../../stores';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { CustomizeParams, registerOrderHandler } from '../../Buy.services';
import {
  setShowAllChains,
  setViewMode,
  setViewPage,
} from '@/stores/states/l2services/reducer';
import sleep from '@/utils/sleep';
import { Spinner } from '@chakra-ui/react';
import { useOrderFormStore } from '../../stores/index_v2';

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];

const LaunchButton = () => {
  const { loggedIn, login } = useWeb3Auth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { computerNameField, chainIdRandom } = useBuy();
  const [isSubmiting, setSubmitting] = useState(false);
  const { hasError } = computerNameField;
  // const { field, setForm } = useFormOrderStore((state) => state);
  const {
    chainName,
    dataAvaibilityChain,
    gasLimit,
    network,
    withdrawPeriod,
    isDataAvailabilityChainDragged,
    isNetworkDragged,
    isGasLimitDragged,
    isWithdrawPeriodDragged,
  } = useOrderFormStore();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Hacker;

  const { availableListFetching, availableList } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const isFecthingData = useMemo(() => {
    return availableListFetching || !availableList;
  }, [availableListFetching, availableList]);

  // const allFilled = Object.keys(field).every((key) => {
  // const { value } = field[key as Override];
  // const isString = typeof value === 'string';
  // return field[key as Override].dragged && (isString ? value.trim() : value);
  // });
  const allFilled = useMemo(() => {
    return !!(
      isDataAvailabilityChainDragged &&
      isNetworkDragged &&
      isGasLimitDragged &&
      isWithdrawPeriodDragged &&
      chainName.trim()
    );
  }, [
    isDataAvailabilityChainDragged,
    isNetworkDragged,
    isGasLimitDragged,
    isWithdrawPeriodDragged,
    chainName,
  ]);

  console.log('allFilled', allFilled);
  const tierData = useMemo(() => {
    const packageData = availableList?.package['2'];
    const result = packageData?.filter((item, index) => {
      return item.value === Number(packageParam);
    });

    return result ? result[0] : undefined;
  }, [isFecthingData, availableList, packageParam]);

  // if (isFecthingData) return null;

  const handleOnClick = async () => {
    if (!loggedIn) return login();

    if (isSubmiting || !allFilled || hasError) return;

    const form: FormOrder = {
      chainName,
      network,
      dataAvaibilityChain,
      gasLimit,
      withdrawPeriod,
    };

    console.log('[LaunchButton] handleOnClick -> form :: ', form);

    setSubmitting(true);

    let isSuccess = false;

    try {
      const params: CustomizeParams = {
        pricingPackage: Number(packageParam) as PRICING_PACKGE,
        chainID: chainIdRandom,
        chainName: form.chainName,
        dataAvaibilityChain: form.dataAvaibilityChain,
        gasLimit: form.gasLimit,
        network: form.network,
        withdrawPeriod: form.withdrawPeriod,
      };

      console.log('[LaunchButton] CustomizeParams ->  :: ', params);

      const result = await registerOrderHandler(params);
      if (result) {
        isSuccess = true;
      }
    } catch (error) {
      console.log('ERROR: ', error);
      isSuccess = false;
    } finally {
      dispatch(setViewMode('Mainnet'));
      dispatch(setViewPage('ManageChains'));
      dispatch(setShowAllChains(false));

      await sleep(1);

      if (isSuccess) {
        router.push('/rollups');
      } else {
        router.push('/rollups?hasOrderFailed=true');
      }
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`${s.launch} ${allFilled ? s.active : ''}`}
      onClick={handleOnClick}
    >
      <div className={s.inner}>
        {isSubmiting ? (
          <Spinner color="#fff" />
        ) : (
          <React.Fragment>
            <div className={s.top}>
              <p>Launch</p>
              <div className={`${s.icon}`}>
                <ImagePlaceholder
                  src={'/launch.png'}
                  alt={'launch'}
                  width={48}
                  height={48}
                />
              </div>
            </div>
            <p className={s.price}>{`${tierData?.price || '--'} (${
              tierData?.priceNote || '--'
            })`}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default LaunchButton;
