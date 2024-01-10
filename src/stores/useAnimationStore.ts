import { create } from 'zustand';

interface IProp {
  play: boolean,
  played: boolean,
  resetPlay: ()=>void
  setPlay: ()=>void
  setPlayed: ()=>void
}
const useAnimationStore =create<IProp>((set) => ({
  play: false,
  played: false,
  setPlay: () => set({ play: true }),
  resetPlay: () => set({ play: false }),
  setPlayed: () => set({ played: true }),
}))

export default useAnimationStore;
