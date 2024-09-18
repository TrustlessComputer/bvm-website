import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import useChatBoxState, { ChatBoxStatus } from '../../chatbox-store';
import styles from './styles.module.scss';

type Props = {
  handleSendMessage: (message: string) => void;
};

export default function ButtonVoice({
  handleSendMessage,
}: Props): ReactElement {
  const {
    isGenerating,
    isListening,
    inputMessage,
    isComplete,
    isChatboxOpen,
    setIsListening,
    setChatBoxStatus,
    setInputMessage,
    setIsChatboxOpen,
  } = useChatBoxState();
  const [recognition, setRecognition] = useState<any>(null);

  const isClose = useMemo(() => {
    return !isComplete && !isGenerating && !isListening;
  }, [isComplete, isGenerating, isListening]);

  const isOpenVoice = useMemo(() => {
    return isChatboxOpen;
  }, [isChatboxOpen]);

  const handleVoiceInput = () => {
    setChatBoxStatus({
      status: ChatBoxStatus.Close,
      isGenerating: false,
      isComplete: false,
      isListening: true,
    });

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();

    newRecognition.continuous = false;
    newRecognition.interimResults = false;
    newRecognition.lang = 'en-US'; // Set language to English

    newRecognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const message = `${inputMessage} ${transcript}`;
      setInputMessage(message);

      setChatBoxStatus({
        status: ChatBoxStatus.Close,
        isGenerating: false,
        isComplete: false,
        isListening: false,
      });
      setRecognition(null);

      setTimeout(() => {
        if (message.trim() !== '') {
          handleSendMessage(message);
        }
      }, 100);
    };

    newRecognition.onerror = (event: any) => {
      setChatBoxStatus({
        status: ChatBoxStatus.Close,
        isGenerating: false,
        isComplete: false,
        isListening: false,
      });
      setRecognition(null);
    };

    newRecognition.start();
    setRecognition(newRecognition);
  };

  const stopVoiceInput = useCallback(() => {
    if (recognition) {
      recognition.stop();

      setChatBoxStatus({
        status: ChatBoxStatus.Close,
        isGenerating: false,
        isComplete: false,
        isListening: false,
      });
      setRecognition(null);
    }
  }, [recognition]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isClose) {
          setIsChatboxOpen(false);
        } else if (isListening) {
          stopVoiceInput();
        } else if (isGenerating) {
          //todo: wait for the BE have event stop socket
          // setChatBoxStatus({
          //   status: ChatBoxStatus.Close,
          //   isGenerating: false,
          //   isComplete: false,
          //   isListening: false,
          // });
        }
      } else if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        !isGenerating && handleVoiceInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stopVoiceInput, isClose, isGenerating, isListening]);

  useEffect(() => {
    if (isListening) {
      handleVoiceInput();
    } else {
      stopVoiceInput();
    }

    return () => {
      stopVoiceInput();
    };
  }, [isListening]);

  useEffect(() => {
    if (isOpenVoice) {
      handleVoiceInput();
    }

    return () => {
      stopVoiceInput();
    };
  }, [isOpenVoice]);

  const Listening = useMemo((): ReactElement => {
    return (
      <button
        className={styles.buttonVoice_el}
        disabled={isGenerating}
        onClick={() => handleVoiceInput()}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_38768_31475)">
            <path
              d="M8 0.667969C7.46957 0.667969 6.96086 0.878682 6.58579 1.25376C6.21071 1.62883 6 2.13754 6 2.66797V8.0013C6 8.53174 6.21071 9.04044 6.58579 9.41552C6.96086 9.79059 7.46957 10.0013 8 10.0013C8.53043 10.0013 9.03914 9.79059 9.41421 9.41552C9.78929 9.04044 10 8.53174 10 8.0013V2.66797C10 2.13754 9.78929 1.62883 9.41421 1.25376C9.03914 0.878682 8.53043 0.667969 8 0.667969Z"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.6667 6.66797V8.0013C12.6667 9.23898 12.175 10.426 11.2999 11.3011C10.4247 12.1763 9.23772 12.668 8.00004 12.668C6.76236 12.668 5.57538 12.1763 4.70021 11.3011C3.82504 10.426 3.33337 9.23898 3.33337 8.0013V6.66797"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 12.668V15.3346"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.33337 15.332H10.6667"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_38768_31475">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>Voice</span>
      </button>
    );
  }, [isGenerating]);

  const MuteIcon = useMemo((): ReactElement => {
    return (
      <button
        className={styles.buttonVoice_el}
        disabled={isGenerating}
        onClick={() => stopVoiceInput()}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_38768_31482)">
            <path
              d="M0.666748 0.667969L15.3334 15.3346"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 5.99941V7.99941C6.00035 8.39472 6.11783 8.78106 6.33762 9.10963C6.55741 9.43821 6.86964 9.69428 7.23487 9.84551C7.60011 9.99674 8.00197 10.0363 8.3897 9.95932C8.77743 9.88229 9.13364 9.69209 9.41333 9.41274M10 6.22608V2.66608C10.0005 2.1701 9.81669 1.69162 9.48425 1.32354C9.15181 0.955464 8.69447 0.724038 8.201 0.674193C7.70753 0.624347 7.21314 0.759638 6.81381 1.0538C6.41448 1.34797 6.1387 1.78002 6.04 2.26608"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.3334 11.3013C10.6826 11.9656 9.84813 12.4203 8.93712 12.607C8.0261 12.7938 7.08006 12.7041 6.22037 12.3495C5.36068 11.9949 4.62655 11.3915 4.11216 10.6167C3.59776 9.842 3.32657 8.93124 3.33338 8.0013V6.66797M12.6667 6.66797V8.0013C12.6665 8.27626 12.6419 8.55066 12.5934 8.8213"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 12.668V15.3346"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.33325 15.332H10.6666"
              stroke="#FA4E0E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_38768_31482">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>Stop</span>
      </button>
    );
  }, [isGenerating]);

  return (
    <div className={styles.buttonVoice}>
      {!isListening ? Listening : MuteIcon}
    </div>
  );
}
