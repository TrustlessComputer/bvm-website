import { create } from 'zustand';

interface IProp {
  fontReady: boolean,
  play: boolean,
  played: boolean,
  resetPlay: ()=>void
  setPlay: ()=>void
  setPlayed: ()=>void
  fontLoaded: ()=>void
}
const useAnimationStore =create<IProp>((set) => ({
  play: false,
  fontReady: false,
  played: false,
  setPlay: () => set({ play: true }),
  resetPlay: () => set({ play: false }),
  setPlayed: () => set({ played: true }),
  fontLoaded: () => set({ fontReady: true }),
}))

export default useAnimationStore;
