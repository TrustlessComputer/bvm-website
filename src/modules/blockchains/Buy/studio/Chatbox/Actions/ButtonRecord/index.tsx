import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import useChatBoxState from '../../chatbox-store';
import styles from './styles.module.scss';

type Props = {
  handleSendMessage: (message: string, isVoice?: boolean) => void;
};

export default function ButtonRecord({
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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);

  const isClose = useMemo(() => {
    return !isComplete && !isGenerating && !isListening;
  }, [isComplete, isGenerating, isListening]);

  const isOpenVoice = useMemo(() => {
    return isChatboxOpen;
  }, [isChatboxOpen]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(audioBlob);

        console.log('audioURL', audioURL);
        setAudioURL(audioURL);

        //todo send to API
        // sendAudioToAI(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        console.log('stop recording', mediaRecorderRef.current);
      }
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const sendAudioToAI = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');

    try {
      const response = await fetch(
        'https://api.openai.com/v1/audio/transcriptions',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
        },
      );
      const data = await response.json();
      setTranscript(data.text);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isClose) {
          setIsChatboxOpen(false);
        } else if (isListening) {
          stopRecording();
          setIsListening(false);
        } else if (isGenerating) {
          //todo: wait for the BE have event stop socket
          // setChatBoxStatus({
          //   status: ChatBoxStatus.Close,
          //   isGenerating: false,
          //   isComplete: false,
          //   isListening: false,
          // });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    stopRecording,
    isClose,
    isGenerating,
    isListening,
    setIsChatboxOpen,
    setIsListening,
  ]);

  useEffect(() => {
    if (isListening) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isListening]);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const Listening = useMemo((): ReactElement => {
    return (
      <button
        className={styles.buttonVoice_el}
        disabled={isGenerating}
        onClick={() => setIsListening(true)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_38768_31475)">
            <path
              d="M8 0.667969C7.46957 0.667969 6.96086 0.878682 6.58579 1.25376C6.21071 1.62883 6 2.13754 6 2.66797V8.0013C6 8.53174 6.21071 9.04044 6.58579 9.41552C6.96086 9.79059 7.46957 10.0013 8 10.0013C8.53043 10.0013 9.03914 9.79059 9.41421 9.41552C9.78929 9.04044 10 8.53174 10 8.0013V2.66797C10 2.13754 9.78929 1.62883 9.41421 1.25376C9.03914 0.878682 8.53043 0.667969 8 0.667969Z"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.6667 6.66797V8.0013C12.6667 9.23898 12.175 10.426 11.2999 11.3011C10.4247 12.1763 9.23772 12.668 8.00004 12.668C6.76236 12.668 5.57538 12.1763 4.70021 11.3011C3.82504 10.426 3.33337 9.23898 3.33337 8.0013V6.66797"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12.668V15.3346"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33337 15.332H10.6667"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
  }, [isGenerating, setIsListening]);

  const MuteIcon = useMemo((): ReactElement => {
    return (
      <button
        className={styles.buttonVoice_el}
        disabled={isGenerating}
        onClick={() => setIsListening(false)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_38768_31482)">
            <path
              d="M0.666748 0.667969L15.3334 15.3346"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 5.99941V7.99941C6.00035 8.39472 6.11783 8.78106 6.33762 9.10963C6.55741 9.43821 6.86964 9.69428 7.23487 9.84551C7.60011 9.99674 8.00197 10.0363 8.3897 9.95932C8.77743 9.88229 9.13364 9.69209 9.41333 9.41274M10 6.22608V2.66608C10.0005 2.1701 9.81669 1.69162 9.48425 1.32354C9.15181 0.955464 8.69447 0.724038 8.201 0.674193C7.70753 0.624347 7.21314 0.759638 6.81381 1.0538C6.41448 1.34797 6.1387 1.78002 6.04 2.26608"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.3334 11.3013C10.6826 11.9656 9.84813 12.4203 8.93712 12.607C8.0261 12.7938 7.08006 12.7041 6.22037 12.3495C5.36068 11.9949 4.62655 11.3915 4.11216 10.6167C3.59776 9.842 3.32657 8.93124 3.33338 8.0013V6.66797M12.6667 6.66797V8.0013C12.6665 8.27626 12.6419 8.55066 12.5934 8.8213"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12.668V15.3346"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33325 15.332H10.6666"
              stroke="#FA4E0E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
  }, [isGenerating, setIsListening]);

  return (
    <div className={styles.buttonVoice}>
      {audioURL && <audio autoPlay controls loop src={audioURL} />}
      {!isListening ? Listening : MuteIcon}
    </div>
  );
}
