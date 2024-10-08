import useChatBoxState, { ChatBoxStatus } from '../../chatbox-store';
import styles from './styles.module.scss';

const ButtonStop = () => {
  const { setChatBoxStatus } = useChatBoxState((state) => state);
  return (
    <button
      className={styles.buttonStop}
      onClick={() =>
        setChatBoxStatus({
          status: ChatBoxStatus.Close,
          isGenerating: false,
          isComplete: false,
          isListening: false,
        })
      }
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_38364_75522)">
          <path
            d="M10.1158 5.69531H5.89034C5.78918 5.69531 5.70612 5.77465 5.70612 5.87741V10.1487C5.70612 10.2493 5.78864 10.3319 5.89034 10.3319H10.1158C10.217 10.3319 10.299 10.2499 10.299 10.1487V5.87741C10.2985 5.77518 10.217 5.69531 10.1158 5.69531Z"
            fill="#030104"
          />
          <path
            d="M8.00311 0.00390625C3.58541 0.00390625 0.00311279 3.58514 0.00311279 8.00391C0.00311279 12.4227 3.58541 16.0039 8.00311 16.0039C12.4213 16.0039 16.002 12.4227 16.002 8.00391C16.002 3.58514 12.4213 0.00390625 8.00311 0.00390625ZM8.00311 14.6675C4.32285 14.6675 1.33902 11.6836 1.33902 8.00391C1.33902 4.32257 4.32285 1.33928 8.00311 1.33928C11.6839 1.33928 14.6661 4.32257 14.6661 8.00391C14.6661 11.6836 11.6839 14.6675 8.00311 14.6675Z"
            fill="#030104"
          />
        </g>
        <defs>
          <clipPath id="clip0_38364_75522">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      Stop chat
    </button>
  );
};

export default ButtonStop;
