import { accountAbstractionStore } from './accountAbstractionStore';

export const useAccountAbstractionStore = () => {
  const storeData = accountAbstractionStore();
  const {
    setFeeRate,
    setFeeRateErrMsg,
    setFeeRateFocused,
    setTokenContractFocused,
    setTokenContractAddress,
    setTokenContractAddressErrMsg,
  } = storeData;

  const resetAAStore = () => {
    setFeeRate('');
    setFeeRateFocused(false);
    setFeeRateErrMsg(undefined);

    setTokenContractAddress('');
    setTokenContractFocused(false);
    setTokenContractAddressErrMsg(undefined);
  };

  return {
    ...storeData,
    resetAAStore,
  };
};
