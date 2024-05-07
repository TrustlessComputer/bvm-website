// import { useFetchUserData, useIsAuthenticated } from '@/state/user/hooks';
import { getErrorMessage } from '@/utils/error';
import sleep from '@/utils/sleep';
import BigNumber from 'bignumber.js';
import { debounce, isEmpty } from 'lodash';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { getUser } from '../Buy/Buy.TwitterUtil';
import { dayDescribe, getRandonComputerName_VS2 } from '../Buy/Buy.helpers';
import {
  BitcoinValidityEnum,
  BlockTimeEnum,
  BlockTimeEnumMap,
  DALayerEnum,
  DALayerEnumMap,
  FormFields,
  FormFieldsErrorMessage,
  GAS_LITMIT,
  MIN_GAS_PRICE,
  NativeTokenPayingGasEnum,
  NetworkEnum,
  NetworkEnumMap,
  PluginEnum,
  RollupEnum,
  RollupEnumMap,
  WITHDRAWAL_PERIOD,
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
  IOrderBuyReq,
  SubmitFormParams,
} from '@/services/api/l2services/types';
import { ServiceTypeEnum } from '../Buy/Buy.constanst';
import {
  estimateTotalCostAPI,
  fetchAvailableList,
  orderBuyAPI,
  submitContactVS2,
} from '@/services/api/l2services';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { useWeb3Authenticated } from '@/Providers/AuthenticatedProvider/hooks';

export type IField = {
  value?: string;
  hasFocused?: boolean;
  hasError?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
};

export const BuyContext = createContext<IBuyContext>(BuyContextInit);

export const BuyProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { login, isLogged } = useWeb3Authenticated();
  // const { onSuccess } = props;
  const goDashboardPage = (flag1: boolean, flag2: boolean) => {}; //TODO A
  // const { onConnect } = useContext(WalletContext);
  const requiredLogin = () => {}; //TODO A
  // const accountInfo = useAppSelector(accountInfoSelector);
  const accountInfo = true;
  // const onFetchData = useFetchUserData();
  const onFetchData = () => {}; //TODO A

  // const { search } = useLocation();
  // const { toggleContact } = useContext(ModalsContext);

  // const urlParams = new URLSearchParams(search);
  // const typeData = urlParams?.get('type')?.replace('/', '') || undefined;
  // const builderStateInit = getBuyBuilderStateInit(typeData);
  // const [buyBuilderState, setBuyBuilderState] = useState<BuyBuilderSelectState>(builderStateInit);

  // ------------------------------------------------------------
  // Text and TextArea Fields
  // ------------------------------------------------------------
  const [computerNameField, setComputerNameField] = useState<IField>({
    isRequired: false,
    errorMessage: FormFieldsErrorMessage[FormFields.COMPUTER_NAME],
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
  });

  const [yourTelegramField, setYourTelegramField] = useState<IField>({});

  const [minGasPriceField, setMinGasPriceField] = useState<IField>({
    isRequired: true,
    value: String(MIN_GAS_PRICE),
    errorMessage: FormFieldsErrorMessage[FormFields.MIN_GAS_PRICE],
  });

  const [blockGasLimitField, setBlockGasLimitField] = useState<IField>({
    isRequired: true,
    value: String(GAS_LITMIT),
    errorMessage: FormFieldsErrorMessage[FormFields.BLOCK_GAS_LIMIT],
  });

  const [tickerField, setTickerField] = useState<IField>({
    isRequired: true,
    value: '',
    errorMessage: FormFieldsErrorMessage[FormFields.TICKER],
  });

  const [totalSupplyField, setTotalSupplyField] = useState<IField>({
    isRequired: true,
    value: '',
    errorMessage: FormFieldsErrorMessage[FormFields.TOTAL_SUPPLY],
  });

  const [receivingAddressField, setReceivingAddressField] = useState<IField>({
    isRequired: true,
    value: '',
    errorMessage: FormFieldsErrorMessage[FormFields.RECEIVING_ADDRESS],
  });

  // ------------------------------------------------------------
  // Local State
  // ------------------------------------------------------------

  const [networkSelected, setNetworkSelected] = useState<
    NetworkEnum | undefined
  >(NetworkEnum.Network_Testnet);
  const [rollupProtocolSelected, setRollupProtocolSelected] = useState<
    RollupEnum | undefined
  >(RollupEnum.Rollup_OpStack);
  const [bitcoinValiditySelected, setBitcoinValiditySelected] = useState<
    BitcoinValidityEnum | undefined
  >(BitcoinValidityEnum.BitcoinValidity_Ordinals);
  const [dataValiditySelected, setDataValiditySelected] = useState<
    DALayerEnum | undefined
  >(DALayerEnum.DALayer_BTC);
  const [blockTimeSelected, setBlockTimeSelected] = useState<
    BlockTimeEnum | undefined
  >(BlockTimeEnum.BlockTime_10s);
  const [withdrawalPeriodSelected, setWithdrawalPeriodSelected] =
    useState<number>(WITHDRAWAL_PERIOD);
  const [nativeTokenPayingGasSelected, setNativeTokenPayingGasSelected] =
    useState<number>(NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM);
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
  const [estimateTotalCostFetching, setEstimateTotalCostFetching] =
    useState(false);

  // ------------------------------------------------------------
  // Other State values
  // ------------------------------------------------------------
  const isMainnet = useMemo(
    () => !!(networkSelected == NetworkEnum.Network_Mainnet),
    [networkSelected],
  );

  const orderBuyReq = useMemo(() => {
    // const computerName = computerNameField.value || '';
    const computerName = getRandonComputerName_VS2(isMainnet);
    const finalizationPeriodSeconds = convertDayToSeconds(
      withdrawalPeriodSelected,
    );
    const chainID = chainIdRandom;
    const chainName = computerName;
    const domain = computerName?.toLowerCase()?.trim().replaceAll(' ', '-');
    const blockTime = blockTimeSelected || BlockTimeEnum.BlockTime_10s;
    const minGasPrice = new BigNumber(minGasPriceField.value || 2)
      .multipliedBy(1e9)
      .toFixed();
    const bitcoinValidity =
      bitcoinValiditySelected || BitcoinValidityEnum.BitcoinValidity_Ordinals;
    const dataAvaibilityChain = dataValiditySelected || DALayerEnum.DALayer_BTC;

    let params: IOrderBuyReq = {
      serviceType: ServiceTypeEnum.DEFAULT, // hard code
      domain: domain,
      chainId: String(chainID), // random
      chainName: chainName,
      description: '', // hard code
      finalizationPeriod: Math.ceil(finalizationPeriodSeconds),
      blockTime: Number(blockTime),
      minGasPrice: minGasPrice,
      dataAvaibilityChain: Number(dataAvaibilityChain),
      isMainnet: isMainnet,
      // userName: ((userGamefi || {}) as any)?.name || '',
      userName: '',
      pluginIds: [PluginEnum.Plugin_Bridge],
      nativeTokenPayingGas: nativeTokenPayingGasSelected,
      gasLimit: GAS_LITMIT,
      bitcoinValidity: bitcoinValidity,
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
  ]);

  const submitFormParams: SubmitFormParams = {
    // bitcoinL2Name: computerNameField.value || '--',
    bitcoinL2Name: getRandonComputerName_VS2(isMainnet) || '--',
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

  const confirmBtnTitle = useMemo(() => {
    if (!isLogged) {
      return 'Login';
    } else if (isMainnet) {
      return 'Submit';
    } else {
      return 'Submit';
    }
  }, [isMainnet, accountInfo, isLogged]);

  useEffect(() => {
    setInterval(() => {
      // setIsAuthenticated(useIsAuthenticated()); //TODO A
    }, 500);
  }, []);

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

  const validateAllFormFields = () => {
    let isValid = true;

    // Computer Name
    // if (computerNameField.isRequired && isEmpty(computerNameField.value)) {
    //   isValid = false;
    //   setComputerNameField({ ...computerNameField, hasFocused: true, hasError: true });
    // }

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
    }

    // Min Gas Price
    if (minGasPriceField.isRequired && isEmpty(minGasPriceField.value)) {
      isValid = false;
      setMinGasPriceField({
        ...minGasPriceField,
        hasFocused: true,
        hasError: true,
      });
    }

    // Gas Litmit
    if (blockGasLimitField.isRequired && isEmpty(blockGasLimitField.value)) {
      isValid = false;
      setBlockGasLimitField({
        ...blockGasLimitField,
        hasFocused: true,
        hasError: true,
      });
    }

    // Token Paying Gas (Custom Naitve Token)
    if (
      nativeTokenPayingGasSelected ===
      NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint
    ) {
      // Ticker
      if (tickerField.isRequired && isEmpty(tickerField.value)) {
        isValid = false;
        setTickerField({ ...tickerField, hasFocused: true, hasError: true });
      }

      // Total Supply
      if (totalSupplyField.isRequired && isEmpty(totalSupplyField.value)) {
        isValid = false;
        setTotalSupplyField({
          ...totalSupplyField,
          hasFocused: true,
          hasError: true,
        });
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
      }
    }
    return isValid;
  };

  const fetchEstimateTotalCostDebouce = useCallback(
    debounce(fetchEstimateTotalCost, 500),
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
      await submitContactVS2(submitFormParams);
      setShowSubmitFormResult(true);
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

      const twitterAccessToken = parent?.localStorage?.getItem('TWITTER_TOKEN');
      let twitterID;
      let userTwitterInfor;

      if (twitterAccessToken && twitterAccessToken.length > 0) {
        userTwitterInfor = await getUser(twitterAccessToken);
        twitterID = userTwitterInfor?.twitter_id;
      }

      let orderBuyReqParams: IOrderBuyReq = {
        ...orderBuyReq,
        twitter_id: twitterID,
      };

      // console.log('DEBUG [orderBuyHandler] params: --- ', orderBuyReqParams);

      const result = await orderBuyAPI(orderBuyReqParams);
      await sleep(2);
      if (result) {
        onFetchData();
        await sleep(1);
        toast.success('Order successful', {
          duration: 1000,
        });
        goDashboardPage(isMainnet, true);
      }
      onSuccess && onSuccess();
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    } finally {
      setSubmiting(false);
    }
  };

  const submitHandler = async (onSuccess?: any) => {
    try {
      console.log('submitHandler --- isAuthenticated ', isLogged);
      if (!isLogged) {
        login();
        return;
      }
      if (validateAllFormFields()) {
        // orderBuyHandler(onSuccess)
        setShowSubmitForm(true);
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
  };

  // console.log('[DEBUG] Buy Provider ALL DATA: ', values);

  return <BuyContext.Provider value={values}>{children}</BuyContext.Provider>;
};
