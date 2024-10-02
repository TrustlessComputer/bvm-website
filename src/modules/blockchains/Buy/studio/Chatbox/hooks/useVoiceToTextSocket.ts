import { useRef } from 'react';
import { RecordPromptResponse } from '../types';

const SOCKET_URL = 'wss://uj6ne4kw25z67t-9000.proxy.runpod.net/asr';

type Props = {
  onMessage: (message: RecordPromptResponse) => void;
  onOpen: () => void;
  onClose: () => void;
};

const useVoiceToTextSocket = ({ onMessage, onOpen, onClose }: Props) => {
  const socketRef = useRef<WebSocket | null>(null);

  const connectSocket = () => {
    socketRef.current = new WebSocket(SOCKET_URL);

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    socketRef.current.onopen = onOpen;
    socketRef.current.onclose = onClose;
  };

  const sendAudio = (audio: Blob) => {
    socketRef.current?.send(audio);
  };

  const stopSocket = () => {
    socketRef.current?.close();
  };

  const emitEventToStop = () => {
    socketRef.current?.send(JSON.stringify({ EOF: true }));
  };

  return {
    connectSocket,
    sendAudio,
    stopSocket,
    emitEventToStop,
  };
};

export default useVoiceToTextSocket;
