import { useMemo } from 'react';
import { accountAbstractionStore } from './accountAbstractionStore';
import { isAddress } from 'ethers/lib/utils';

export const useAccountAbstractionStore = () => {
  const storeData = accountAbstractionStore();
  const {
    setFeeRate,
    setFeeRateErrMsg,
    setFeeRateFocused,
    setTokenContractFocused,
    setTokenContractAddress,
    setTokenContractAddressErrMsg,

    isTokenContractAddressFocused,
    tokenContractAddressErrMsg,
    tokenContractAddress,
  } = storeData;

  const resetAAStore = () => {
    setFeeRate('');
    setFeeRateFocused(false);
    setFeeRateErrMsg(undefined);

    setTokenContractAddress('');
    setTokenContractFocused(false);
    setTokenContractAddressErrMsg(undefined);
  };

  const checkTokenContractAddress = () => {
    let errorMsg = undefined;
    if (!tokenContractAddress || tokenContractAddress.length < 1) {
      errorMsg = 'Address is required!';
    } else if (!isAddress(tokenContractAddress)) {
      errorMsg = 'Address is invalid!';
    } else {
      errorMsg = undefined;
    }
    setTokenContractAddressErrMsg(errorMsg);
    setTokenContractFocused(true);
  };

  const isValid = useMemo(() => {
    return !!isTokenContractAddressFocused && !tokenContractAddressErrMsg;
  }, []);

  return {
    ...storeData,
    resetAAStore,
    isValid,
    checkTokenContractAddress,
  };
};
