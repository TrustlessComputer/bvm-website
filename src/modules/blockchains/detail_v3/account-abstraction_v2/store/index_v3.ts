import { create } from 'zustand';

type AccountAbstractionStore = {
  address?: string;
  setAddress: (value: string) => void;

  feeRate?: string;
  setFeeRate: (value: string) => void;
};

export const useAccountAbstractionStore = create<AccountAbstractionStore>(
  (set) => ({
    address: '',
    setAddress: (address) => set({ address }),

    feeRate: '',
    setFeeRate: (feeRate) => set({ feeRate }),
  }),
);
