import { create } from 'zustand';

interface IProp {
  play: boolean,
  setPlay: ()=>void
}
const useAnimationStore =create<IProp>((set) => ({
  play: false,
  setPlay: () => set({ play: true }),
}))
