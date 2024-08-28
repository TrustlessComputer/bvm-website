import { create } from 'zustand';
import { draggedIds2DSignal } from '../signals/useDragSignal';

type UseDraggedId2DStore = {
  draggedIds2D: typeof draggedIds2DSignal.value;
  setDraggedIds2D: (draggedId2D: typeof draggedIds2DSignal.value) => void;
};

const useDraggedId2DStore = create<UseDraggedId2DStore>((set) => ({
  draggedIds2D: [],
  setDraggedIds2D: (draggedId2D) => set({ draggedIds2D: draggedId2D }),
}));

export default useDraggedId2DStore;
