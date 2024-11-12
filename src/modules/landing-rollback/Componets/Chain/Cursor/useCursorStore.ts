import { create } from 'zustand';

interface IProp {
  isShow: boolean,
  show: ()=>void
  hide: ()=>void
}
const useCursorStore =create<IProp>((set) => ({
  isShow: false,
  show: () => set({ isShow: true }),
  hide: () => set({ isShow: false }),
}))

export default useCursorStore;
