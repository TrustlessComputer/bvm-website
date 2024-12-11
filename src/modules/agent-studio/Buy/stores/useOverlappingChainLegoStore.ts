import { create } from 'zustand';

type UseOverlappingChainLegoStore = {
  overlappingId: string;
  setOverlappingId: (
    overlappingId: UseOverlappingChainLegoStore['overlappingId'],
  ) => void;
};

const useOverlappingChainLegoStore = create<UseOverlappingChainLegoStore>(
  (set) => ({
    overlappingId: '',
    setOverlappingId: (overlappingId) => set({ overlappingId }),
  }),
);

export default useOverlappingChainLegoStore;
