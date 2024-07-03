import { create } from 'zustand';

type FormOrder = {
  chainName: string | null;
  dataAvaibilityChain: number | null;
  isMainnet: boolean | null;
  gasLimit: number | null;
  blockTime: number | null;
};

type UseFormOrderStore = {
  form: FormOrder;
  isAllFieldsFilled: boolean;
  setFormField(field: keyof FormOrder, value: FormOrder[keyof FormOrder]): void;
};

export const useFormOrderStore = create<UseFormOrderStore>((set) => ({
  form: {
    chainName: null,
    dataAvaibilityChain: null,
    isMainnet: null,
    gasLimit: null,
    blockTime: null,
  },
  isAllFieldsFilled: false,

  setFormField: (field, value) =>
    set((state) => {
      return {
        form: { ...state.form, [field]: value },
        isAllFieldsFilled: Object.values(state.form).every(
          (field) => field !== null,
        ),
      };
    }),
}));
