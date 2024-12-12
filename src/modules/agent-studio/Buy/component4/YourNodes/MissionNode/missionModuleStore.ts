import { create } from 'zustand';

interface IMissionModuleStore {
  socialSelected: string;
  setSocialSelected: (text: string | undefined) => void;
  socialList: string[];

  time: number | undefined;
  setTime: (text: number | undefined) => void;

  model: string;
  setModel: (text: string | undefined) => void;

  description: string;
  setDescripiton: (text: string | undefined) => void;

  personalityStr: string;
  setPersonalityStr: (text: string | undefined) => void;

  isLoading: boolean;
  setLoading: (flag: boolean) => void;

  stepper: 1 | 2;
  setStepper: (step: number) => void;
}

const missionStore = create<IMissionModuleStore>((set) => ({
  socialSelected: '',
  setSocialSelected: (text) => set({ socialSelected: text }),
  socialList: ['Twitter', 'Farcaster'],

  time: undefined,
  setTime: (text) => set({ time: text }),

  model: '',
  setModel: (text) => set({ model: text }),

  description: '',
  setDescripiton: (text) => set({ description: text }),

  personalityStr: '',
  setPersonalityStr: (text) => set({ personalityStr: text }),

  isLoading: false,
  setLoading: (flag) => set({ isLoading: flag }),

  stepper: 1,
  setStepper: (step: 1 | 2) => set({ stepper: step }),
}));

export default missionStore;
