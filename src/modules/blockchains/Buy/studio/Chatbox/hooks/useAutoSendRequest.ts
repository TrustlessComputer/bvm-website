import { useEffect } from 'react';
import useFormChain from '../../../hooks/useFormChain';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import { sendPromptV2 } from '../services/prompt';
import { PromptCategory } from '../types';
import { modelCategoryToPromptCategory } from '../utils/convertApiUtils';
import { useVoiceChatSession } from './useVoiceChatSession';

export default function useAutoSendRequest() {
  const { getDynamicForm } = useFormChain();
  const { setChatBoxStatus, messages } = useChatBoxState();
  const { getVoiceChatAiSessionId } = useVoiceChatSession();

  const handleSendPrompt = async (message: string) => {
    setChatBoxStatus({
      status: ChatBoxStatus.Generating,
      isGenerating: true,
      isComplete: false,
      isListening: false,
    });

    const currentTemplate = getDynamicForm().dynamicForm;
    const current_state: PromptCategory[] = currentTemplate.map(
      modelCategoryToPromptCategory,
    );

    await sendPromptV2({
      session_id: getVoiceChatAiSessionId()!,
      user_session: getVoiceChatAiSessionId()!,
      stream: true,
      command: message,
      current_state,
    });
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.sender === 'user') {
      handleSendPrompt(lastMessage.text);
    }
  }, [messages]);
}
