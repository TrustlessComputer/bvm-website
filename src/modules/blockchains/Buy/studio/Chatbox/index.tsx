import MagicIcon from '@/components/MagicIcon';
import { useRef } from 'react';
import ButtonClose from './Actions/ButtonClsoe';
import useChatBoxState from './chatbox-store';
import MessageStream from './MessageStream';
import styles from './styles.module.scss';
import TextInput from './TextInput';
import useFocusChatBox from './hooks/useFocusChatBox';

export default function Chatbox() {
  const { messages } = useChatBoxState();

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
            <div id="chatbox-messages" className={styles.chats}>
              {messages.map((message, index) => (
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
              ))}
            </div>
          </div>
        </div>
        <TextInput />
      </div>
    </div>
  );
}
