import sleep from '@/utils/sleep';
import BigNumber from 'bignumber.js';
import { debounce, isEmpty } from 'lodash';
import React, {
  PropsWithChildren,
  createContext,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import {
  convertHoursToSeconds,
  dayDescribe,
  estimateDataFormater_V2,
  getRandonComputerName_VS2,
} from '../Buy/Buy.helpers';
import {
  BitcoinValidityEnum,
  BlockTimeEnum,
  BlockTimeEnumMap,
  ConfigurationOptionEnum,
  DALayerEnum,
  DALayerEnumMap,
  FormFields,
  FormFieldsErrorMessage,
  GAS_LITMIT,
  HardwareGrowth,
  MIN_GAS_PRICE,
  NativeTokenPayingGasEnum,
  NetworkEnum,
  NetworkEnumMap,
  PluginEnum,
  PricingPackageEnum,
  ProverEnum,
  RollupEnum,
  RollupEnumMap,
  STANDARD_VALUES,
  WITHDRAWAL_PERIOD,
  WITHDRAWAL_PERIOD_BOOTSTRAP,
} from '../Buy/Buy.constanst';
import {
  convertDayToSeconds,
  estimateDataFormater,
  getChainIDRandom,
} from '../Buy/Buy.helpers';
import { IAvailableList } from '../Buy/Buy.types';
import { BuyContextInit, IBuyContext } from './Buy.type';
import {
  IOrderBuyEstimateRespone,
  IOrderBuyEstimateRespone_V2,
  SubmitFormParams,
} from '@/services/api/l2services/types';
import { ServiceTypeEnum } from '../Buy/Buy.constanst';
import l2ServicesAPI, {
  estimateTotalCostAPI,
  estimateTotalCostAPI_V2,
  fetchAvailableList,
  orderBuyAPI,
  submitContactVS2,
} from '@/services/api/l2services';
import { useAppDispatch } from '@/stores/hooks';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import L2ServiceAuthStorage from '@/utils/storage/authV3.storage';
import { getErrorMessage } from '@/utils/errorV2';
import {
  setShowAllChains,
  setShowOnlyMyOrder,
  setViewMode,
  setViewPage,
} from '@/stores/states/l2services/reducer';
import { useRouter } from 'next/navigation';
import useL2Service from '@/hooks/useL2Service';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { IOrderBuyReq } from '@/stores/states/l2services/types';

export type IField = {
  value?: string;
  hasFocused?: boolean;
  hasError?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  ref?: any;
};

export const BuyContext = createContext<IBuyContext>(BuyContextInit);

export const BuyProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const dispatch = useAppDispatch();
  const {
    requestAccount,
    requestSignMessage,
    isAuthen: isNakaWalletAuthed,
    loading: isNakaWalletLoading,
    nakaAddress,
  } = useNakaAuthen();

  const router = useRouter();

  const accountInfo = true;
  const { fetchAllData, isL2ServiceLogged } = useL2Service();
  const { loggedIn, setShowLoginModalCustomize } = useWeb3Auth();

  // ------------------------------------------------------------
  // Text and TextArea Fields
  // ------------------------------------------------------------
  const [computerNameField, setComputerNameField] = useState<IField>({
    isRequired: true,
    errorMessage: FormFieldsErrorMessage[FormFields.COMPUTER_NAME],
    ref: createRef<HTMLElement>(),
  });

  const [computerDescriptionField, setComputerDescriptionField] =
    useState<IField>({
      isRequired: false,
      errorMessage: FormFieldsErrorMessage[FormFields.DESCRIPTION],
    });

  const [projectXField, setProjectXField] = useState<IField>({
    isRequired: false,
    errorMessage: FormFieldsErrorMessage[FormFields.PROJECT_X],
  });

  const [projectWebSiteField, setProjectWebSiteField] = useState<IField>({});

  const [yourXField, setYourXField] = useState<IField>({
    isRequired: true,
    errorMessage: FormFieldsErrorMessage[FormFields.YOUR_X_ACC],
    ref: createRef<HTMLElement>(),
  });

  const [yourTelegramField, setYourTelegramField] = useState<IField>({});

  const [minGasPriceField, setMinGasPriceField] = useState<IField>({
    isRequired: true,
    value: String(MIN_GAS_PRICE),
    errorMessage: FormFieldsErrorMessage[FormFields.MIN_GAS_PRICE],
    ref: createRef<HTMLElement>(),
  });

  const [blockGasLimitField, setBlockGasLimitField] = useState<IField>({
    isRequired: true,
    value: String(GAS_LITMIT),
    errorMessage: FormFieldsErrorMessage[FormFields.BLOCK_GAS_LIMIT],
    ref: createRef<HTMLElement>(),
  });

  const [tickerField, setTickerField] = useState<IField>({
    isRequired: true,
    value: '',
    errorMessage: FormFieldsErrorMessage[FormFields.TICKER],
    ref: createRef<HTMLElement>(),
  });

  const [totalSupplyField, setTotalSupplyField] = useState<IField>({
    isRequired: true,
    value: '',
    errorMessage: FormFieldsErrorMessage[FormFields.TOTAL_SUPPLY],
    ref: createRef<HTMLElement>(),
  });

  const [receivingAddressField, setReceivingAddressField] = useState<IField>({
    isRequired: true,
    value: '',
    errorMessage: FormFieldsErrorMessage[FormFields.RECEIVING_ADDRESS],
    ref: createRef<HTMLElement>(),
  });

  // ------------------------------------------------------------
  // Local State
  // ------------------------------------------------------------

  // const [networkSelected, setNetworkSelected] = useState<
  //   NetworkEnum | undefined
  // >(NetworkEnum.Network_Testnet);

  const [networkSelected, setNetworkSelected] = useState<
    NetworkEnum | undefined
  >(NetworkEnum.Network_Mainnet); // V2

  const [proverSelected, setProverSelected] = useState<ProverEnum | undefined>(
    ProverEnum.NO,
  ); // V2

  // const [rollupProtocolSelected, setRollupProtocolSelected] = useState<
  //   RollupEnum | undefined
  // >(RollupEnum.Rollup_OpStack);

  const [rollupProtocolSelected, setRollupProtocolSelected] = useState<
    RollupEnum | undefined
  >(RollupEnum.Rollup_ZK); // V2

  const [bitcoinValiditySelected, setBitcoinValiditySelected] = useState<
    BitcoinValidityEnum | undefined
  >(BitcoinValidityEnum.BitcoinValidity_Ordinals);
  const [dataValiditySelected, setDataValiditySelected] = useState<
    DALayerEnum | undefined
  >(DALayerEnum.DALayer_PLG);
  const [blockTimeSelected, setBlockTimeSelected] = useState<
    BlockTimeEnum | undefined
  >(BlockTimeEnum.BlockTime_1s);

  // const [withdrawalPeriodSelected, setWithdrawalPeriodSelected] =
  //   useState<number>(WITHDRAWAL_PERIOD);

  const [withdrawalPeriodSelected, setWithdrawalPeriodSelected] =
    useState<number>(WITHDRAWAL_PERIOD_BOOTSTRAP); // V2

  const [blockGasLimitSelected, setBlockGasLimitSelected] =
    useState<number>(GAS_LITMIT); // V2

  const [nativeTokenPayingGasSelected, setNativeTokenPayingGasSelected] =
    useState<number>(NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM);
  // const [configuratinOptionSelected, setConfiguratinOptionSelected] =
  //   useState<number>(ConfigurationOptionEnum.Standard);

  const [configuratinOptionSelected, setConfiguratinOptionSelected] =
    useState<number>(ConfigurationOptionEnum.Advanced); //Apply V2

  const [preInstallDAppSelected, setPreInstallDAppSelected] = useState<
    number[]
  >([PluginEnum.Plugin_Bridge]);
  const [chainIdRandom, setChainIdRandom] = useState<number>(0);

  // Modals
  const [isSubmiting, setSubmiting] = useState<boolean>(false);
  const [confirmSubmiting, setConfirmSubmiting] = useState<boolean>(false);

  const [showSubmitForm, setShowSubmitForm] = useState<boolean>(false);
  const [showSubmitFormResult, setShowSubmitFormResult] =
    useState<boolean>(false);

  const [showTopupModal, setShowTopupModal] = useState(false);
  const [showSendFormModal, setShowSendFormModal] = useState(false);

  // ------------------------------------------------------------
  // API DATA
  // ------------------------------------------------------------

  // AvailableList API Data
  const [availableListData, setAvailableListData] = useState<
    IAvailableList | undefined
  >(undefined);
  const [isAvailableListFetching, setAvailableListFetching] = useState(false);

  // EstimateFee API Data
  const [estimateTotalCostData, setEstimateTotalCostData] = useState<
    IOrderBuyEstimateRespone | undefined
  >(undefined);
  const [estimateTotalCostData_V2, setEstimateTotalCostData_V2] = useState<
    IOrderBuyEstimateRespone_V2 | undefined
  >(undefined);

  const [estimateTotalCostFetching, setEstimateTotalCostFetching] =
    useState(false);

  // ------------------------------------------------------------
  // Other State values
  // ------------------------------------------------------------
  const isMainnet = useMemo(
    () => !!(networkSelected === NetworkEnum.Network_Mainnet),
    [networkSelected],
  );

  const isStandardMode = useMemo(
    () => !!(configuratinOptionSelected === ConfigurationOptionEnum.Standard),
    [configuratinOptionSelected],
  );

  useEffect(() => {
    if (isStandardMode) {
      setRollupProtocolSelected(STANDARD_VALUES.rollupProtocol);
      setBitcoinValiditySelected(STANDARD_VALUES.bitcoinValidity);
      setDataValiditySelected(STANDARD_VALUES.dataAvailability);
      setBlockTimeSelected(STANDARD_VALUES.blockTime);
      setMinGasPriceField({
        ...minGasPriceField,
        value: String(STANDARD_VALUES.minGasPrice),
      });
      setBlockGasLimitField({
        ...blockGasLimitField,
        value: String(STANDARD_VALUES.blockGasLimit),
      });
      setWithdrawalPeriodSelected(STANDARD_VALUES.withdrawalPeriod);
      setNativeTokenPayingGasSelected(STANDARD_VALUES.nativeTokenPayingGas);
    }
  }, [isStandardMode]);

  useEffect(() => {
    if (isMainnet) {
      setDataValiditySelected(DALayerEnum.DALayer_PLG);
    }
  }, [isMainnet]);

  const orderBuyReq = useMemo(() => {
    const computerName = computerNameField.value || '';
    // const computerName = getRandonComputerName_VS2(isMainnet);
    // const finalizationPeriodSeconds = convertDayToSeconds(
    //   withdrawalPeriodSelected,
    // );
    const finalizationPeriodSeconds = convertHoursToSeconds(
      withdrawalPeriodSelected,
    ); //V2
    const chainID = chainIdRandom;
    const chainName = computerName;
    const domain = computerName?.toLowerCase()?.trim().replaceAll(' ', '-');
    const blockTime = blockTimeSelected || BlockTimeEnum.BlockTime_10s;
    const minGasPrice = new BigNumber(minGasPriceField.value || 2)
      .multipliedBy(1e9)
      .toFixed();
    const bitcoinValidity =
      bitcoinValiditySelected || BitcoinValidityEnum.BitcoinValidity_Ordinals;
    const dataAvaibilityChain = dataValiditySelected || DALayerEnum.DALayer_PLG;

    let params: IOrderBuyReq = {
      serviceType: RollupEnum.Rollup_OpStack, // hard code
      domain: domain,
      chainId: String(chainID), // random
      chainName: chainName,
      description: '', // hard code
      finalizationPeriod: Math.ceil(finalizationPeriodSeconds),
      blockTime: Number(blockTime),
      minGasPrice: minGasPrice,
      dataAvaibilityChain: Number(dataAvaibilityChain),
      isMainnet: isMainnet,
      pluginIds: [PluginEnum.Plugin_Bridge],
      nativeTokenPayingGas: nativeTokenPayingGasSelected,
      gasLimit: Number(blockGasLimitSelected) || GAS_LITMIT,
      bitcoinValidity: bitcoinValidity,
      twitter_id: yourXField.value?.trim(),
      prover: proverSelected || ProverEnum.NO,
      package: PricingPackageEnum.Growth,
    };

    if (
      nativeTokenPayingGasSelected ===
      NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint
    ) {
      params = {
        ...params,
        preMintAmount: new BigNumber(totalSupplyField.value || '0')
          .multipliedBy(1e18)
          .toFixed(),
        preMintAddress: receivingAddressField.value,
        ticker: tickerField.value,
      };
    }

    if (
      nativeTokenPayingGasSelected ===
      NativeTokenPayingGasEnum.NativeTokenPayingGas_BTC
    ) {
      params = {
        ...params,
        nativeTokenPayingGas:
          NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint,
        preMintAmount: new BigNumber(totalSupplyField.value || '21000000')
          .multipliedBy(1e18)
          .toFixed(),
        preMintAddress: receivingAddressField.value,
        ticker: tickerField.value || 'BTC',
      };
    }

    return params;
  }, [
    isMainnet,
    withdrawalPeriodSelected,
    chainIdRandom,
    blockTimeSelected,
    minGasPriceField,
    bitcoinValiditySelected,
    dataValiditySelected,
    nativeTokenPayingGasSelected,
    totalSupplyField,
    tickerField,
    receivingAddressField,
    computerNameField,
    proverSelected,
    blockGasLimitField,
  ]);

  const submitFormParams: SubmitFormParams = {
    bitcoinL2Name: computerNameField.value || '--',
    // bitcoinL2Name: getRandonComputerName_VS2(isMainnet) || '--',
    bitcoinL2Description: computerDescriptionField.value || '--',
    network: networkSelected
      ? `Bitcoin ${NetworkEnumMap[networkSelected]}`
      : '--',
    dataAvailability: dataValiditySelected
      ? DALayerEnumMap[dataValiditySelected]
      : '--',
    blockTime: blockTimeSelected ? BlockTimeEnumMap[blockTimeSelected] : '--',
    rollupProtocol: rollupProtocolSelected
      ? RollupEnumMap[rollupProtocolSelected]
      : '--',
    withdrawPeriod: withdrawalPeriodSelected
      ? `${dayDescribe(withdrawalPeriodSelected).str}`
      : '--',
    twName: yourXField.value || '--',
    telegram: yourTelegramField.value || '--',
    isContractUs: false,
    subject: '',
  };

  const onVerify = async (tcAddress: string) => {
    let isValid = false;
    try {
      const token = L2ServiceAuthStorage.getToken(tcAddress);
      if (token) {
        // this account is logged in
        const { isValid: validAPI } = await l2ServicesAPI.verifyAccessToken({
          tcAddress: token.tcAddress,
        });
        if (!validAPI) {
          // onRemoveAuthen(token.tcAddress);
          isValid = false;
        } else {
          // dispatch(setAuthen({ tcAddress: token.tcAddress, isAuthen: true }));
          // axiosSetAccessToken(token.accessToken);
          isValid = true;
        }
      }
    } catch (error) {
      const { message } = getErrorMessage(error, 'Failed to verify token');
      toast.error(message);
      // onRemoveAuthen(tcAddress);
      isValid = false;
    }

    return isValid;
  };

  const confirmBtnTitle = useMemo(() => {
    // if (!isNakaWalletAuthed) {
    //   return 'Connect';
    // }
    // if (isNeededRequestSignMessageFromNakaWallet) {
    //   return 'Connect';
    // } else if (isMainnet) {
    //   return 'Submit';
    // } else {
    //   return 'Submit';
    // }

    // return 'Submit';

    if (!loggedIn) {
      return 'Sign In';
    } else {
      return 'Launch';
    }
  }, [isMainnet, accountInfo, isNakaWalletAuthed, isL2ServiceLogged, loggedIn]);

  const fetchAvailableListHandler = async () => {
    try {
      setAvailableListFetching(true);
      const data = await fetchAvailableList();
      setAvailableListData(data);
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
      setAvailableListData(undefined);
    } finally {
      setAvailableListFetching(false);
    }
  };

  const fetchEstimateTotalCost = async (orderBuyReq: IOrderBuyReq) => {
    try {
      setEstimateTotalCostFetching(true);
      const result = await estimateTotalCostAPI(orderBuyReq);
      setEstimateTotalCostData(estimateDataFormater(result));
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    } finally {
      setEstimateTotalCostFetching(false);
    }
  };

  const fetchEstimateTotalCost_V2 = async (orderBuyReq: IOrderBuyReq) => {
    try {
      setEstimateTotalCostFetching(true);
      const result = await estimateTotalCostAPI_V2(orderBuyReq);
      // setEstimateTotalCostData_V2(estimateDataFormater_V2(result));
      setEstimateTotalCostData_V2(result);
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    } finally {
      setEstimateTotalCostFetching(false);
    }
  };

  const validateAllFormFields = () => {
    let isValid = true;
    let refElementErrorID = undefined;

    // Computer Name
    if (computerNameField.isRequired && isEmpty(computerNameField.value)) {
      isValid = false;
      setComputerNameField({
        ...computerNameField,
        hasFocused: true,
        hasError: true,
      });
      refElementErrorID = refElementErrorID || computerNameField.ref;
    }

    // Computer Description
    // if (computerDescriptionField.isRequired && isEmpty(computerDescriptionField.value)) {
    //   isValid = false;
    //   setComputerDescriptionField({ ...computerDescriptionField, hasFocused: true, hasError: true });
    // }

    // Computer Project X Account
    // if (projectXField.isRequired && isEmpty(projectXField.value)) {
    //   isValid = false;
    //   setProjectXField({ ...projectXField, hasFocused: true, hasError: true });
    // }

    // Your X Account
    if (yourXField.isRequired && isEmpty(yourXField.value)) {
      isValid = false;
      setYourXField({ ...yourXField, hasFocused: true, hasError: true });

      refElementErrorID = refElementErrorID || yourXField.ref;
    }

    // Min Gas Price
    if (minGasPriceField.isRequired && isEmpty(minGasPriceField.value)) {
      isValid = false;
      setMinGasPriceField({
        ...minGasPriceField,
        hasFocused: true,
        hasError: true,
      });

      refElementErrorID = refElementErrorID || minGasPriceField.ref;
    }

    // Gas Litmit
    // if (blockGasLimitField.isRequired && isEmpty(blockGasLimitField.value)) {
    //   isValid = false;
    //   setBlockGasLimitField({
    //     ...blockGasLimitField,
    //     hasFocused: true,
    //     hasError: true,
    //   });

    //   refElementErrorID = refElementErrorID || blockGasLimitField.ref;
    // }

    // Token Paying Gas (Custom Naitve Token)
    if (
      nativeTokenPayingGasSelected ===
      NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint
    ) {
      // Ticker
      if (tickerField.isRequired && isEmpty(tickerField.value)) {
        isValid = false;
        setTickerField({ ...tickerField, hasFocused: true, hasError: true });

        refElementErrorID = refElementErrorID || tickerField.ref;
      }

      // Total Supply
      if (totalSupplyField.isRequired && isEmpty(totalSupplyField.value)) {
        isValid = false;
        setTotalSupplyField({
          ...totalSupplyField,
          hasFocused: true,
          hasError: true,
        });
        refElementErrorID = refElementErrorID || totalSupplyField.ref;
      }

      // Receiving Address
      if (
        receivingAddressField.isRequired &&
        isEmpty(receivingAddressField.value)
      ) {
        isValid = false;
        setReceivingAddressField({
          ...receivingAddressField,
          hasFocused: true,
          hasError: true,
        });

        refElementErrorID = refElementErrorID || receivingAddressField.ref;
      }
    }

    // Token Paying Gas (BTC TOKEN)
    if (
      nativeTokenPayingGasSelected ===
      NativeTokenPayingGasEnum.NativeTokenPayingGas_BTC
    ) {
      // Receiving Address
      if (
        receivingAddressField.isRequired &&
        isEmpty(receivingAddressField.value)
      ) {
        isValid = false;
        setReceivingAddressField({
          ...receivingAddressField,
          hasFocused: true,
          hasError: true,
        });
        refElementErrorID = receivingAddressField.ref;
      }
    }

    return {
      isValid,
      refElementErrorID,
    };
  };
  const validateAllFormFields_V2 = () => {
    let isValid = true;
    let refElementErrorID = undefined;

    // Computer Name
    if (computerNameField.isRequired && isEmpty(computerNameField.value)) {
      isValid = false;
      setComputerNameField({
        ...computerNameField,
        hasFocused: true,
        hasError: true,
      });
      refElementErrorID = refElementErrorID || computerNameField.ref;
    }

    // // Gas Litmit
    // if (blockGasLimitField.isRequired && isEmpty(blockGasLimitField.value)) {
    //   isValid = false;
    //   setBlockGasLimitField({
    //     ...blockGasLimitField,
    //     hasFocused: true,
    //     hasError: true,
    //   });

    //   refElementErrorID = refElementErrorID || blockGasLimitField.ref;
    // }

    return {
      isValid,
      refElementErrorID,
    };
  };

  const fetchEstimateTotalCostDebouce = useCallback(
    // debounce(fetchEstimateTotalCost, 500),
    debounce(fetchEstimateTotalCost_V2, 500),
    [orderBuyReq],
  );

  useEffect(() => {
    if (isMainnet) {
      fetchEstimateTotalCostDebouce(orderBuyReq);
    }
  }, [
    isMainnet,
    blockTimeSelected,
    dataValiditySelected,
    bitcoinValiditySelected,
    rollupProtocolSelected,
    proverSelected,
  ]);

  useEffect(() => {
    fetchAvailableListHandler();
  }, []);

  useEffect(() => {
    const getChainIDRandomFunc = async () => {
      try {
        const newChainId = await getChainIDRandom();
        setChainIdRandom(newChainId);
      } catch (error) {}
    };
    getChainIDRandomFunc();
  }, []);

  const confirmSubmitHandler = async () => {
    try {
      if (isMainnet) {
        // Call API Contact and Push Slack Notification (team Growth will contact to user)
        await submitContactVS2(submitFormParams);
        setShowSubmitFormResult(true);
      } else {
        // Call API Register Instance
        await orderBuyHandler();
      }
    } catch (error) {
      console.log('[confirmSubmitHandler] ERROR 1: ', error);
      const { message, desc } = getErrorMessage(error);
      console.log('[confirmSubmitHandler] ERROR 2: ', { message, desc });
      toast.error(message || desc, { duration: 2000 });
    } finally {
      console.log('[confirmSubmitHandler] finally: ');
      setShowSubmitForm(false);
    }
  };

  const orderBuyHandler = async (onSuccess?: any) => {
    try {
      setSubmiting(true);

      let params: IOrderBuyReq = {
        ...orderBuyReq,
        ...HardwareGrowth,
        rollupProtocol: RollupEnum.Rollup_ZK,
        serviceType: RollupEnum.Rollup_ZK,
      };
      console.log('Register Instance Params: ', params);

      const result = await orderBuyAPI(params);

      await sleep(1);

      if (result) {
        // Show Toast Success
        // toast.success('Your order has been submitted successfully.', {
        //   duration: 1000,
        // });

        await sleep(1);

        dispatch(setViewMode('Mainnet'));
        dispatch(setViewPage('ManageChains'));
        dispatch(setShowAllChains(false));

        await sleep(1);

        router.push('/blockchains');
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    } finally {
      console.log('[orderBuyHandler] finally: ');
      setSubmiting(false);
    }
  };

  const submitHandler = async (onSuccess?: any) => {
    try {
      if (!loggedIn) {
        setShowLoginModalCustomize && setShowLoginModalCustomize(true);
        return;
      }

      // console.log('submitHandler --- isNakaWalletAuthed ', isNakaWalletAuthed);
      // if (!isNakaWalletAuthed) {
      //   // login();
      //   const result = await requestAccount();
      //   if (result && result.accounts && result.accounts.length > 0) {
      //     const addressObject = result.accounts[0];
      //     const address = addressObject.address;
      //     await onLoginL2Service(address);
      //   }
      //   return;
      // }
      // if (isNeededRequestSignMessageFromNakaWallet) {
      //   await onLoginL2Service(nakaAddress);
      // }

      // const { isValid, refElementErrorID } = validateAllFormFields();
      const { isValid, refElementErrorID } = validateAllFormFields_V2();
      if (isValid) {
        // orderBuyHandler(onSuccess)
        // setShowSubmitForm(true); V1
        // Call API Register Instance --- V2
        await orderBuyHandler();
      } else {
        refElementErrorID?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    }
  };

  const values = {
    computerNameField,
    setComputerNameField,

    computerDescriptionField,
    setComputerDescriptionField,

    projectXField,
    setProjectXField,

    projectWebSiteField,
    setProjectWebSiteField,

    yourXField,
    setYourXField,

    yourTelegramField,
    setYourTelegramField,

    minGasPriceField,
    setMinGasPriceField,

    blockGasLimitField,
    setBlockGasLimitField,

    tickerField,
    setTickerField,

    totalSupplyField,
    setTotalSupplyField,

    receivingAddressField,
    setReceivingAddressField,

    //

    availableListData,
    isAvailableListFetching,

    estimateTotalCostData,
    setEstimateTotalCostData,
    estimateTotalCostFetching,

    estimateTotalCostData_V2,

    networkSelected,
    setNetworkSelected,

    rollupProtocolSelected,
    setRollupProtocolSelected,

    bitcoinValiditySelected,
    setBitcoinValiditySelected,

    dataValiditySelected,
    setDataValiditySelected,

    blockTimeSelected,
    setBlockTimeSelected,

    withdrawalPeriodSelected,
    setWithdrawalPeriodSelected,

    nativeTokenPayingGasSelected,
    setNativeTokenPayingGasSelected,

    preInstallDAppSelected,
    setPreInstallDAppSelected,

    configuratinOptionSelected,
    setConfiguratinOptionSelected,

    blockGasLimitSelected,
    setBlockGasLimitSelected,

    isMainnet,
    chainIdRandom,
    orderBuyReq,
    confirmBtnTitle,
    showSubmitForm,
    setShowSubmitForm,
    isSubmiting,
    setSubmiting,

    submitHandler,
    confirmSubmitHandler,

    showSubmitFormResult,
    setShowSubmitFormResult,

    submitFormParams,
    orderBuyHandler,

    showTopupModal,
    setShowTopupModal,

    showSendFormModal,
    setShowSendFormModal,

    isStandardMode,
    proverSelected,
    setProverSelected,
  };

  // console.log('[DEBUG] Buy Provider ALL DATA: ', {
  //   values: values,
  //   orderBuyReq,
  // });

  return <BuyContext.Provider value={values}>{children}</BuyContext.Provider>;
};
