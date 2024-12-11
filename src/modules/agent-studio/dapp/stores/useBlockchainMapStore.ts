import { create, StateCreator } from 'zustand';
import { BlockchainMap } from '@/types/customize-model';

type UseBlockchainMapSlice = {
  blockchainMap: BlockchainMap;
  setBlockchainMap: (blockchainMap: BlockchainMap) => void;
};

type UseBlockchainMapStore = UseBlockchainMapSlice;

const useBlockchainMapSlice: StateCreator<UseBlockchainMapSlice> = (set) => ({
  blockchainMap: {
    blockchain: null,
    dapps: [],
  },
  setBlockchainMap: (blockchainMap) => set({ blockchainMap }),
});

const useBlockchainMapStore = create<UseBlockchainMapStore>((...set) => ({
  ...useBlockchainMapSlice(...set),
}));

export default useBlockchainMapStore;
