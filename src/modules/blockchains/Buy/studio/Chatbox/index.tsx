import MagicIcon from '@/components/MagicIcon';
import ButtonClose from './Actions/ButtonClsoe';
import useChatBoxState from './chatbox-store';
import MessageStream from './MessageStream';
import TextInput from './TextInput';
import styles from './styles.module.scss';
import DotPulse from '@/components/DotPulse';

export default function Chatbox() {
  const { messages, isWaitingReply } = useChatBoxState();

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
              {isWaitingReply && (
                <div className={`${styles.message} ${styles.bot}`}>
                  <DotPulse />
                </div>
              )}
            </div>
          </div>
        </div>
        <TextInput />
      </div>
    </div>
  );
}
