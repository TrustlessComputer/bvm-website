import { create } from 'zustand';

interface ITokenModuleStore {
  contractAddressStr: string;
  setContractAddressStr: (text: string | undefined) => void;

  tokenNameStr: string;
  setTokenNameStr: (text: string | undefined) => void;

  tokenSymbolStr: string;
  setTokenSymbolStr: (text: string | undefined) => void;

  personalityStr: string;
  setPersonalityStr: (text: string | undefined) => void;

  isLoading: boolean;
  setLoading: (flag: boolean) => void;

  stepper: 1 | 2 | 3;
  setStepper: (step: number) => void;
}

const nftModuleStore = create<ITokenModuleStore>((set) => ({
  contractAddressStr: '',
  setContractAddressStr: (text) => set({ contractAddressStr: text }),

  tokenNameStr: '',
  setTokenNameStr: (text) => set({ tokenNameStr: text }),

  tokenSymbolStr: '',
  setTokenSymbolStr: (text) => set({ tokenSymbolStr: text }),

  personalityStr: '',
  setPersonalityStr: (text) => set({ personalityStr: text }),

  isLoading: false,
  setLoading: (flag) => set({ isLoading: flag }),

  stepper: 1,
  setStepper: (step: 1 | 2 | 3) => set({ stepper: step }),
}));

export default nftModuleStore;
