import { signal } from '@preact/signals-react';
import { useRef } from 'react';

type IValue = {
  registerLoad: () => void;
  unRegisterLoad: () => void;
  reset: () => void;
};

export const loadState = signal(0);
export const loadedSate = signal(false);

export default function useLoadManageSignal(): IValue {
  const refTimeLoaded = useRef<NodeJS.Timeout>();
  return {
    registerLoad: (): void => {
      if (refTimeLoaded.current) clearTimeout(refTimeLoaded.current);
      loadState.value += 1;
    },
    unRegisterLoad: (): void => {
      loadState.value -= 1;
      if (loadState.value <= 0) {
        refTimeLoaded.current = setTimeout(() => {
          loadedSate.value = true;
        }, 100);
      }
    },
    reset: (): void => {
      loadState.value = 0;
      loadedSate.value = false;
    },
  };
}
