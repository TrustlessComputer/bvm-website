import { signal, useSignal } from '@preact/signals-react';
export const sectionActive = signal<number>(0);
export const useScrollingSectionStore = () => {


  const setSectionActive = (idx: number) => {
    sectionActive.value = idx;
  };

  return{
      setSectionActive
  };
};
