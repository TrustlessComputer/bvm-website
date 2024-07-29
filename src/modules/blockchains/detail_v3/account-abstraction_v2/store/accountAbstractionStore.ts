import { create } from 'zustand';

type AccountAbstractionStore = {
  tokenContractAddress?: string;
  tokenContractAddressErrMsg?: string;
  isTokenContractAddressFocused?: boolean;

  setTokenContractAddress: (tokenContractAddress: string) => void;
  setTokenContractAddressErrMsg: (errorMsg?: string) => void;
  setTokenContractFocused: (flag: boolean) => void;

  feeRate?: string;
  feeRateErrMsg?: string;
  isFeeRateFocused?: boolean;
  setFeeRate: (value: string) => void;
  setFeeRateErrMsg: (errorMsg?: string) => void;
  setFeeRateFocused: (flag: boolean) => void;
};

export const accountAbstractionStore = create<AccountAbstractionStore>(
  (set) => ({
    tokenContractAddress: '',
    setTokenContractAddress: (tokenContractAddress) =>
      set({ tokenContractAddress }),
    setTokenContractAddressErrMsg: (tokenContractAddressErrMsg) =>
      set({ tokenContractAddressErrMsg }),
    setTokenContractFocused: (isTokenContractAddressFocused) =>
      set({ isTokenContractAddressFocused }),

    feeRate: '',
    setFeeRate: (feeRate) => set({ feeRate }),
    setFeeRateErrMsg: (feeRateErrMsg) => set({ feeRateErrMsg }),
    setFeeRateFocused: (isFeeRateFocused) => set({ isFeeRateFocused }),
  }),
);
