import { useRef } from 'react';

const SOCKET_URL = 'wss://861hc7bhmpgzhv-9000.proxy.runpod.net/asr';

type Props = {
  onMessage: (message: string) => void;
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
    socketRef.current?.send(`{ "EOF": true }`);
  };

  return {
    connectSocket,
    sendAudio,
    stopSocket,
    emitEventToStop,
  };
};

export default useVoiceToTextSocket;
