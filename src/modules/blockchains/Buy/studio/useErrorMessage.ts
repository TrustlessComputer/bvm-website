import { create } from 'zustand'

interface IProp{
  isShowErrorMessage: boolean,
  toggleErrorMessage: (b: boolean) => void,
}
export const useErrorMessage = create<IProp>((set) => ({
  isShowErrorMessage: false,
  toggleErrorMessage: (b: boolean) => set(() => ({ isShowErrorMessage: b })),
}))
