import { signal } from '@preact/signals-react';

type Field = {
  name: string;
  value: string | number | Field[];
  parentNames: string[];
};

export const draggedIdsSignal = signal<string[]>([]);
export const draggedIds2DSignal = signal<Field[][]>([]);
export const idDraggingSignal = signal<string>('');