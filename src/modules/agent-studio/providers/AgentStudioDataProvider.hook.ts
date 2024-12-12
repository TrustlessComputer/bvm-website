import { useContext } from 'react';
import { AgentStudioDataContext } from './AgentStudioDataProvider';

export const useAgentStudioDataProvider = () => {
  const context = useContext(AgentStudioDataContext);
  if (!context) {
    throw new Error(
      'AgentStudioDataContext not found, useAgentStudioDataProvider must be used within the AgentStudioDataContext.Provider',
    );
  }

  //Customize  here!

  return context;
};
