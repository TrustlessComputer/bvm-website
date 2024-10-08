import { create } from 'zustand'
import { TABS } from '@/modules/blockchains/Buy/constants';

interface IProp{
  tabActive: TABS,
  setTab: (tab: TABS) => void,
}
export const useTabs = create<IProp>((set) => ({
  tabActive: TABS.CODE,
  setTab: (tab: TABS) => set(() => ({ tabActive: tab })),
}))
