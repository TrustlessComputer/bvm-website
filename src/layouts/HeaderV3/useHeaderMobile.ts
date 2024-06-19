import { create } from 'zustand';

interface IProp {
  isProductionOpen: boolean,
  show: ()=>void
  hide: ()=>void
}
const useHeaderMobile =create<IProp>((set) => ({
  isProductionOpen: false,
  show: () => set({ isProductionOpen: true }),
  hide: () => set({ isProductionOpen: false }),
}))

export default useHeaderMobile;
