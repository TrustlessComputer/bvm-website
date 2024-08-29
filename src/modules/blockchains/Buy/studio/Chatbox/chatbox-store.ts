import { IModelCategory } from '@/types/customize-model';
import { create } from 'zustand';
export enum ChatBoxStatus {
  Generating = 'Generating...',
  Cancel = 'Esc to cancel',
  Complete = 'Completed',
  Close = 'Esc to close',
}

interface ChatBoxState {
  messages: Array<{ text: string; sender: string; template: IModelCategory[] }>;
  inputMessage: string;
  isListening: boolean;
  isGenerating: boolean;
  isComplete: boolean;
  isChatboxOpen: boolean;
  status: ChatBoxStatus;
  prepareCategoryTemplate: IModelCategory[];
  setMessages: (
    messages: Array<{
      text: string;
      sender: string;
      template: IModelCategory[];
    }>,
  ) => void;
  setInputMessage: (inputMessage: string) => void;
  setIsListening: (isListening: boolean) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsComplete: (isComplete: boolean) => void;
  setIsChatboxOpen: (isChatboxOpen: boolean) => void;
  setStatus: (status: ChatBoxStatus) => void;
  setPrepareCategoryTemplate: (
    prepareCategoryTemplate: IModelCategory[],
  ) => void;
}

const useChatBoxState = create<ChatBoxState>((set) => ({
  messages: [],
  inputMessage: '',
  isListening: false,
  isGenerating: false,
  isComplete: false,
  isChatboxOpen: false,
  status: ChatBoxStatus.Close,
  prepareCategoryTemplate: [],
  setMessages: (messages) => set({ messages }),
  setInputMessage: (inputMessage) => set({ inputMessage }),
  setIsListening: (isListening) => set({ isListening }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsComplete: (isComplete) => set({ isComplete }),
  setIsChatboxOpen: (isChatboxOpen) => set({ isChatboxOpen }),
  setStatus: (status) => set({ status }),
  setPrepareCategoryTemplate: (prepareCategoryTemplate) =>
    set({ prepareCategoryTemplate }),
}));

export default useChatBoxState;
