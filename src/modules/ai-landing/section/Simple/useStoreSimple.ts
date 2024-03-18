import create from 'zustand';

type Store = {
    idSimple: number;
    setIdSimple: (n: number) => void;
};

export const useStoreSimple = create<Store>()((set) => ({
    idSimple: -1,
    setIdSimple: (b): void => set(() => ({ idSimple: b })),
}));
