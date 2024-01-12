import { RootState } from '@/stores';

export const modalSelector = (state: RootState) =>
  state.modal || {
    modals: [],
  };
