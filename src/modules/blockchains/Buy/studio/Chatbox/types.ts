import { ChatBoxStatus } from './chatbox-store';

export type SetChatBoxStatusParams = {
  status: ChatBoxStatus;
  isGenerating: boolean;
  isComplete: boolean;
  isListening: boolean;
};

export type PromptCategory = {
  key: string;
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

export enum CategoryAction {
  UNKNOWN = 'unknown',
  ADD = 'add',
  REMOVE = 'remove',
  UPDATE = 'update',
}

export type SendPromptResponse = {
  status: number;
  data: {
    message: string;
    actions: {
      action_type: CategoryAction;
      category: PromptCategory;
    }[];
    is_clear: boolean;
  };
};