import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import useChatBoxState, {
  BotMessage,
  ChatBoxStatus,
  Message,
} from './chatbox-store';
import { WebSocketEventName } from './enums/events';
import useFocusChatBox from './hooks/useFocusChatBox';
import { useVoiceChatSession } from './hooks/useVoiceChatSession';
import { PromptCategory } from './types';
import { modelCategoryToPromptCategory } from './utils/convertApiUtils';

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
  const {
    setChatBoxStatus,
    setMessages,
    messages,
    isGenerating,
    setIsWaitingReply,
  } = useChatBoxState();
  const { focusChatBox } = useFocusChatBox();
  const refMessageRender = useRef<string>('');

  const disconnectSocket = () => {
    console.log('[SocketProvider] disconnectSocket');
    socketRef.current?.removeAllListeners();
    socketRef.current?.disconnect();
    setIsConnected(false);
  };

  const connectToSocket = () => {
    socketRef.current = getSocket();

    socketRef.current?.on('connect', () => {
      setIsConnected(true);

      // SUBSCRIBE
      socketRef.current?.emit(
        WebSocketEventName.BVM_SUBSCRIBE_ADDRESS,
        getVoiceChatAiSessionId(),
      );

      // START
      socketRef.current?.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY_START,
        (data: any) => {
          refMessageRender.current = '';

          setIsWaitingReply(false);
          setChatBoxStatus({
            status: ChatBoxStatus.Generating,
            isGenerating: true,
            isComplete: false,
            isListening: false,
          });

          const newMessage: BotMessage = {
            beforeJSON: refMessageRender.current,
            template: [],
            afterJSON: '',
            sender: 'bot',
          };

          setMessages([...messages, newMessage]);
          focusChatBox();
        },
      );

      // REPLYING
      socketRef.current?.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY,
        (data: any) => {
          refMessageRender.current += JSON.parse(data).content;

          const newMessages = () => {
            const lastMessage = messages[messages.length - 1];

            if (lastMessage && lastMessage.sender === 'bot') {
              const updatedMessages = [...messages];
              const newMessage: BotMessage = {
                beforeJSON: refMessageRender.current,
                template: [],
                afterJSON: '',
                sender: 'bot',
              };

              updatedMessages[updatedMessages.length - 1] = newMessage;

              return updatedMessages;
            } else {
              const newMessage: BotMessage = {
                beforeJSON: refMessageRender.current,
                template: [],
                afterJSON: '',
                sender: 'bot',
              };

              return [...messages, newMessage];
            }
          };

          setMessages(newMessages());
          focusChatBox();
        },
      );

      // END
      socketRef.current?.on(
        WebSocketEventName.GROUP_STREAM_AI_REPLY_END,
        (data: any) => {
          // console.log('[SocketProvider] GROUP_STREAM_AI_REPLY_END', data);

          refMessageRender.current = '';

          setChatBoxStatus({
            status: ChatBoxStatus.Close,
            isGenerating: false,
            isComplete: false,
            isListening: false,
          });
        },
      );
    });

    socketRef.current?.on('disconnect', () => {
      disconnectSocket();
    });

    socketRef.current?.on('error', (error: Error) => {
      console.error('[SocketProvider] error:', error);
      disconnectSocket();
    });
  };

  useEffect(() => {
    refMessageRender.current = '';

    if (isGenerating) {
      connectToSocket();
    } else {
      disconnectSocket();
    }
  }, [isGenerating]);

  return <>{children}</>;
}
