import React, { useEffect, useMemo, useState } from 'react';

import ImagePlaceholder from '@/components/ImagePlaceholder';

import s from './styles.module.scss';
import { FormOrder } from '../../stores';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  getL2ServicesStateSelector,
  getOrderDetailSelected,
} from '@/stores/states/l2services/selector';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import sleep from '@/utils/sleep';
import { Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useOrderFormStore } from '../../stores/index_v2';
import useOrderFormStoreV3 from '../../stores/index_v3';
import { formValuesAdapter } from './FormValuesAdapter';
import { getChainIDRandom } from '../../Buy.helpers';
import { orderBuyAPI_V3, orderUpdateV2 } from '@/services/api/l2services';
import { getErrorMessage } from '@/utils/errorV2';
import TopupModal from '@/modules/blockchains/components/TopupModa_V2';
import useL2Service from '@/hooks/useL2Service';
import ErrorModal from '../ErrorModal';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { formatCurrencyV2 } from '@/utils/format';
import toast from 'react-hot-toast';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import { IModelCategory, IModelOption } from '@/types/customize-model';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import useOneForm from '../../hooks/useOneForm';
import useFormDappToFormChain from '../../hooks/useFormDappToFormChain';
import { chainKeyToDappKey } from '../../utils';
import onSubmitStaking from '@/modules/blockchains/Buy/components3/LaunchButton/onSubmitStaking';

const LaunchButton = ({ isUpdate }: { isUpdate?: boolean }) => {
  const { dappCount } = useFormDappToFormChain();

  const { parsedCategories: data, categories: originalData } =
    useModelCategoriesStore();

  const { field, priceBVM, priceUSD, needContactUs } = useOrderFormStoreV3();
  const { orderDetail } = useAppSelector(getOrderDetailSelected);
  const { loggedIn, login } = useWeb3Auth();
  const { accountInforL2Service, availableListFetching, availableList } =
    useAppSelector(getL2ServicesStateSelector);
  const { getOrderDetailByID } = useL2Service();
  const dispatch = useAppDispatch();

  const [isShowError, setShowError] = useState(false);
  const [missingRequiredForTitles, setMissingRequiredForTitles] = useState<
    string[]
  >([]);

  const { getAccountInfor } = useL2Service();
  const { showContactUsModal } = useContactUs();
  const { retrieveFormsByDappKey } = useOneForm();

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
  const packageParam = searchParams.get('use-case') || PRICING_PACKGE.Hacker;

  const titleButton = useMemo(() => {
    if (!loggedIn) {
      return 'Connect';
    }
    if (needContactUs) {
      return 'Contact Us';
    }
    if (isUpdate) {
      return 'Update';
    }
    return 'Launch';
  }, [loggedIn, isUpdate, needContactUs]);

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

  const onUpdateHandler = async () => {
    if (!allFilled) {
      setShowError(true);
    }

    if (
      isSubmiting ||
      !allFilled ||
      hasError ||
      !originalData ||
      !orderDetail
    ) {
      return;
    }

    const dynamicForm: any[] = [];
    for (const _field of originalData) {
      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        dynamicForm.push({
          ..._field,
          options: _field.options.filter((opt: IModelOption) =>
            (field[_field.key].value as string[])!.includes(opt.key),
          ),
        });
        continue;
      }

      const value = _field.options.find(
        (opt: IModelOption) => opt.key === field[_field.key].value,
      );

      const { options: _, ...rest } = _field;

      dynamicForm.push({
        ...rest,
        options: [value],
      });
    }

    if (needContactUs) {
      // showContactUsModal(dynamicForm as any);
      showContactUsModal({
        subjectDefault: 0,
        disableSelect: true,
        changeText: true,
        nodeConfigs: dynamicForm || [],
      });
      return;
    }

    setSubmitting(true);

    let isSuccess = false;

    const params = formValuesAdapter({
      computerName: orderDetail.chainName,
      chainId: orderDetail.chainId,
      dynamicFormValues: dynamicForm,
    });

    try {
      const result = await orderUpdateV2(params, orderDetail.orderId);
      if (result) {
        isSuccess = true;
        dispatch(setOrderSelected(result));
      }
    } catch (error) {
      console.log('ERROR: ', error);
      isSuccess = false;
      const { message } = getErrorMessage(error);
      // toast.error(message);
      if (message && message.toLowerCase().includes('insufficient balance')) {
        onOpenTopUpModal();
      } else {
        toast.error(message);
      }
    } finally {
      getOrderDetailByID(orderDetail.orderId);

      await sleep(1);
      if (isSuccess) {
        toast.success('Update Successful');
      }
      setSubmitting(false);
    }
  };

  const handleOnClick = async () => {
    // =======================================================================================
    // Dapp forms
    // =======================================================================================
    const issueATokenForms = retrieveFormsByDappKey({
      dappKey: 'token_generation',
    });

    const stakingForms = retrieveFormsByDappKey({
      dappKey: 'staking',
    });

    // =======================================================================================
    // Chain form
    // =======================================================================================
    if (!allFilled) {
      setShowError(true);
    }

    if (isSubmiting || !allFilled || hasError || !originalData) {
      return;
    }

    let missingRequiredFor = false;
    const dynamicForm: any[] = [];
    const optionMapping: Record<string, IModelOption> = {};
    const allOptionKeyDragged: string[] = [];
    const allRequiredForKey: string[] = [];

    for (const _field of originalData) {
      if (!_field.isChain) continue;

      _field.options.forEach((opt: IModelOption) => {
        optionMapping[opt.key] = opt;
      });

      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        const options = _field.options.filter((opt: IModelOption) =>
          (field[_field.key].value as string[])!.includes(opt.key),
        );
        options.forEach((opt: IModelOption) => {
          allOptionKeyDragged.push(opt.key);
          allRequiredForKey.push(...(opt.requiredFor || []));
        });

        dynamicForm.push({
          ..._field,
          options,
        });
        continue;
      }

      const value = _field.options.find(
        (opt: IModelOption) => opt.key === field[_field.key].value,
      );

      if (!value) continue;

      allOptionKeyDragged.push(value.key);
      allRequiredForKey.push(...(value.requiredFor || []));

      const { options: _, ...rest } = _field;

      dynamicForm.push({
        ...rest,
        options: [value],
      });
    }

    for (const _field of originalData) {
      if (_field.isChain) continue;

      for (const opt of _field.options) {
        if (dappCount[chainKeyToDappKey(opt.key)]) {
          const opts = new Array(dappCount[chainKeyToDappKey(opt.key)]).fill(
            opt,
          );

          const fieldAlreadyInDynamicForm = dynamicForm.find(
            (field) => field.key === _field.key,
          );

          if (fieldAlreadyInDynamicForm) {
            fieldAlreadyInDynamicForm.options.push(...opts);
          } else {
            dynamicForm.push({
              ..._field,
              options: opts,
            });
          }
        }
      }
    }

    console.log(
      '🚀 -> file: index.tsx:260 -> handleOnClick -> dynamicForm ::',
      dynamicForm,
    );

    allRequiredForKey.forEach((key) => {
      if (!allOptionKeyDragged.includes(key)) {
        missingRequiredFor = true;
      }
    });

    if (missingRequiredFor) {
      setShowError(true);
      setMissingRequiredForTitles(
        allRequiredForKey.map((key) => optionMapping[key].title),
      );
      return;
    }

    if (needContactUs) {
      // showContactUsModal(dynamicForm as any);
      showContactUsModal({
        subjectDefault: 0,
        disableSelect: true,
        changeText: true,
        nodeConfigs: dynamicForm || [],
      });
      return;
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

    const params = formValuesAdapter({
      computerName: computerNameField.value || '',
      chainId: chainId,
      dynamicFormValues: dynamicForm,
    });

    try {
      const result = await orderBuyAPI_V3(params);
      if (result) {
        // if (ID Issuse Token dAPP) {
        //   If exist Issue Token dAPP have been dragged!
        //   TODO[Leon] Call API install Issues Token after call API install Chain be succeed! )

        //   const resultIssusToken = await API.[Call Install Issues Token]
        // }

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
        router.push('/chains');
      } else {
        // router.push('/rollups?hasOrderFailed=true');
      }
      setSubmitting(false);
    }

    try {
      await onSubmitStaking({ forms: stakingForms });
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return (
    <>
      <div
        className={`${s.launch} ${s.active}`}
        onClick={() => {
          if (!loggedIn) {
            login();
            return;
          }
          if (isUpdate) {
            onUpdateHandler();
          } else {
            handleOnClick();
          }
        }}
      >
        <div className={s.inner}>
          {!loggedIn ? (
            <Text className={s.connect}>
              {titleButton}
              {needContactUs && (
                <img
                  src={'/icons/info-circle.svg'}
                  alt="icon"
                  width={24}
                  height={24}
                />
              )}
              {!needContactUs && (
                <div className={`${s.icon}`}>
                  <ImagePlaceholder
                    src={'/launch.png'}
                    alt={'launch'}
                    width={48}
                    height={48}
                  />
                </div>
              )}
            </Text>
          ) : (
            <React.Fragment>
              <div className={s.top}>
                {isSubmiting ? <Spinner color="#fff" /> : <p>{titleButton}</p>}

                {needContactUs && (
                  <img
                    src={'/icons/info-circle.svg'}
                    alt="icon"
                    width={24}
                    height={24}
                  />
                )}

                {!needContactUs && (
                  <div className={`${s.icon}`}>
                    <ImagePlaceholder
                      src={'/launch.png'}
                      alt={'launch'}
                      width={48}
                      height={48}
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
          {needContactUs && (
            <div className={s.tooltip}>
              You've chosen Optimistic Rollup for your blockchain. The price of
              this module can vary. Please contact us to discuss further and get
              it set up.
            </div>
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
          balanceNeedTopup={`${formatCurrencyV2({
            amount: priceBVM,
            decimals: 0,
          })} BVM `}
        />
      )}
      <ErrorModal
        title="Missing Required Modules"
        show={isShowError}
        onHide={() => {
          setShowError(false);
          setMissingRequiredForTitles([]);
        }}
        closeText="Retry"
        className={s.modalError}
      >
        <ul className={s.fields}>
          {data?.map((item) => {
            if (!item.required || field[item.key].dragged) return null;

            return (
              <li key={item.key} className={s.fields__field}>
                {item.title}
              </li>
            );
          })}
          {missingRequiredForTitles.map((title) => (
            <li key={title} className={s.fields__field}>
              {title}
            </li>
          ))}
        </ul>
      </ErrorModal>
    </>
  );
};

export default LaunchButton;
