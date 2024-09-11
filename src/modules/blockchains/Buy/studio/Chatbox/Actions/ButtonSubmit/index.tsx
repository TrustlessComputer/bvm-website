import { ReactElement } from 'react';
import useChatBoxState from '../../chatbox-store';
import styles from './styles.module.scss';

export default function ButtonSubmit({
  handleSendMessage,
}: {
  handleSendMessage: (message: string) => void;
}): ReactElement {
  const { inputMessage, isGenerating, isListening } = useChatBoxState();

  return (
    <button
      onClick={() => handleSendMessage(inputMessage)}
      className={styles.sendButton}
      disabled={isGenerating || isListening}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_38769_31496)">
          <path
            d="M14.6666 1.33203L7.33325 8.66536"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.6666 1.33203L9.99992 14.6654L7.33325 8.66536L1.33325 5.9987L14.6666 1.33203Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_38769_31496">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      Submit
    </button>
  );
}
