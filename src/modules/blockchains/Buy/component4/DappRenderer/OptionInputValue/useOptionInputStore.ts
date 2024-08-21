import { signal, useComputed } from '@preact/signals-react';

export const optionInputStore = signal<{
  key: string,
  value: string
}[]>([]);

export function useOptionInputStore() {

  return {
    getValue(key: string) {
      return optionInputStore.value.find(item => item.key === key);
    },
    setValue(key: string, value: string) {
      if (optionInputStore.value.find(item => item.key === key)) {
        optionInputStore.value = optionInputStore.peek().map(item => {
          if (item.key === key) {
            return {
              key,
              value,
            };
          }
          return item;
        });
      } else {
        optionInputStore.value.push({
          key, value,
        });
      }
    },
  };
}

export function useOptionInputValue(key: string) {
  return useComputed(() => {
    return useOptionInputStore().getValue(key)?.value;
  });
}
