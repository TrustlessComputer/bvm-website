import ButtonRecord from '../Actions/ButtonRecord';
import ButtonSubmit from '../Actions/ButtonSubmit';
import useChatBoxState from '../chatbox-store';
import useChatBoxServices from '../hooks/useChatBoxServices';
import LabelListening from '../LabelListening';
import styles from './styles.module.scss';

export default function TextInput() {
  const { inputMessage, isListening, isGenerating, setInputMessage } =
    useChatBoxState();
  const { handleSendMessage } = useChatBoxServices();

  return (
    <div className={styles.input}>
      <h3 className={styles.input_heading}>Prompt</h3>
      <div className={styles.inputWrapper}>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }
          }}
          className={styles.inputField}
          disabled={isListening || isGenerating}
        />

        {!isListening && inputMessage === '' && (
          <div className={styles.inputOverlay}>Type your prompt</div>
        )}

        {isListening && <LabelListening />}

        <div className={styles.buttonWrapper}>
          <ButtonRecord />
          <ButtonSubmit />
        </div>
      </div>
      <a
        className={styles.poweredBy}
        target={'_blank'}
        href="https://eternalai.org"
      >
        Powered by Eternal AI
      </a>
    </div>
  );
}
