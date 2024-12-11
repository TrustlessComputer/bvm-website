import { create } from 'zustand';

interface INFTModuleStore {
  collectionStr: string;
  setCollectionStr: (text: string | undefined) => void;

  tokenIdStr: string;
  setTokenIdStr: (text: string | undefined) => void;

  personalityStr: string;
  setPersonalityStr: (text: string | undefined) => void;

  isLoading: boolean;
  setLoading: (flag: boolean) => void;

  stepper: 1 | 2;
  setStepper: (step: number) => void;
}

const nftModuleStore = create<INFTModuleStore>((set) => ({
  collectionStr: '',
  setCollectionStr: (text) => set({ collectionStr: text }),

  tokenIdStr: '',
  setTokenIdStr: (text) => set({ tokenIdStr: text }),

  personalityStr: '',
  setPersonalityStr: (text) => set({ personalityStr: text }),

  isLoading: false,
  setLoading: (flag) => set({ isLoading: flag }),

  stepper: 1,
  setStepper: (step: 1 | 2) => set({ stepper: step }),
}));

export default nftModuleStore;
