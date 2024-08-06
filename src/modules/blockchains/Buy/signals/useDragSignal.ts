import { signal } from '@preact/signals-react';

type Field = {
  name: string;
  value: string | number | string[] | number[];
  parentNames: string[];
  children: Field[];
};

export const draggedIdsSignal = signal<string[]>([]);
export const draggedDappIndexesSignal = signal<number[]>([]);
export const draggedIds2DSignal = signal<Field[][]>([]);
export const templateIds2DSignal = signal<Field[][]>([]);
export const blockDraggingSignal = signal<{
  id: string;
  title: string;
  icon: string;
  background: string;
  dappIndex: number;
}>({
  id: '',
  title: '',
  icon: '',
  background: '',
  dappIndex: -1,
});
export const idBlockErrorSignal = signal<string>('');
