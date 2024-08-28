import MagicIcon from '@/components/MagicIcon';
import { useCallback, useEffect, useState } from 'react';
import ButtonClose from './Actions/ButtonClsoe';
import styles from './styles.module.scss';

export default function Chatbox() {
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: string }>
  >([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

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
  }, [messages]);

  const stopVoiceInput = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      setRecognition(null);
    }
  }, [recognition]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        stopVoiceInput();
      } else if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        handleVoiceInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stopVoiceInput]);

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

    // newRecognition.onaudioend = async (event: any) => {
    //   // console.log('onaudioend', event);
    //   console.log('newRecognition.audioBlob', newRecognition.audioBlob);
    //   if (newRecognition.audioBlob) {
    //     try {
    //       const formData = new FormData();
    //       formData.append('audio', newRecognition.audioBlob, 'audio.wav');

    //       console.log('formData', newRecognition.audioBlob);
    //       const response = await fetch('/api/voice-to-text', {
    //         method: 'POST',
    //         body: formData,
    //       });
    //       if (!response.ok) {
    //         throw new Error('Failed to send audio to API');
    //       }
    //       const data = await response.json();
    //       setInputMessage(data.transcript);
    //     } catch (error) {
    //       console.error('Error sending audio to API:', error);
    //     }
    //   }
    // };

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
            <div className={styles.statusInner}>Esc to close</div>
            <div className="actions">
              {isListening && (
                <button onClick={stopVoiceInput} className={styles.voiceButton}>
                  Cancel
                </button>
              )}
              <ButtonClose />
              <button onClick={stopVoiceInput} className={styles.applyButton}>
                Apply
              </button>
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
