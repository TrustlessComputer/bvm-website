import { useMemo } from 'react';
import { create } from 'zustand';

//Interface
type IAgentNameInputStore = {
  agentName?: string;
  setAgentName: (text: string) => void;
};

//Store
export const AgentNameInputStore = create<IAgentNameInputStore>((set) => ({
  agentName: '',
  setAgentName: (text) => set({ agentName: text }),
}));

// HOOK
export const useAgentNameInputStore = () => {
  const storeData = AgentNameInputStore();
  const { setAgentName } = storeData;

  const resetState = () => {
    setAgentName('');
  };

  return {
    ...storeData,
    resetState,
  };
};
