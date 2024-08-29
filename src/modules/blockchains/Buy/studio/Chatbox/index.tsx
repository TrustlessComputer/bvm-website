import MagicIcon from '@/components/MagicIcon';
import LabelListening from '@/modules/blockchains/Buy/studio/Chatbox/LabelListening';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ButtonApply from './Actions/ButtonApply';
import ButtonClose from './Actions/ButtonClsoe';
import ButtonStop from './Actions/ButtonStop';
import useChatBoxState, { ChatBoxStatus } from './chatbox-store';
import Message from './Message';
import { categoryTemplate } from './mockup/categoryTemplate';
import styles from './styles.module.scss';

export default function Chatbox() {
  const {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    isListening,
    setIsListening,
    isGenerating,
    setIsGenerating,
    isComplete,
    setIsComplete,
    status,
    setStatus,
    setIsChatboxOpen,
    prepareCategoryTemplate,
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

  useEffect(() => {
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
      setTimeout(() => {
        const template = categoryTemplate;

        setMessages([
          ...messages,
          {
            text: 'Converted prompt text from voice. Converted prompt text from voice. Converted prompt text from voice. Converted prompt text from voice. \n\nSingle sentence.\n\n',
            template,
            sender: 'bot',
          },
        ]);
        setChatBoxStatus({
          status: ChatBoxStatus.Complete,
          isGenerating: false,
          isComplete: true,
          isListening: false,
        });
        setPrepareCategoryTemplate(template);
        focusChatBox();
      }, 1000);
    }
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
        handleVoiceInput();
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
                  key={index}
                  className={`${styles.message} ${styles[message.sender]}`}
                >
                  {message.sender === 'bot' ? (
                    <Message
                      message={message.text}
                      template={message.template}
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
                {isListening && (
                  <button
                    onClick={stopVoiceInput}
                    className={styles.voiceButton}
                  >
                    Cancel
                  </button>
                )}
                {isComplete && <ButtonApply />}
                {isGenerating && <ButtonStop />}
                {isClose && <ButtonClose />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.input}>
          <h3 className={styles.input_heading}>Prompt</h3>
          <div className={styles.inputWrapper}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className={styles.inputField}
              disabled={isListening}
            />
            {isListening && <LabelListening />}
            {!isListening && inputMessage === '' && (
              <div className={styles.inputOverlay}>
                Type your instructions or Press{' '}
                <strong>Control + Shift + V</strong> to voice prompt
              </div>
            )}
            <div className={styles.buttonWrapper}>
              <button onClick={handleSendMessage} className={styles.sendButton}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
