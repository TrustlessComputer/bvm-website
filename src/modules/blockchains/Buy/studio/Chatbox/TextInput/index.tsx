import { ReactElement } from 'react';
import useChatBoxState from '../chatbox-store';
import LabelListening from '../LabelListening';
import styles from './styles.module.scss';
import Inputs from '../PromptInputs';

export default function TextInput({
  handleSendMessage,
}: {
  handleSendMessage: any;
}): ReactElement {
  const { inputMessage, isListening, isGenerating, setInputMessage } =
    useChatBoxState((state) => state);

  return (
    <div className={styles.input}>
      <h3 className={styles.input_heading}>
        <Inputs />
      </h3>
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
          disabled={isListening || isGenerating}
        />
        {isListening && <LabelListening />}
        {!isListening && inputMessage === '' && (
          <div className={styles.inputOverlay}>
            Type your instructions or Press <strong>Control + Shift + V</strong>{' '}
            to voice prompt
          </div>
        )}
        <div className={styles.buttonWrapper}>
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
