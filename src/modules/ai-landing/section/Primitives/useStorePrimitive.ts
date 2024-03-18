import create from 'zustand';

type Store = {
    idPrimitive: number;
    setIdPrimitive: (n: number) => void;
};

export const useStorePrimitive = create<Store>()((set) => ({
    idPrimitive: 0,
    setIdPrimitive: (b): void => set(() => ({ idPrimitive: b })),
}));
