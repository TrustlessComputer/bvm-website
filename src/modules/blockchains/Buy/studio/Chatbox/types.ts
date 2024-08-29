import { ChatBoxStatus } from './chatbox-store';

export type SetChatBoxStatusParams = {
  status: ChatBoxStatus;
  isGenerating: boolean;
  isComplete: boolean;
  isListening: boolean;
};
