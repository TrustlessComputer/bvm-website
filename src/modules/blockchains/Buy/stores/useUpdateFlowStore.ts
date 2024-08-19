import { create } from 'zustand';

type UseUpdateFlowStore = {
  updated: boolean;
  setUpdated: (updated: UseUpdateFlowStore['updated']) => void;
};

const useUpdateFlowStore = create<UseUpdateFlowStore>((set) => ({
  updated: false,
  setUpdated: (updated) => set({ updated }),
}));
export default useUpdateFlowStore;
