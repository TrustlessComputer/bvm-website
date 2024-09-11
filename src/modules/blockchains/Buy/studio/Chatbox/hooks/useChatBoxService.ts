import { uniqBy } from 'lodash';
import { useEffect, useRef } from 'react';
import useFormChain from '../../../hooks/useFormChain';
import useModelCategoriesStore from '../../../stores/useModelCategoriesStore';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import { sendPromptV2 } from '../services/prompt';
import { PromptCategory } from '../types';
import {
  blockLegoResponseToModelCategory,
  modelCategoryToPromptCategory
} from '../utils/convertApiUtils';
import { useAIStream } from './useAIStream';
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
    isGenerating,
    isComplete
  } = useChatBoxState();
  const { getVoiceChatAiSessionId } = useVoiceChatSession();
  const { stream, cancel } = useAIStream();
  const refMessageRender = useRef<string>('');


  const handleSendPromptStream = async (message: string) => {
    setChatBoxStatus({
      status: ChatBoxStatus.Generating,
      isGenerating: true,
      isComplete: false,
      isListening: false,
    });

    refMessageRender.current = '';

    const result = await stream({ messages: [{ role: 'user', content: message }], onStream: (data, isDone) => {
      if(data.choices[0].delta.content === undefined) return;
      refMessageRender.current += data.choices[0].delta.content;

      const newMessage = () => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.sender === 'bot') {
         
          const updatedMessages = [...messages];
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            beforeJSON: refMessageRender.current,
            afterJSON: '',
            template: [],
          };
          return updatedMessages;
        } else {
         
          return [
            ...messages,
            {
              beforeJSON: refMessageRender.current,
              template: [],
              afterJSON: '',
              sender: 'bot',
            },
          ];
        }
      }
   
      setMessages(newMessage() as Message[]);   
      focusChatBox();
    },
      onDone: () => {
        setChatBoxStatus({
          status:
            // prepareCategoryTemplate.length > 0
            //   ? ChatBoxStatus.Complete
            //   : ChatBoxStatus.Close,
             ChatBoxStatus.Close,
          isGenerating: false,
          isComplete: false,//prepareCategoryTemplate.length > 0,
          isListening: false,
        })
      }
    });
  };

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
    const pureResponse = (
      await sendPromptV2({
        session_id: getVoiceChatAiSessionId()!,
        command: message,
        current_state,
      })
    ).data.content
      .replace('```json', '')
      .replace('```', '');
    const [beforeJSON, jsonPart, afterJSON] = useParseMessage(pureResponse);
    const blockLegoResponse = jsonPart ? JSON.parse(jsonPart) : {};

    console.log('[useChatBoxService] parsed', {
      beforeJSON,
      jsonPart,
      afterJSON,
      blockLegoResponse,
    });

    const newTemplate = blockLegoResponseToModelCategory(
      categories!,
      blockLegoResponse,
    );

    setMessages([
      ...messages,
      {
        beforeJSON,
        jsonPart,
        afterJSON,
        template: newTemplate,
        sender: 'bot',
      },
    ]);
    setPrepareCategoryTemplate(uniqBy(newTemplate, 'key'));
    focusChatBox();
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.sender === 'user') {
      // handleSendPrompt(lastMessage.text);
      handleSendPromptStream(lastMessage.text);
    }
  }, [messages]);


  useEffect(() => {
    !isGenerating && !isComplete && cancel();
  }, [isGenerating, isComplete])
}
