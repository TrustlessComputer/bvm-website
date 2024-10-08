import { signal } from '@preact/signals-react';

type Field = {
  name: string;
  value: string | number | string[] | number[];
  parentNames: string[];
  children: Field[];
};

export const draggedIdsSignal = signal<string[]>([]);
export const draggedIds2DSignal = signal<Field[][]>([]);
export const templateIds2DSignal = signal<Field[][]>([]);
export const blockDraggingSignal = signal<{
  id: string;
  title: string;
  icon: string;
  background: string;
}>({
  id: '',
  title: '',
  icon: '',
  background: '',
});
export const idBlockErrorSignal = signal<string>('');
