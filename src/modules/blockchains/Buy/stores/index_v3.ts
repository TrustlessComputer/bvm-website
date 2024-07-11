import { create } from 'zustand';

type UseOrderFormStoreV3 = {
  form: Record<string, any>;
  field: Record<
    string,
    {
      dragged: boolean;
      value: string | number | null;
    }
  >;
  setField: (
    field: string,
    value: string | number | null,
    dragged?: boolean,
  ) => void;
};

const useOrderFormStoreV3 = create<UseOrderFormStoreV3>((set) => ({
  form: {},
  field: {},
  setField: (field, value, dragged = false) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
      field: {
        ...state.field,
        [field]: {
          dragged: dragged ?? state.field[field]?.dragged,
          value,
        },
      },
    })),
}));

export default useOrderFormStoreV3;
