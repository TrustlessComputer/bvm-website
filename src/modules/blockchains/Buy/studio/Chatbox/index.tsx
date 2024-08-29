import MagicIcon from '@/components/MagicIcon';
import { IModelCategory } from '@/types/customize-model';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useFormChain from '../../hooks/useFormChain';
import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
import ButtonApply from './Actions/ButtonApply';
import ButtonCancel from './Actions/ButtonCancle';
import ButtonClose from './Actions/ButtonClsoe';
import ButtonStop from './Actions/ButtonStop';
import useChatBoxState, { ChatBoxStatus } from './chatbox-store';
import Message from './Message';
import { sendPrompt } from './services/prompt';
import styles from './styles.module.scss';
import TextInput from './TextInput';
import { CategoryAction, PromptCategory, SendPromptBodyRequest } from './types';
import {
  modelCategoryToPromptCategory,
  promptCategoryToModelCategory,
} from './utils/convertApiUtils';

export default function Chatbox() {
  const { categories } = useModelCategoriesStore();
  const { getDynamicForm } = useFormChain();

  const [indexMockup, setIndexMockup] = useState(0);

  const {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    isListening,
    isGenerating,
    isComplete,
    status,
    isChatboxOpen,
    setIsChatboxOpen,
    setPrepareCategoryTemplate,
    setChatBoxStatus,
  } = useChatBoxState();

  const elChatBox = useRef<HTMLDivElement>(null);
  const [recognition, setRecognition] = useState<any>(null);

  const focusChatBox = () => {
    setTimeout(() => {
      if (elChatBox.current)
        elChatBox.current.scrollTo(0, elChatBox.current.scrollHeight);
    }, 5);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([
        ...messages,
        { text: inputMessage, template: [], sender: 'user' },
      ]);
      setInputMessage('');
      focusChatBox();
    }
  };

  const handleSendPrompt = async () => {
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
        command: inputMessage,
        current_state,
      };

      // const response = await sendPrompt(prompt_body);
      const response = mockupPromptResponses[indexMockup];
      setIndexMockup(indexMockup + 1);

      const newTemplate = currentTemplate.filter((category) => {
        const promptCategory = response.actions.find(
          (action) => action.category.layer === category.key,
        );

        console.log('[handleSendPrompt] remove', { category, promptCategory });

        return (
          !promptCategory ||
          promptCategory.action_type !== CategoryAction.REMOVE
        );
      });

      console.log('[handleSendPrompt] newTemplate remove', newTemplate);

      newTemplate.push(
        ...response.actions
          .filter((action) => action.action_type === CategoryAction.ADD)
          .map((act) =>
            promptCategoryToModelCategory(
              act.category,
              (categories || []).find(
                (cate) => cate.key === act.category.layer,
              ) as IModelCategory,
            ),
          ),
      );

      console.log('[handleSendPrompt] newTemplate add', newTemplate);

      newTemplate.forEach((category, index) => {
        const indexInResponse = response.actions.findIndex(
          (action) => action.category.layer === category.key,
        );
        const categoryInModel = (categories || []).find(
          (cate) => cate.key === category.key,
        );

        if (indexInResponse === -1 || !categoryInModel) return;

        console.log('[handleSendPrompt] pre-update', {
          indexInResponse,
          action: response.actions[indexInResponse],
        });

        const action = response.actions[indexInResponse];

        if (action.action_type === CategoryAction.UPDATE) {
          console.log('[handleSendPrompt] update', {
            action,
            new: promptCategoryToModelCategory(action.category, category),
          });

          newTemplate[index] = promptCategoryToModelCategory(
            action.category,
            categoryInModel,
          );
        }
      });

      console.log('[handleSendPrompt] newTemplate', newTemplate);

      setMessages([
        ...messages,
        {
          text: response.message,
          template: newTemplate,
          sender: 'bot',
        },
      ]);

      setPrepareCategoryTemplate(newTemplate);
      focusChatBox();
    }
  };

  useEffect(() => {
    handleSendPrompt();
  }, [messages]);

  const stopVoiceInput = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setChatBoxStatus({
        status: ChatBoxStatus.Cancel,
        isGenerating: false,
        isComplete: false,
        isListening: false,
      });
      setRecognition(null);
    }
  }, [recognition]);

  const isClose = useMemo(() => {
    return !isComplete && !isGenerating && !isListening;
  }, [isComplete, isGenerating, isListening]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isClose) {
          setIsChatboxOpen(false);
        } else if (isListening) {
          stopVoiceInput();
        } else if (isGenerating) {
          setChatBoxStatus({
            status: ChatBoxStatus.Cancel,
            isGenerating: false,
            isComplete: false,
            isListening: false,
          });
        }
      } else if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        !isGenerating && handleVoiceInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stopVoiceInput, isClose, isGenerating, isListening]);

  const handleVoiceInput = () => {
    setChatBoxStatus({
      status: ChatBoxStatus.Cancel,
      isGenerating: false,
      isComplete: false,
      isListening: true,
    });
    setInputMessage('');
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();

    newRecognition.continuous = false;
    newRecognition.interimResults = false;

    newRecognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setChatBoxStatus({
        status: ChatBoxStatus.Cancel,
        isGenerating: false,
        isComplete: false,
        isListening: false,
      });
      setRecognition(null);
    };

    newRecognition.onerror = (event: any) => {
      setChatBoxStatus({
        status: ChatBoxStatus.Cancel,
        isGenerating: false,
        isComplete: false,
        isListening: false,
      });
      setRecognition(null);
    };

    newRecognition.start();
    setRecognition(newRecognition);
  };

  const isOpenVoice = useMemo(() => {
    return isChatboxOpen;
  }, [isChatboxOpen]);

  useEffect(() => {
    if (isOpenVoice) {
      handleVoiceInput();
    }

    return () => {
      stopVoiceInput();
    };
  }, [isOpenVoice]);

  return (
    <div className={styles.chatbox}>
      <div className={styles.chatboxInner}>
        <div className={styles.body}>
          <div className={styles.header}>
            <div className={styles.title}>
              <MagicIcon color="black" />
              Composer
            </div>
          </div>
          <div className={styles.body_inner}>
            <div className={styles.chats} ref={elChatBox}>
              {messages.map((message, index) => (
                <div
                  key={message.text}
                  className={`${styles.message} ${styles[message.sender]}`}
                >
                  {message.sender === 'bot' ? (
                    <Message
                      key={message.text}
                      message={message.text}
                      template={message.template}
                      onUpdateScroll={focusChatBox}
                    />
                  ) : (
                    message.text
                  )}
                </div>
              ))}
            </div>
            <div className={styles.status}>
              <div className={styles.statusInner}>{status}</div>
              <div className={styles.statusButtons}>
                {isListening && <ButtonCancel onClick={stopVoiceInput} />}
                {isComplete && <ButtonApply />}
                {isGenerating && <ButtonStop />}
                {isClose && <ButtonClose />}
              </div>
            </div>
          </div>
        </div>
        <TextInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
