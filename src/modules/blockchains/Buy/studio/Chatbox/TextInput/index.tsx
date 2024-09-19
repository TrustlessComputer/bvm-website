import { ReactElement } from 'react';
import ButtonSubmit from '../Actions/ButtonSubmit';
import ButtonVoice from '../Actions/ButtonVoice';
import useChatBoxState from '../chatbox-store';
import LabelListening from '../LabelListening';
import styles from './styles.module.scss';

export default function TextInput({ handleSendMessage }: any): ReactElement {
  const { inputMessage, isListening, isGenerating, setInputMessage } =
    useChatBoxState((state) => state);

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
          <ButtonVoice handleSendMessage={handleSendMessage} />
          <ButtonSubmit handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
