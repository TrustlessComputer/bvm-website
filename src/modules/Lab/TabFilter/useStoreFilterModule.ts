import { create } from 'zustand';
import { ILabItemContent, Modules } from '../data';

type Store = {
    tagCurrent: string;
    dataModule: ILabItemContent[];
    dataInit: ILabItemContent[];
    setDataModule: (id: string) => void;
};

export const useStoreFilterModule = create<Store>()((set) => ({
    tagCurrent: 'All',
    dataInit: Modules,
    dataModule: Modules,
    setDataModule: (tag: string) =>
        set((state) => {
            if (tag === 'All')
                return {
                    ...state,
                    // dataModule: state.dataInit,
                    tagCurrent: 'All',
                };

            // const dataRender = state.dataInit.filter((item) =>
            //     item.tags?.includes(tag),
            // );
            return {
                ...state,
                tagCurrent: tag,
                // dataModule: dataRender,
            };
        }),
}));
