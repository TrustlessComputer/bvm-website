import React from 'react';
import io from 'socket.io-client';

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

type Socket = ReturnType<typeof io> | null;
type SocketCallback = (socket: Socket) => void;

const useChatBoxSocket = () => {
  const socketRef = React.useRef<Socket>(null);

  const connectSocket = (callback?: SocketCallback) => {
    socketRef.current = getSocket();

    return socketRef.current;
  };

  const disconnectSocket = () => {
    socketRef.current?.disconnect();
  };

  return {
    connectSocket,
    disconnectSocket,
  };
};

export default useChatBoxSocket;
