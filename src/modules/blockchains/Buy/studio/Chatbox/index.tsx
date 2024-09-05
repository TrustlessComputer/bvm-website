import MagicIcon from '@/components/MagicIcon';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ButtonApply from './Actions/ButtonApply';
import ButtonCancel from './Actions/ButtonCancel';
import ButtonClose from './Actions/ButtonClsoe';
import ButtonStop from './Actions/ButtonStop';
import useChatBoxState, { ChatBoxStatus } from './chatbox-store';
import useChatBoxService from './hooks/useChatBoxService';
import Message from './Message';
import styles from './styles.module.scss';
import TextInput from './TextInput';

export default function Chatbox() {
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
    isIdle,
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
    newRecognition.lang = 'en-US'; // Set language to English

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

  useChatBoxService({ focusChatBox });
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

            <div className={styles.close}>
              <ButtonClose />
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
              <div className={styles.statusInner}>{isIdle ? '' : status}</div>
              <div className={styles.statusButtons}>
                {isListening && <ButtonCancel onClick={stopVoiceInput} />}
                {/* {isComplete && <ButtonApply />} */}
                {isGenerating && <ButtonStop />}
                {/* {isClose && <ButtonClose />} */}
              </div>
            </div>
          </div>
        </div>
        <TextInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
