import { uniqBy } from 'lodash';
import { useEffect, useRef } from 'react';
import useFormChain from '../../../hooks/useFormChain';
import useModelCategoriesStore from '../../../stores/useModelCategoriesStore';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import { sendPromptV2 } from '../services/prompt';
import { PromptCategory } from '../types';
import {
  blockLegoResponseToModelCategory,
  modelCategoryToPromptCategory,
} from '../utils/convertApiUtils';
import { useParseMessage } from './usePasrMessage';
import { useVoiceChatSession } from './useVoiceChatSession';

export default function useChatBoxService({
  focusChatBox,
}: {
  focusChatBox: () => void;
}) {
  const { categories } = useModelCategoriesStore();
  const { getDynamicForm } = useFormChain();
  const {
    setChatBoxStatus,
    setMessages,
    setPrepareCategoryTemplate,
    messages,
  } = useChatBoxState();
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
    //   .replace('```json', '')
    //   .replace('```', '');
    // const [beforeJSON, jsonPart, afterJSON] = useParseMessage(pureResponse);
    // const blockLegoResponse = jsonPart ? JSON.parse(jsonPart) : {};

    // console.log('[useChatBoxService] parsed', {
    //   beforeJSON,
    //   jsonPart,
    //   afterJSON,
    //   blockLegoResponse,
    // });

    // const newTemplate = blockLegoResponseToModelCategory(
    //   categories!,
    //   blockLegoResponse,
    // );

    // setMessages([
    //   ...messages,
    //   {
    //     beforeJSON,
    //     jsonPart,
    //     afterJSON,
    //     template: newTemplate,
    //     sender: 'bot',
    //   },
    // ]);
    // setPrepareCategoryTemplate(uniqBy(newTemplate, 'key'));
    // focusChatBox();
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.sender === 'user') {
      handleSendPrompt(lastMessage.text);
      // handleSendPromptStream(lastMessage.text);
    }
  }, [messages]);
}
