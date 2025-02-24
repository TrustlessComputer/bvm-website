import { create } from 'zustand'
import { TABS } from '@/modules/blockchains/Buy/constants';

interface IProp{
  isShowVideo: false,
  setShowVideo: (b: boolean) => void,
}
export const useVideoEducation = create<IProp>((set) => ({
  isShowVideo: false,
  setShowVideo: (b: boolean) => set(() => ({ isShowVideo: false })),
}))
