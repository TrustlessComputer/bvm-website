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
import useOrderFormStoreV3 from '../../stores/index_v3';
import { formValuesAdapter } from './FormValuesAdapter';

const LaunchButton = ({
  data,
}: {
  data:
    | (IModelCategory & {
        options: {
          value: any;
          label: string;
          disabled: boolean;
        }[];
      })[]
    | null;
}) => {
  const { field, priceBVM, priceUSD } = useOrderFormStoreV3();
  const { loggedIn, login } = useWeb3Auth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { computerNameField, chainIdRandom } = useBuy();
  const [isSubmiting, setSubmitting] = useState(false);
  const { hasError } = computerNameField;

  const { chainName, dataAvaibilityChain, gasLimit, network, withdrawPeriod } =
    useOrderFormStore();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Hacker;

  const { availableListFetching, availableList } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const isFecthingData = useMemo(() => {
    return availableListFetching || !availableList;
  }, [availableListFetching, availableList]);

  const allFilled = useMemo(() => {
    return (
      !!chainName.trim() &&
      data?.every((item) => {
        return (
          (field[item.key].dragged && item.required) ||
          item.disable ||
          !item.required
        );
      })
    );
  }, [chainName, field]);

  const tierData = useMemo(() => {
    const packageData = availableList?.package['2'];
    const result = packageData?.filter((item) => {
      return item.value === Number(packageParam);
    });

    return result ? result[0] : undefined;
  }, [isFecthingData, availableList, packageParam]);

  const handleOnClick = async () => {
    if (isSubmiting || !allFilled || hasError || !data) return;
    if (!loggedIn) return login();

    setSubmitting(true);

    let isSuccess = false;
    const form: FormOrder = {
      chainName,
      network,
      dataAvaibilityChain,
      gasLimit,
      withdrawPeriod,
    };

    // TODO
    const dynamicForm: any[] = [];
    for (const _field of data) {
      if (!field[_field.key].dragged) continue;

      const value = _field.options.find(
        (opt) => opt.key === field[_field.key].value,
      );

      const { options: _, ...rest } = _field;

      dynamicForm.push({
        ...rest,
        value: !field[_field.key].dragged ? null : value,
      });
    }

    console.log('[LaunchButton] handleOnClick -> dynamicForm :: ', dynamicForm);

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
            <p className={s.price}>
              ${priceUSD.toFixed(2)}
              {'/'}Month {'('}
              {priceBVM.toFixed(2)} BVM
              {')'}
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default LaunchButton;
