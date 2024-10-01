import React from 'react';
import useFormChain from '../../../hooks/useFormChain';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import { PromptCategory } from '../types';
import { sendPromptV2 } from '../services/prompt';
import { modelCategoryToPromptCategory } from '../utils/convertApiUtils';
import { useVoiceChatSession } from './useVoiceChatSession';

const useChatBoxServices = () => {
  const { sendMessage, setChatBoxStatus } = useChatBoxState();
  const { getDynamicForm } = useFormChain();
  const { getVoiceChatAiSessionId } = useVoiceChatSession();

  async function sendPrompt(text: string) {
    const currentTemplate = getDynamicForm().dynamicForm;
    const current_state: PromptCategory[] = currentTemplate.map(
      modelCategoryToPromptCategory,
    );

    setChatBoxStatus({
      isComplete: false,
      isGenerating: true,
      isListening: false,
      status: ChatBoxStatus.Cancel,
    });

    await sendPromptV2({
      session_id: getVoiceChatAiSessionId()!,
      user_session: getVoiceChatAiSessionId()!,
      stream: true,
      command: text,
      current_state,
    });
  }

  function handleSendMessage(text: string) {
    sendMessage(text);
    sendPrompt(text);
  }

  return {
    handleSendMessage,
  };
};

export default useChatBoxServices;
