import create from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IProps {
  latestAddress?: string;
  setLatestAddress: (latestAddress?: string) => void;
}

const useWagmiStore = create<IProps, any>(
  persist(
    // @ts-ignore
    (set, get) => ({
      latestAddress: '',
      setLatestAddress: (latestAddress) => {
        set({ latestAddress });
      },
      accessToken: undefined,

    }),
    {
      name: 'use-wagmi-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        latestAddress: state.latestAddress,
      }),
    },
  ),
);

export default useWagmiStore;
