import { create } from 'zustand';

type Store = {
  isShowErrorMessage: boolean;
  toggleErrorMessage: (b: boolean) => void;
};

const useErrorMessageStore = create<Store>((set) => ({
  isShowErrorMessage: false,
  toggleErrorMessage: (b: boolean) => set(() => ({ isShowErrorMessage: b })),
}));

export const useIsShowErrorMessage = () =>
  useErrorMessageStore((state) => state.isShowErrorMessage);

export default useErrorMessageStore;
