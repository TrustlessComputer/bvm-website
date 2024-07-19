import { signal } from '@preact/signals-react';

export const formDappsSignal = signal<Record<string, DappModel>>({});

export const useFormDappsSignal = (): Record<string, DappModel> => {
  return formDappsSignal.value;
};
