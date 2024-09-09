import MagicIcon from '@/components/MagicIcon';
import { useRef } from 'react';
import ButtonClose from './Actions/ButtonClsoe';
import ButtonStop from './Actions/ButtonStop';
import useChatBoxState from './chatbox-store';
import useChatBoxService from './hooks/useChatBoxService';
import Message from './Message';
import styles from './styles.module.scss';
import TextInput from './TextInput';
import { useParseMessage } from './hooks/usePasrMessage';

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

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
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
                  key={index}
                  className={`${styles.message} ${styles[message.sender]}`}
                >
                  {message.sender === 'bot' ? (
                    <Message
                      beforeJSON={useParseMessage(message.beforeJSON)[0]}
                      afterJSON={useParseMessage(message.afterJSON)[2]}
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
                {isGenerating && <ButtonStop />}
              </div>
            </div>
          </div>
        </div>
        <TextInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
