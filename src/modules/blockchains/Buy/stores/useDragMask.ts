import { create } from 'zustand';

type UseDragMask = {
  idDragging: string;
  rightDragging: boolean;
  setIdDragging: (value: string) => void;
  setRightDragging: (value: boolean) => void;
};

const useDragMask = create<UseDragMask>((set) => ({
  idDragging: '',
  rightDragging: false,
  setIdDragging: (value: string) => set({ idDragging: value }),
  setRightDragging: (value: boolean) => set({ rightDragging: value }),
}));

export default useDragMask;
