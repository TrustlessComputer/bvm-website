import { IModelCategory } from '@/types/customize-model';
import { create } from 'zustand';
import { SetChatBoxStatusParams } from './types';
export enum ChatBoxStatus {
  Generating = 'Generating',
  Cancel = 'Esc to cancel',
  Complete = 'Completed',
  Close = '',
}

export type BotMessage = {
  beforeJSON: string;
  jsonPart?: string;
  afterJSON?: string;
  sender: 'bot';
  template?: IModelCategory[];
  isVoice?: boolean;
};

export type UserMessage = {
  text: string;
  sender: 'user';
  isVoice?: boolean;
};

export type Message = BotMessage | UserMessage;

interface ChatBoxState {
  messages: Message[];
  inputMessage: string;
  isListening: boolean;
  isGenerating: boolean;
  isComplete: boolean;
  isIdle: boolean;
  isChatboxOpen: boolean;
  status: ChatBoxStatus;
  prepareCategoryTemplate: IModelCategory[];
  setMessages: (messages: Message[]) => void;
  setInputMessage: (inputMessage: string) => void;
  setIsChatboxOpen: (isChatboxOpen: boolean) => void;
  setPrepareCategoryTemplate: (
    prepareCategoryTemplate: IModelCategory[],
  ) => void;
  setChatBoxStatus: (params: SetChatBoxStatusParams) => void;
}

const useChatBoxState = create<ChatBoxState>((set) => ({
  messages: [],
  inputMessage: '',
  isIdle: true,
  isListening: false,
  isGenerating: false,
  isComplete: false,
  isChatboxOpen: false,
  status: ChatBoxStatus.Close,
  prepareCategoryTemplate: [],
  setMessages: (messages) => set({ messages }),
  setInputMessage: (inputMessage) => set({ inputMessage }),
  setIsChatboxOpen: (isChatboxOpen) => set({ isChatboxOpen }),
  setPrepareCategoryTemplate: (prepareCategoryTemplate) =>
    set({ prepareCategoryTemplate }),
  setChatBoxStatus: (params: SetChatBoxStatusParams) => {
    set({
      ...params,
      isIdle: !params.isGenerating && !params.isListening,
    });
  },
}));

export default useChatBoxState;
