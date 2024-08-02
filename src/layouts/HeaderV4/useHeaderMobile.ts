import { create } from 'zustand';

export type IGroupType = 'production' | 'developers' | 'solutions' | null

interface IProp {
  groupType: IGroupType,
  show: (groupType: IGroupType)=>void
  hide: ()=>void
}

const useHeaderMobile =create<IProp>((set) => ({
  groupType: null,
  show: (groupType: IGroupType) => set({ groupType }),
  hide: () => set({ groupType: null }),
}))

export default useHeaderMobile;
