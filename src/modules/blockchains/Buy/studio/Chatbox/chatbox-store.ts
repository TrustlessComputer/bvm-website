import { create } from 'zustand';

interface ChatBoxState {
  messages: Array<{ text: string; sender: string }>;
  inputMessage: string;
  isListening: boolean;
  isGenerating: boolean;
  isComplete: boolean;
  status: 'Generating...' | 'Esc to cancel' | 'Complete' | 'Esc to close';
  setMessages: (messages: Array<{ text: string; sender: string }>) => void;
  setInputMessage: (inputMessage: string) => void;
  setIsListening: (isListening: boolean) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsComplete: (isComplete: boolean) => void;
  setStatus: (status: 'Generating...' | 'Esc to cancel' | 'Complete' | 'Esc to close') => void;
}

const useChatBoxState = create<ChatBoxState>((set) => ({
  messages: [],
  inputMessage: '',
  isListening: false,
  isGenerating: false,
  isComplete: false,
  status: 'Esc to close',
  setMessages: (messages) => set({ messages }),
  setInputMessage: (inputMessage) => set({ inputMessage }),
  setIsListening: (isListening) => set({ isListening }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsComplete: (isComplete) => set({ isComplete }),
  setStatus: (status) => set({ status }),
}));

export default useChatBoxState;