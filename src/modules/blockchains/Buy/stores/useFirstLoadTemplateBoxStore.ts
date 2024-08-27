import { create } from 'zustand';

type UseStoreFirstLoadTemplateBox = {
  isFirstLoadTemplateBox: boolean;
  setIsFirstLoadTemplateBox: (value: boolean) => void;
};

const useStoreFirstLoadTemplateBox = create<UseStoreFirstLoadTemplateBox>((set) => ({
  isFirstLoadTemplateBox: false,
  setIsFirstLoadTemplateBox: (value: boolean) => set({ isFirstLoadTemplateBox: value }),
}));

export default useStoreFirstLoadTemplateBox;
