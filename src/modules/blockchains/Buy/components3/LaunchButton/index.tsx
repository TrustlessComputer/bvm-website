import React, { useEffect, useMemo, useState } from 'react';

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
import { Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useOrderFormStore } from '../../stores/index_v2';
import useOrderFormStoreV3 from '../../stores/index_v3';
import { formValuesAdapter } from './FormValuesAdapter';
import { getChainIDRandom } from '../../Buy.helpers';
import { orderBuyAPI_V3 } from '@/services/api/l2services';
import { getErrorMessage } from '@/utils/errorV2';
import toast from 'react-hot-toast';
import TopupModal from '@/modules/blockchains/components/TopupModa_V2';
import useL2Service from '@/hooks/useL2Service';

const LaunchButton = ({
  data,
  originalData,
}: {
  data:
    | (IModelCategory & {
        options: IModelCategory['options'] &
          {
            value: any;
            label: string;
            disabled: boolean;
          }[];
      })[]
    | null;
  originalData: IModelCategory[] | null;
}) => {
  const { field, priceBVM, priceUSD } = useOrderFormStoreV3();
  const { loggedIn, login } = useWeb3Auth();
  const { accountInforL2Service, availableListFetching, availableList } =
    useAppSelector(getL2ServicesStateSelector);

  const { getAccountInfor } = useL2Service();

  const router = useRouter();
  const { computerNameField, chainIdRandom } = useBuy();
  const [isSubmiting, setSubmitting] = useState(false);
  const { hasError } = computerNameField;

  const [chainId, setChainId] = useState('');

  const {
    isOpen: isOpenTopUpModal,
    onOpen: onOpenTopUpModal,
    onClose: onCloseTopUpModal,
  } = useDisclosure({
    id: 'MODAL_TOPUP',
  });

  const { chainName, dataAvaibilityChain, gasLimit, network, withdrawPeriod } =
    useOrderFormStore();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Hacker;

  useEffect(() => {
    if (loggedIn) {
      getAccountInfor();
    }
  }, [loggedIn]);

  useEffect(() => {
    const getChainIDRandomFunc = async () => {
      try {
        const chainIDRandom = await getChainIDRandom();
        setChainId(String(chainIDRandom));
      } catch (error) {}
    };
    getChainIDRandomFunc();
  }, []);

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
    if (isSubmiting || !allFilled || hasError || !originalData) return;

    const dynamicForm: any[] = [];
    for (const _field of originalData) {
      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        dynamicForm.push({
          ..._field,
          options: _field.options.filter((opt) =>
            (field[_field.key].value as string[])!.includes(opt.key),
          ),
        });
        continue;
      }

      const value = _field.options.find(
        (opt) => opt.key === field[_field.key].value,
      );

      const { options: _, ...rest } = _field;

      dynamicForm.push({
        ...rest,
        options: [value],
      });
    }

    if (!loggedIn) {
      localStorage.setItem('bvm.customize-form', JSON.stringify(dynamicForm));

      return login();
    }

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

    const params = formValuesAdapter({
      computerName: computerNameField.value || '',
      chainId: chainId,
      dynamicFormValues: dynamicForm,
    });

    try {
      const result = await orderBuyAPI_V3(params);
      if (result) {
        isSuccess = true;
      }
    } catch (error) {
      console.log('ERROR: ', error);
      isSuccess = false;
      const { message } = getErrorMessage(error);
      // toast.error(message);
      if (message && message.toLowerCase().includes('insufficient balance')) {
        onOpenTopUpModal();
      }
    } finally {
      // dispatch(setViewMode('Mainnet'));
      // dispatch(setViewPage('ManageChains'));
      // dispatch(setShowAllChains(false));
      await sleep(1);
      if (isSuccess) {
        router.push('/rollups');
      } else {
        // router.push('/rollups?hasOrderFailed=true');
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        className={`${s.launch} ${allFilled ? s.active : ''}`}
        onClick={handleOnClick}
      >
        <div className={s.inner}>
          {!loggedIn ? (
            <Text className={s.connect}>Launch</Text>
          ) : (
            <React.Fragment>
              <div className={s.top}>
                {isSubmiting ? <Spinner color="#fff" /> : <p>Launch</p>}
                <div className={`${s.icon}`}>
                  <ImagePlaceholder
                    src={'/launch.png'}
                    alt={'launch'}
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      {isOpenTopUpModal && (
        <TopupModal
          show={isOpenTopUpModal}
          infor={{
            paymentAddress: `${
              accountInforL2Service?.topUpWalletAddress || '--'
            }`,
          }}
          onClose={onCloseTopUpModal}
          onSuccess={async () => {}}
          // balanceNeedTopup={`${tierData?.priceNote || '--'}`}
          balanceNeedTopup={`${priceBVM.toFixed(2) || '--'} BVM `}
        />
      )}
    </>
  );
};

export default LaunchButton;
