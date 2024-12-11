import { create } from 'zustand';

interface IGeneralIdeaStore {
  textArea: string;
  setTextArea: (text: string | undefined) => void;

  isLoading: boolean;
  setLoading: (flag: boolean) => void;

  stepper: 1 | 2;
  setStepper: (step: number) => void;
}

const generalIdeaStore = create<IGeneralIdeaStore>((set) => ({
  textArea: '',
  setTextArea: (text) => set({ textArea: text }),

  isLoading: false,
  setLoading: (flag) => set({ isLoading: flag }),

  stepper: 1,
  setStepper: (step: 1 | 2) => set({ stepper: step }),
}));

export default generalIdeaStore;
