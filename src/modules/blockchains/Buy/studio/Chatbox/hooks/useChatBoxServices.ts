import useFocusChatBox from './useFocusChatBox';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import { sendPromptV2 } from '../services/prompt';
import { PromptCategory } from '../types';
import { modelCategoryToPromptCategory } from '../utils/convertApiUtils';
import useFormChain from '../../../hooks/useFormChain';
import { useVoiceChatSession } from './useVoiceChatSession';

const useChatBoxServices = () => {
  const { focusChatBox } = useFocusChatBox();
  const {
    setMessages,
    messages,
    setInputMessage,
    setChatBoxStatus,
    setIsWaitingReply,
  } = useChatBoxState();
  const { getDynamicForm } = useFormChain();
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

    setIsWaitingReply(true);

    await sendPromptV2({
      session_id: getVoiceChatAiSessionId()!,
      user_session: getVoiceChatAiSessionId()!,
      stream: true,
      command: message,
      current_state,
    });

    setIsWaitingReply(false);
  };

  const handleSendMessage = (message: string, isVoice = false) => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user', isVoice }]);
      setInputMessage('');
      handleSendPrompt(message);
      focusChatBox();
    }
  };

  return { handleSendMessage };
};

export default useChatBoxServices;
