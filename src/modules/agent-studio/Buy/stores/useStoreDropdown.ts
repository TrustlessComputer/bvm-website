import { create } from 'zustand';

type UseStoreDropDown = {
  idDropdownCurrent: string;
  setIdDropdownCurrent: (value: string) => void;
};

const useStoreDropDown = create<UseStoreDropDown>((set) => ({
  idDropdownCurrent: '',
  setIdDropdownCurrent: (value: string) => set({ idDropdownCurrent: value }),
}));

export default useStoreDropDown;
