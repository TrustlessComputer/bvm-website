import { TABS } from '@/modules/agent-studio/Buy/constants';
import { useMemo } from 'react';
import { create } from 'zustand';

type Store = {
  tabActive: TABS;
  setTab: (tab: TABS) => void;
};

const useTabsStore = create<Store>((set) => ({
  tabActive: TABS.CODE,
  setTab: (tab: TABS) => set(() => ({ tabActive: tab })),
}));

export const useTabActive = () => {
  return useTabsStore((state) => state.tabActive);
};

export const useIsTabCode = () => {
  const tabActive = useTabActive();
  return useMemo(() => tabActive === TABS.CODE, [tabActive]);
};

export const useIsTabExplore = () => {
  const tabActive = useTabActive();
  return useMemo(() => tabActive === TABS.EXPLORE, [tabActive]);
};

export const useIsTabTemplate = () => {
  const tabActive = useTabActive();
  return useMemo(() => tabActive === TABS.TEMPLATE, [tabActive]);
};

export default useTabsStore;
