import { create } from 'zustand';

type UseFirstLoadTemplateBoxStore = {
  isFirstLoadTemplateBox: boolean;
  setIsFirstLoadTemplateBox: (value: boolean) => void;
};

const useFirstLoadTemplateBoxStore = create<UseFirstLoadTemplateBoxStore>(
  (set) => ({
    isFirstLoadTemplateBox: false,
    setIsFirstLoadTemplateBox: (value: boolean) =>
      set({ isFirstLoadTemplateBox: value }),
  }),
);

export const useIsFirstLoadTemplateBox = () => {
  return useFirstLoadTemplateBoxStore((state) => state.isFirstLoadTemplateBox);
};

export default useFirstLoadTemplateBoxStore;
