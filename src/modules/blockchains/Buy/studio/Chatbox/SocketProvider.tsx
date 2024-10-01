import { createContext, useEffect, useRef } from 'react';
import useChatBoxState, { BotMessage, ChatBoxStatus } from './chatbox-store';
import { WebSocketEventName } from './enums/events';
import useFocusChatBox from './hooks/useFocusChatBox';
import { useVoiceChatSession } from './hooks/useVoiceChatSession';
import useChatBoxSocket from './hooks/useChatBoxSocket';
import useMessageServices from './hooks/useMessageServices';

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const refMessageRender = useRef<string>('');

  const { getVoiceChatAiSessionId } = useVoiceChatSession();
  const {
    setChatBoxStatus,
    isGenerating,
    messages,
    addMessage,
    updateLastBotMessage,
  } = useChatBoxState();
  const { focusChatBox } = useFocusChatBox();
  const { connectSocket, disconnectSocket } = useChatBoxSocket();

  const connectToSocket = () => {
    const socket = connectSocket();

    socket?.on('connect', () => {
      refMessageRender.current = '';

      // SUBSCRIBE
      socket?.emit(
        WebSocketEventName.BVM_SUBSCRIBE_ADDRESS,
        getVoiceChatAiSessionId(),
      );

      const botMessage: BotMessage = {
        beforeJSON: '',
        afterJSON: '',
        jsonPart: '',
        template: [],
        sender: 'bot',
      };
      addMessage(botMessage);
    });

    // REPLYING
    socket?.on(WebSocketEventName.GROUP_STREAM_AI_REPLY, (data: any) => {
      refMessageRender.current += JSON.parse(data).content;

      updateLastBotMessage(refMessageRender.current);
      focusChatBox();
    });

    // END
    socket?.on(WebSocketEventName.GROUP_STREAM_AI_REPLY_END, (data: any) => {
      setChatBoxStatus({
        status: ChatBoxStatus.Close,
        isGenerating: false,
        isComplete: true,
        isListening: false,
      });
    });

    socket?.on('disconnect', () => {
      setChatBoxStatus({
        status: ChatBoxStatus.Close,
        isGenerating: false,
        isComplete: true,
        isListening: false,
      });
      disconnectSocket();
    });

    socket?.on('error', (error: Error) => {
      setChatBoxStatus({
        status: ChatBoxStatus.Close,
        isGenerating: false,
        isComplete: true,
        isListening: false,
      });

      disconnectSocket();
    });
  };

  useEffect(() => {
    if (isGenerating) {
      connectToSocket();
    } else {
      disconnectSocket();
    }
  }, [isGenerating]);

  return children;
}
