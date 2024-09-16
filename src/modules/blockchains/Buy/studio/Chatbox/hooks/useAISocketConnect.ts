import { useEffect, useRef } from "react";
import io from "socket.io-client";

const API_BASE = "https://chatgpt.staging.autonomousdev.xyz";

export function useAIStream(): {
  stream: (args: { messages: any, onStream: (data: any, isDone: boolean) => void, onDone: () => void }) => void;
  cancel: () => void;
} {
  const socket = useRef<SocketIOClient.Socket | null>(null);
  const isStreaming = useRef<boolean>(false);

  useEffect(() => {
    socket.current = io(API_BASE);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const stream = ({ messages, onStream, onDone }: { messages: any, onStream: (data: any, isDone: boolean) => void, onDone: () => void }) => {
    if (!socket.current) {
      console.error("Socket connection not established");
      return;
    }

    isStreaming.current = true;

    socket.current.emit("startChat", {
      messages,
      threadId: '1212123123'
    });

    socket.current.on("chatResponse", (data: any) => {
      const isDone = data.includes('[DONE]');
      onStream(data, isDone);

      if (isDone) {
        isStreaming.current = false;
        onDone();
        socket.current?.off("chatResponse");
      }
    });

    socket.current.on("error", (error: any) => {
      console.error("Socket error:", error);
      isStreaming.current = false;
      socket.current?.off("chatResponse");
      socket.current?.off("error");
    });
  };

  const cancel = () => {
    if (isStreaming.current && socket.current) {
      socket.current.emit("cancelChat");
      isStreaming.current = false;
      socket.current.off("chatResponse");
      socket.current.off("error");
    }
  };

  return { stream, cancel };
}
