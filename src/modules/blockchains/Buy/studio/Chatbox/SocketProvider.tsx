import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import useChatBoxState, { ChatBoxStatus } from './chatbox-store';
import { WebSocketEventName } from './enums/events';
import useFocusChatBox from './hooks/useFocusChatBox';
import { useVoiceChatSession } from './hooks/useVoiceChatSession';

const SOCKET_URL = 'wss://ai-dojo-socketer.eternalai.org/dojo';

const getSocket = () => {
  if ((window as any).io) {
    return (window as any).io;
  }
  return io(SOCKET_URL, {
    auth: {
      token: 'xxx',
    },
    reconnectionDelay: 30000,
    transports: ['websocket'],
  });
};

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { getVoiceChatAiSessionId } = useVoiceChatSession();
  const { setChatBoxStatus, setMessages, messages, isGenerating, isComplete } =
    useChatBoxState();
  const { focusChatBox } = useFocusChatBox();
  const refMessageRender = useRef<string>('');

  const connectToSocket = () => {
    socketRef.current = getSocket();

    socketRef.current?.on('connect', () => {
      setIsConnected(true);

      socketRef.current?.emit(
        WebSocketEventName.BVM_SUBSCRIBE_ADDRESS,
        getVoiceChatAiSessionId(),
      );

      socketRef.current?.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY_START,
        (data: any) => {
          setChatBoxStatus({
            status: ChatBoxStatus.Generating,
            isGenerating: true,
            isComplete: false,
            isListening: false,
          });
          refMessageRender.current = '';
        },
      );

      socketRef.current?.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY,
        (data: any) => {
          refMessageRender.current += JSON.parse(data).content;
          const newMessage = () => {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage && lastMessage.sender === 'bot') {
              const updatedMessages = [...messages];
              updatedMessages[updatedMessages.length - 1] = {
                ...lastMessage,
                beforeJSON: refMessageRender.current,
                afterJSON: '',
                template: [],
              };
              return updatedMessages;
            } else {
              return [
                ...messages,
                {
                  beforeJSON: refMessageRender.current,
                  template: [],
                  afterJSON: '',
                  sender: 'bot',
                },
              ];
            }
          };

          setMessages(newMessage() as Message[]);
          focusChatBox();
        },
      );

      socketRef.current?.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY_END,
        (data: any) => {
          setChatBoxStatus({
            status:
              // prepareCategoryTemplate.length > 0
              //           //   ? ChatBoxStatus.Complete
              //           //   : ChatBoxStatus.Close,
              ChatBoxStatus.Close,
            isGenerating: false,
            isComplete: false, //prepareCategoryTemplate.length > 0,
            isListening: false,
          });
        },
      );
    });

    socketRef.current?.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current?.on('error', (error: Error) => {
      console.error('_____Socket error:', error);
    });
  };

  const disconnectSocket = () => {
    socketRef.current?.removeAllListeners();
    socketRef.current?.disconnect();
  };

  useEffect(() => {
    isGenerating && connectToSocket();

    return () => {
      disconnectSocket();
    };
  }, [isGenerating]);

  useEffect(() => {
    !isGenerating && !isComplete && disconnectSocket();
  }, [isGenerating, isComplete]);

  return <>{children}</>;
}
