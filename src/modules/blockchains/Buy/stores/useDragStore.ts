import { create } from 'zustand';

type UseDrag = {
  draggedFields: string[];
  setDraggedFields: (draggedFields: string[]) => void;
};

const useDragStore = create<UseDrag>((set) => ({
  draggedFields: [],
  setDraggedFields: (draggedFields) => set({ draggedFields }),
}));

export default useDragStore;
