import { create } from 'zustand';

type UseDragMask = {
  idDragging: string;
  rightDragging: boolean;
  isDraggingParent: boolean;
  dataDragging: {
    icon: string;
    background: string;
    label: string;
    value: any;
  };
  setIdDragging: (value: string) => void;
  setRightDragging: (value: boolean) => void;
  setDataDragging: (value: UseDragMask['dataDragging']) => void;
  setDraggingParent: (value: boolean) => void;
};

const useDragMask = create<UseDragMask>((set) => ({
  idDragging: '',
  rightDragging: false,
  isDraggingParent: false,
  setIdDragging: (value: string) => set({ idDragging: value }),
  setRightDragging: (value: boolean) => set({ rightDragging: value }),
  dataDragging: {
    icon: '',
    background: '',
    label: '',
    value: '',
  },
  setDataDragging: (value: UseDragMask['dataDragging']) =>
    set({ dataDragging: value }),
  setDraggingParent: (value: boolean) => set({ isDraggingParent: value }),
}));

export default useDragMask;
