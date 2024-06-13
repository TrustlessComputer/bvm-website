import { create } from 'zustand';

interface IProps {
  isFirst: boolean;
  setIsFirst: () => void;
}
const useLabStore = create<IProps>(set => ({
  isFirst: false,
  setIsFirst: () => set(() => ({ isFirst: true })),
}));

export default useLabStore;
