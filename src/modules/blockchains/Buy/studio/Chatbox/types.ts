import { ChatBoxStatus } from './chatbox-store';

export type SetChatBoxStatusParams = {
  status: ChatBoxStatus;
  isGenerating: boolean;
  isComplete: boolean;
  isListening: boolean;
};

export type PromptCategory = {
  layer: string;
  options: {
    key: string;
    title: string;
    value: string | number;
  }[];
};

export type SendPromptBodyRequest = {
  command: string;
  current_state: PromptCategory[];
};

export type SendPromptBodyResponse = {
  message: string;
  action: string;
  is_clear: boolean;
  categories: PromptCategory[];
};
