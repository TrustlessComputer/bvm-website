import MagicIcon from '@/components/MagicIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ButtonApply from './Actions/ButtonApply';
import ButtonClose from './Actions/ButtonClsoe';
import ButtonStop from './Actions/ButtonStop';
import useChatBoxState from './chatbox-store';
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
  } = useChatBoxState();

  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  useEffect(() => {
    // Simulate response from the chatbot
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === 'user'
    ) {
      setTimeout(() => {
        setMessages([
          ...messages,
          { text: 'Hello! How can I help you?', sender: 'bot' },
        ]);
      }, 1000);
    }
  }, [messages, setMessages]);

  const stopVoiceInput = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      setRecognition(null);
    }
  }, [recognition, setIsListening]);

  const isClose = useMemo(() => {
    return !isComplete && !isGenerating && !isListening;
  }, [isComplete, isGenerating, isListening]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isClose) {
          // Handle close action
        } else if (isListening) {
          stopVoiceInput();
        }
      } else if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        handleVoiceInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stopVoiceInput, isClose]);

  const handleVoiceInput = () => {
    setIsListening(true);
    setInputMessage(''); // Clear input when starting voice input
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();

    // Remove the language setting to allow auto-detection
    newRecognition.continuous = false;
    newRecognition.interimResults = false;

    newRecognition.onresult = (event: any) => {
      console.log('event.results', event.results);
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
      setRecognition(null);
    };

    newRecognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
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
            <div className={styles.chats}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${styles[message.sender]}`}
                >
                  {message.text}
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
          <div className={styles.inputWrapper}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && !e.shiftKey && handleSendMessage()
              }
              className={styles.inputField}
              disabled={isListening}
            />

            {isListening && (
              <div className={styles.listeningOverlay}>Listening...</div>
            )}

            {!isListening && inputMessage === '' && (
              <div className={styles.inputOverlay}>
                Type your instructions or Press <strong>Control + V</strong> to
                voice prompt
              </div>
            )}

            <div className={styles.buttonWrapper}>
              <button onClick={handleSendMessage} className={styles.sendButton}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
