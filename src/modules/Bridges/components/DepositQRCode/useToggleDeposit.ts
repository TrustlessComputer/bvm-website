import { create } from 'zustand';

type IToggleDeposit = {
  isShow: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const useToggleDeposit = create<IToggleDeposit>((set) => ({
  isShow: false,
  onClose: () => set({ isShow: false }),
  onOpen: () => set({ isShow: true }),
}));

export default useToggleDeposit;
