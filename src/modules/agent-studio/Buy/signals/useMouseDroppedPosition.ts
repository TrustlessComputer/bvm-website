import { signal } from '@preact/signals-react';

export const mouseDroppedPositionSignal = signal<{ x: number; y: number }>({
  x: 0,
  y: 0,
});
