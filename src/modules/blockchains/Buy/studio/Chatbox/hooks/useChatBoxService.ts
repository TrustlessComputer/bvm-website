import { uniqBy } from 'lodash';
import { useEffect } from 'react';
import useFormChain from '../../../hooks/useFormChain';
import useModelCategoriesStore from '../../../stores/useModelCategoriesStore';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import { mockupPromptResponsesV2 } from '../mockup/promtResponse';
import { sendPrompt } from '../services/prompt';
import {
  PromptCategory,
  SendPromptBodyRequest
} from '../types';
import {
  blockLegoResponseToModelCategory,
  modelCategoryToPromptCategory,
  parseAIResponse
} from '../utils/convertApiUtils';
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
  const {} = useVoiceChatSession();

  const handleSendPrompt = async (message: string) => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === 'user'
    ) {
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
      const prompt_body: SendPromptBodyRequest = {
        command: message,
        current_state,
      };
      const response = (await sendPrompt(prompt_body)).data;
      const pureResponse = mockupPromptResponsesV2[0];
      const parsedResponse = parseAIResponse(pureResponse);
      const blockLegoResponse = JSON.parse(
        parsedResponse.find((msg) => msg.type === 'json')?.content || '{}',
      );
      const newTemplate = blockLegoResponseToModelCategory(
        categories!,
        blockLegoResponse,
      );

      console.log('[handleSendPrompt] response', response);

      // const newTemplate = currentTemplate.filter((category) => {
      //   const promptCategory = response.actions.find(
      //     (action) => action.category.key === category.key,
      //   );

      //   console.log('[handleSendPrompt] remove', { category, promptCategory });

      //   return (
      //     !promptCategory ||
      //     promptCategory.action_type !== CategoryAction.REMOVE
      //   );
      // });

      // newTemplate.push(
      //   ...response.actions
      //     .filter((action) => action.action_type === CategoryAction.ADD)
      //     .map((act) =>
      //       promptCategoryToModelCategory(
      //         act.category,
      //         (categories || []).find(
      //           (cate) => cate.key === act.category.key,
      //         ) as IModelCategory,
      //       ),
      //     ),
      // );

      // newTemplate.forEach((category, index) => {
      //   const indexInResponse = response.actions.findIndex(
      //     (action) => action.category.key === category.key,
      //   );
      //   const categoryInModel = (categories || []).find(
      //     (cate) => cate.key === category.key,
      //   );

      //   if (indexInResponse === -1 || !categoryInModel) return;

      //   console.log('[handleSendPrompt] pre-update', {
      //     indexInResponse,
      //     action: response.actions[indexInResponse],
      //   });

      //   const action = response.actions[indexInResponse];

      //   if (action.action_type === CategoryAction.UPDATE) {
      //     console.log('[handleSendPrompt] update', {
      //       action,
      //       new: promptCategoryToModelCategory(action.category, category),
      //     });

      //     newTemplate[index] = promptCategoryToModelCategory(
      //       action.category,
      //       categoryInModel,
      //     );
      //   }
      // });

      setMessages([
        ...messages,
        {
          text: pureResponse,
          texts: parsedResponse,
          template: newTemplate,
          sender: 'bot',
        },
      ]);
      setPrepareCategoryTemplate(uniqBy(newTemplate, 'key'));
      focusChatBox();
    }
  };


  useEffect(() => {
    if (messages.length > 0) {
      handleSendPrompt(messages[messages.length - 1].text);
    }
  }, [messages]);
}
