import { create } from 'zustand';
import { Active } from '@dnd-kit/core';


type UseDndKitState = {
  dataDragging: Active | null;
};

type UseDndKitAction = {
setDataDragging: (dataDragging: Active | null) => void;
};

type UseDndKitStore = UseDndKitState & UseDndKitAction;

const useReactFlowStore = create<UseDndKitStore>((set, get) => ({
  dataDragging: null,
  setDataDragging: (dataDragging) => set({ dataDragging }),
}));

export default useReactFlowStore;
