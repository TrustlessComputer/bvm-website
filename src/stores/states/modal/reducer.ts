import { createSlice } from '@reduxjs/toolkit';
import { ModalComponentProps } from './types';

export interface ModalState {
  modals: Array<ModalComponentProps>;
}

const initialState: ModalState = {
  modals: [],
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const isExisted = (state.modals || []).some(
        ({ id }) => id === action.payload.id,
      );
      if (!isExisted) {
        state.modals = state.modals.concat(action.payload);
      }
    },
    closeModal: (state, action) => {
      const payload = action.payload;
      if (payload.id !== 0) {
        state.modals = payload.id
          ? state.modals.filter((e) => e.id !== payload.id)
          : state.modals.slice(0, -1);
      }
    },
  },
});

export const { openModal, closeModal } = slice.actions;

export default slice.reducer;
