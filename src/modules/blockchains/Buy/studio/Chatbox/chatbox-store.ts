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
};

export type UserMessage = {
  text: string;
  sender: 'user';
};

export type Message = BotMessage | UserMessage;

interface ChatBoxState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendMessage: (text: string) => void;
  addMessage: (message: Message) => void;
  updateLastBotMessage: (markdown: string) => void;

  inputMessage: string;
  setInputMessage: (inputMessage: string) => void;

  isListening: boolean;
  isGenerating: boolean;
  isComplete: boolean;
  isIdle: boolean;
  status: ChatBoxStatus;
  setChatBoxStatus: (params: SetChatBoxStatusParams) => void;

  isChatboxOpen: boolean;
  setIsChatboxOpen: (isChatboxOpen: boolean) => void;

  prepareCategoryTemplate: IModelCategory[];
  setPrepareCategoryTemplate: (
    prepareCategoryTemplate: IModelCategory[],
  ) => void;
}

const useChatBoxState = create<ChatBoxState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateLastBotMessage: (markdown: string) =>
    set((state) => {
      const messages = [...state.messages];
      const lastIndex = messages.length - 1;
      const lastMessage = messages[lastIndex];

      if (lastMessage?.sender !== 'bot') return { messages };

      messages[lastIndex] = {
        ...lastMessage,
        beforeJSON: markdown,
      };

      return {
        messages,
      };
    }),

  inputMessage: '',
  setInputMessage: (inputMessage) => set({ inputMessage }),

  isIdle: true,
  isListening: false,
  isGenerating: false,
  isComplete: false,
  status: ChatBoxStatus.Close,
  setChatBoxStatus: (params: SetChatBoxStatusParams) => {
    set({
      ...params,
      isIdle: !params.isGenerating && !params.isComplete && !params.isListening,
    });
  },

  isChatboxOpen: false,
  setIsChatboxOpen: (isChatboxOpen) => set({ isChatboxOpen }),

  prepareCategoryTemplate: [],
  setPrepareCategoryTemplate: (prepareCategoryTemplate) =>
    set({ prepareCategoryTemplate, isIdle: false }),

  sendMessage: (text: string) =>
    set((state) => {
      if (text.trim() === '') return { ...state };

      const message: UserMessage = {
        sender: 'user',
        text,
      };

      return {
        messages: [...state.messages, message],
        inputMessage: '',
      };
    }),
}));

export default useChatBoxState;
