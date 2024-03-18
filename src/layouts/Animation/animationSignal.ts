import { signal } from '@preact/signals-react';

type IValue = {
  play: () => void;
  reset: () => void;
  setPlayed: () => void;
  playForPopup: () => void;
  resetForPopup: () => void;
};

const isPlayState = signal(false);
const isPlayedState = signal(false);
const isPlayForPopupState = signal(false);
export default function useAnimationSignal(): IValue {
  return {
    play: (): void => {
      isPlayState.value = true;
    },
    reset: (): void => {
      isPlayState.value = false;
    },
    setPlayed: (): void => {
      isPlayedState.value = true;
    },
    playForPopup: (): void => {
      isPlayForPopupState.value = true;
    },
    resetForPopup: (): void => {
      isPlayForPopupState.value = false;
    },
  };
}

export { isPlayedState, isPlayForPopupState, isPlayState };
