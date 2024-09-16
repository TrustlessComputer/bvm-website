import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import useChatBoxState from './chatbox-store';
import { WebSocketEventName } from './enums/events';
import { useVoiceChatSession } from './hooks/useVoiceChatSession';

const SOCKET_URL =
  'wss://ai-dojo-socketer.eternalai.org/socket.io/?EIO=4&transport=websocket';

const getSocket = () => {
  if ((window as any).io) {
    return (window as any).io(SOCKET_URL);
  }
  return io(SOCKET_URL);
};

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef(getSocket());
  const [isConnected, setIsConnected] = useState(socketRef.current.connected);
  const { getVoiceChatAiSessionId } = useVoiceChatSession();
  const { setChatBoxStatus, setMessages } = useChatBoxState();

  useEffect(() => {
    console.log('___init socket');
    console.log('__________onConnect', getVoiceChatAiSessionId());
    socketRef.current = getSocket();

    function onConnect() {
      setIsConnected(true);

      socketRef.current.emit(WebSocketEventName.BVM_SUBSCRIBE_ADDRESS, {
        address: getVoiceChatAiSessionId(),
      });
      socketRef.current.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY_START,
        (data: any) => {
          console.log('__________GROUP_STREAM_AI_REPLY_START', data);

          //   setChatBoxStatus({
          // status: ChatBoxStatus.Generating,
          //     isGenerating: true,
          //     isComplete: false,
          //     isListening: false,
          //   });
          //   setMessages((prevMessages) => [
          //     ...prevMessages,
          //     { beforeJSON: '', sender: 'bot' },
          //   ]);
        },
      );
      socketRef.current.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY,
        (data: any) => {
          console.log('__________GROUP_STREAM_AI_REPLY', data);
        },
      );
      socketRef.current.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY_END,
        (data: any) => {
          console.log('__________GROUP_STREAM_AI_REPLY_END', data);
        },
      );
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socketRef.current.on('connect', onConnect);
    socketRef.current.on('disconnect', onDisconnect);

    socketRef.current.connect();

    return () => {
      socketRef.current.off('connect', onConnect);
      socketRef.current.off('disconnect', onDisconnect);
    };
  }, []);

  return <>{children}</>;
}
