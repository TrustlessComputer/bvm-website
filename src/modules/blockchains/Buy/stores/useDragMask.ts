import { create } from 'zustand';

type UseDragMask = {
  idDragging: string;
  setIdDragging: (value: string) => void;
};

const useDragMask = create<UseDragMask>((set) => ({
  idDragging: '',
  setIdDragging: (value: string) => set({ idDragging: value }),
}));

export default useDragMask;
