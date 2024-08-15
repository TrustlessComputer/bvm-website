import React, { useEffect, useMemo, useState } from 'react';

import ImagePlaceholder from '@/components/ImagePlaceholder';

import useL2Service from '@/hooks/useL2Service';
import useSubmitStaking from '@/modules/blockchains/Buy/components3/LaunchButton/onSubmitStaking';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import TopupModal from '@/modules/blockchains/components/TopupModa_V2';
import { DappType } from '@/modules/blockchains/dapp/types';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { orderBuyAPI_V3, orderUpdateV2 } from '@/services/api/l2services';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  getL2ServicesStateSelector,
  getOrderDetailSelected,
} from '@/stores/states/l2services/selector';
import { IModelOption } from '@/types/customize-model';
import { getErrorMessage } from '@/utils/errorV2';
import { formatCurrencyV2 } from '@/utils/format';
import sleep from '@/utils/sleep';
import { Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { getChainIDRandom } from '../../Buy.helpers';
import useFormDappToFormChain from '../../hooks/useFormDappToFormChain';
import useOneForm from '../../hooks/useOneForm';
import PreviewLaunchModal from '../../Preview';
import { FormOrder } from '../../stores';
import { useOrderFormStore } from '../../stores/index_v2';
import useOrderFormStoreV3 from '../../stores/index_v3';
import { chainKeyToDappKey } from '../../utils';
import ErrorModal from '../ErrorModal';
import { formValuesAdapter } from './FormValuesAdapter';
import useSubmitFormAirdrop from './onSubmitFormAirdrop';
import s from './styles.module.scss';
import useSubmitFormTokenGeneration from './useSubmitFormTokenGeneration';
import { setOrderSelected } from '@/stores/states/l2services/reducer';

const isExistIssueTokenDApp = (dyanmicFormAllData: any[]): boolean => {
  const inssueTokenDappList = dyanmicFormAllData
    .filter((item: any) => !item.isChain)
    .filter(
      (dapp: any) => dapp.options[0].key?.toLowerCase() === 'create_token',
    );

  const isExistIssueTokenDApp =
    inssueTokenDappList && inssueTokenDappList.length > 0;

  console.log('inssueTokenDappList ----- ', inssueTokenDappList);
  console.log('isExistIssueTokenDApp ----- ', isExistIssueTokenDApp);

  return isExistIssueTokenDApp;
};

const isExistAA = (dyanmicFormAllData: any[]): boolean => {
  const isExistAAList = dyanmicFormAllData
    .filter((item: any) => !item.isChain)
    .filter(
      (dapp: any) =>
        dapp.options[0].key?.toLowerCase() === 'account_abstraction',
    );

  const isExist = isExistAAList && isExistAAList.length > 0;
  return isExist;
};

const LaunchButton = ({ isUpdate }: { isUpdate?: boolean }) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [dyanmicFormAllData, setDyanmicFormAllData] = useState<any[]>([]);

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
  const { isCanConfigAA, configAAHandler, checkTokenContractAddress } =
    useAAModule();

  const [isShowError, setShowError] = useState(false);
  const [missingRequiredForTitles, setMissingRequiredForTitles] = useState<
    string[]
  >([]);

  const { showContactUsModal } = useContactUs();
  const { retrieveFormsByDappKey } = useOneForm();
  const { isUpdateFlow, isOwnerChain } = useChainProvider();

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

  const { onSubmitStaking } = useSubmitStaking();
  const { onSubmitAirdrop } = useSubmitFormAirdrop();
  const { onSubmitTokenGeneration } = useSubmitFormTokenGeneration();

  const { chainName, dataAvaibilityChain, gasLimit, network, withdrawPeriod } =
    useOrderFormStore();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('use-case') || PRICING_PACKGE.Hacker;

  const isDisabledBtn = useMemo(() => {
    return isUpdateFlow && !isOwnerChain;
  }, [isUpdateFlow, isOwnerChain]);

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
    const getChainIDRandomFunc = async () => {
      try {
        const chainIDRandom = await getChainIDRandom();
        setChainId(String(chainIDRandom));
      } catch (error) {}
    };
    getChainIDRandomFunc();
  }, []);

  const configAccountAbstraction = (dyanmicFormAllData: any[]) => {
    try {
      const isExist = isExistAA(dyanmicFormAllData);
      if (isExist) {
        if (isCanConfigAA) {
          console.log('[configAccountAbstraction]: Config Called');
          configAAHandler();
        } else {
          console.log('[configAccountAbstraction]: Form Error: ');
          checkTokenContractAddress();
        }
      }
    } catch (error) {
      console.log('[configAccountAbstraction]: ERROR: ', error);
    }
  };

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

  const getDynamicForm = () => {
    if (!originalData)
      return {
        dynamicForm: [],
        allOptionKeyDragged: [],
        allRequiredForKey: [],
        optionMapping: {},
      };

    const dynamicForm = [];
    const optionMapping: Record<string, IModelOption> = {};
    const allOptionKeyDragged: string[] = [];
    const allRequiredForKey: string[] = [];

    for (const _field of originalData) {
      if (!_field.isChain && _field.key !== 'bridge_apps') continue;

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

    return {
      dynamicForm,
      allOptionKeyDragged,
      allRequiredForKey,
      optionMapping,
    };
  };

  const onUpdateHandler = async () => {
    // if (isDisabledBtn) {
    //   return;
    // }

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

    const { dynamicForm } = getDynamicForm();

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
    const stakingForms = retrieveFormsByDappKey({
      dappKey: DappType.staking,
    });

    const airdropForms = retrieveFormsByDappKey({
      dappKey: DappType.airdrop,
    });

    const tokensForms = retrieveFormsByDappKey({
      dappKey: DappType.token_generation,
    });

    console.log('UPDATE FLOW: --- dynamicForm --- ', dynamicForm);
    console.log('LEON LOG: 111', airdropForms);
    try {
      // Update and Call API install (behind the scene form BE Phuong)
      const result = await orderUpdateV2(params, orderDetail.orderId);
      if (result) {
        //Config Account Abstraction...
        configAccountAbstraction(dynamicForm);
        let isConfigDapp = false;
        //Staking...
        if (stakingForms && stakingForms.length > 0) {
          await onSubmitStaking({
            forms: stakingForms,
          });
          isConfigDapp = true;
        } else if (airdropForms && airdropForms.length > 0) {
          await onSubmitAirdrop({ forms: airdropForms });
          isConfigDapp = true;
        } else if (tokensForms && tokensForms.length > 0) {
          await onSubmitTokenGeneration({ forms: tokensForms });
          isConfigDapp = true;
        }

        if (isConfigDapp) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }

        // TO DO [Leon]
        // Call API Config DApp if is exist dapp (issues token, staking, ....) daragged into Data View

        // try {
        //   // const res =  await ...
        // } catch (error) {}

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

  const onLaunchExecute = async () => {
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
      dynamicFormValues: dyanmicFormAllData,
    });

    let result;
    try {
      result = await orderBuyAPI_V3(params);
      if (result) {
        // if (isExistIssueTokenDApp(dyanmicFormAllData)) {
        // -----------------------------------------------------------
        //   If exist Issue Token dAPP have been dragged!
        //   TODO[Leon] Call API install Issues Token after call API install Chain be succeed! )
        //   const resultIssusToken = await API.[Call Install Issues Token]
        // -----------------------------------------------------------
        // try {
        //   await onSubmitStaking({
        //     forms: stakingForms,
        //   });
        //   isSuccess = true;
        // } catch (error) {
        //   console.log('ERROR: ', error);
        // }
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
      } else {
        toast.error(message || 'Something went wrong');
      }
    } finally {
      if (isSuccess) {
        toast.success('Submit Successful');
        const orderId = result.orderId;
        getOrderDetailByID(orderId);

        await sleep(1);

        router.push(`/chains/${orderId}`);
      } else {
        // router.push('/rollups?hasOrderFailed=true');
      }
      setSubmitting(false);
    }
  };

  const onLaunchCallbackHandler = () => {
    setShowPreviewModal(false);
    onLaunchExecute();
  };

  const onLaunchHandler = async () => {
    // =======================================================================================
    // Dapp forms
    // =======================================================================================
    const issueATokenForms = retrieveFormsByDappKey({
      dappKey: 'token_generation',
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
    const {
      dynamicForm,

      allOptionKeyDragged,
      allRequiredForKey,
      optionMapping,
    } = getDynamicForm();

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

    setDyanmicFormAllData(dynamicForm);
    setShowPreviewModal(true);
  };

  return (
    <>
      <div
        className={`${s.launch} ${s.active} ${
          isDisabledBtn ? s.disabled : undefined
        }`}
        onClick={() => {
          if (!loggedIn) {
            login();
            return;
          }
          if (isUpdate) {
            onUpdateHandler();
          } else {
            onLaunchHandler();
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
              accountInforL2Service?.topupWalletAddress || '--'
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
      {showPreviewModal && (
        <PreviewLaunchModal
          show={showPreviewModal}
          onClose={() => {
            setShowPreviewModal(false);
          }}
          onLaunchCallback={onLaunchCallbackHandler}
          data={dyanmicFormAllData}
        />
      )}
    </>
  );
};

export default LaunchButton;
