import { signal } from '@preact/signals-react';

export const draggedIdsSignal = signal<string[]>([]);
export const idDraggingSignal = signal<string>('');

export const useDraggedIdsSignal = () => {
  return draggedIdsSignal.value;
};

export const useDragMaskSignal = () => {
  return idDraggingSignal.value;
};
