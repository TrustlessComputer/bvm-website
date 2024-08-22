import { useOptionInputStore, optionInputStore } from './useOptionInputStore';

export const useOptionInputWatcher = () => {
  const { getValue } = useOptionInputStore();
  const data = getValue('layer2_name');

  return {};
};
