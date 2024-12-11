import { useMemo } from 'react';
import { create } from 'zustand';

//Interface
type IComputerNameInputStore = {
  computerName?: string;
  computerNameErrMsg?: string;
  isComputerNameFocused?: boolean;

  setComputerName: (text: string) => void;
  setComputerNameErrMsg: (errorMsg?: string) => void;
  setComputerNameFocused: (flag: boolean) => void;
};

//Store
export const ComputerNameInputStore = create<IComputerNameInputStore>(
  (set) => ({
    computerName: '',
    computerNameErrMsg: undefined,
    isComputerNameFocused: false,

    setComputerName: (text) => set({ computerName: text }),
    setComputerNameErrMsg: (errMsg) => set({ computerNameErrMsg: errMsg }),
    setComputerNameFocused: (flag) => set({ isComputerNameFocused: flag }),
  }),
);

// HOOK
export const useComputerNameInputStore = () => {
  const storeData = ComputerNameInputStore();
  const {
    setComputerName,
    setComputerNameErrMsg,
    setComputerNameFocused,
    computerNameErrMsg,
    computerName,
    isComputerNameFocused,
  } = storeData;

  const resetState = () => {
    setComputerName('');
    setComputerNameFocused(false);
    setComputerNameErrMsg(undefined);
  };

  const isValid = useMemo(() => {
    return !!computerName && !computerNameErrMsg;
  }, [computerNameErrMsg, isComputerNameFocused, computerName]);

  return {
    ...storeData,
    isValid,

    resetState,
  };
};
