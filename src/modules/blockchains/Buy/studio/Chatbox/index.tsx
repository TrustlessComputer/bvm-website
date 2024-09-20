import MagicIcon from '@/components/MagicIcon';
import { useRef } from 'react';
import ButtonClose from './Actions/ButtonClsoe';
import useChatBoxState from './chatbox-store';
import useChatBoxService from './hooks/useChatBoxService';
import MessageStream from './MessageStream';
import styles from './styles.module.scss';
import TextInput from './TextInput';

export default function Chatbox() {
  const {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    isGenerating,
    status,
    isIdle,
  } = useChatBoxState();

  const elChatBox = useRef<HTMLDivElement>(null);

  const focusChatBox = () => {
    setTimeout(() => {
      if (elChatBox.current)
        elChatBox.current.scrollTo(0, elChatBox.current.scrollHeight);
    }, 5);
  };

  const handleSendMessage = (message: string, isVoice = false) => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user', isVoice }]);
      setInputMessage('');
      focusChatBox();
    }
  };

  useChatBoxService({ focusChatBox });
  return (
    <div className={styles.chatbox}>
      <div className={styles.chatboxInner}>
        <div className={styles.body}>
          <div className={styles.header}>
            <div className={styles.title}>
              <MagicIcon color="black" />
              Ai voice prompt
            </div>

            <div className={styles.close}>
              <ButtonClose />
            </div>
          </div>
          <div className={styles.body_inner}>
            <div id="chatbox-messages" className={styles.chats} ref={elChatBox}>
              {messages.map(
                (message, index) =>
                  !message?.isVoice && (
                    <div
                      key={index}
                      className={`${styles.message} ${styles[message.sender]}`}
                    >
                      {message.sender === 'bot' ? (
                        <MessageStream message={message.beforeJSON} />
                      ) : (
                        message.text
                      )}
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
        <TextInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
