import { create } from 'zustand';

type UseFormOrderStore = {
  data: IModelCategory[];
  setData: (data: IModelCategory[]) => void;
};

const useFormOrderStore = create<UseFormOrderStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useFormOrderStore;
