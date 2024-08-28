import { create } from 'zustand';
export enum ChatBoxStatus {
  Generating = 'Generating...',
  Cancel = 'Esc to cancel',
  Complete = 'Complete',
  Close = 'Esc to close',
}


interface ChatBoxState {
  messages: Array<{ text: string; sender: string }>;
  inputMessage: string;
  isListening: boolean;
  isGenerating: boolean;
  isComplete: boolean;
  isChatboxOpen: boolean;
  status: ChatBoxStatus;
  setMessages: (messages: Array<{ text: string; sender: string }>) => void;
  setInputMessage: (inputMessage: string) => void;
  setIsListening: (isListening: boolean) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsComplete: (isComplete: boolean) => void;
  setIsChatboxOpen: (isChatboxOpen: boolean) => void;
  setStatus: (status: ChatBoxStatus) => void;
}

const useChatBoxState = create<ChatBoxState>((set) => ({
  messages: [],
  inputMessage: '',
  isListening: false,
  isGenerating: false,
  isComplete: false,
  isChatboxOpen: false,
  status: ChatBoxStatus.Close,
  setMessages: (messages) => set({ messages }),
  setInputMessage: (inputMessage) => set({ inputMessage }),
  setIsListening: (isListening) => set({ isListening }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsComplete: (isComplete) => set({ isComplete }),
  setIsChatboxOpen: (isChatboxOpen) => set({ isChatboxOpen }),
  setStatus: (status) => set({ status }),
}));

export default useChatBoxState;
