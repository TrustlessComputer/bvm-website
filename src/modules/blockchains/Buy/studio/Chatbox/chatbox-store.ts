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
  isWaitingReply: boolean;
  isListening: boolean;
  isGenerating: boolean;
  isComplete: boolean;
  isIdle: boolean;
  isChatboxOpen: boolean;
  status: ChatBoxStatus;
  prepareCategoryTemplate: IModelCategory[];
  setMessages: (messages: Message[]) => void;
  setIsWaitingReply: (isWaitingReply: boolean) => void;
  setInputMessage: (inputMessage: string) => void;
  setIsListening: (isListening: boolean) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsComplete: (isComplete: boolean) => void;
  setIsChatboxOpen: (isChatboxOpen: boolean) => void;
  setStatus: (status: ChatBoxStatus) => void;
  setPrepareCategoryTemplate: (
    prepareCategoryTemplate: IModelCategory[],
  ) => void;
  setChatBoxStatus: (params: SetChatBoxStatusParams) => void;
}

const useChatBoxState = create<ChatBoxState>((set) => ({
  messages: [],
  inputMessage: '',
  isWaitingReply: false,
  isIdle: true,
  isListening: false,
  isGenerating: false,
  isComplete: false,
  isChatboxOpen: false,
  status: ChatBoxStatus.Close,
  prepareCategoryTemplate: [],
  setMessages: (messages) => set({ messages }),
  setInputMessage: (inputMessage) => set({ inputMessage }),
  setIsWaitingReply: (isWaitingReply) => set({ isWaitingReply }),
  setIsListening: (isListening) => set({ isListening, isIdle: false }),
  setIsGenerating: (isGenerating) => set({ isGenerating, isIdle: false }),
  setIsComplete: (isComplete) => set({ isComplete, isIdle: false }),
  setIsChatboxOpen: (isChatboxOpen) => set({ isChatboxOpen, isIdle: false }),
  setStatus: (status) => set({ status }),
  setPrepareCategoryTemplate: (prepareCategoryTemplate) =>
    set({ prepareCategoryTemplate, isIdle: false }),
  setChatBoxStatus: (params: SetChatBoxStatusParams) => {
    set({
      ...params,
      isIdle: !params.isGenerating && !params.isComplete && !params.isListening,
    });
  },
}));

export default useChatBoxState;
