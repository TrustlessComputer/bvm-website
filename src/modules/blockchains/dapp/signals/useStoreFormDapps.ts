import { signal } from '@preact/signals-react';

export const formDapps = signal<Record<string, DappModel>>({});

export const useFormDapps = (): Record<string, DappModel> => {
  return formDapps.value;
};
