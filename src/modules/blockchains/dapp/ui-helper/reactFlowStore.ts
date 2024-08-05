import { signal } from '@preact/signals-react';

interface IBoxFlow{
  id: string,
  rect: {
    top: number,
    bottom: number,
    left: number,
    right: number
  }
}
export const reactFlowStore = signal<IBoxFlow[]>([])
