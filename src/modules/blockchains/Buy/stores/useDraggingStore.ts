import { create } from 'zustand';

type TUseDraggingStore = {
  isDragging: boolean;
  setIsDragging: (state: boolean) => void;
};

const useDraggingStore = create<TUseDraggingStore>((set) => ({
  isDragging: false,
  setIsDragging: (isDragging) => set({ isDragging }),
}));

export default useDraggingStore;
