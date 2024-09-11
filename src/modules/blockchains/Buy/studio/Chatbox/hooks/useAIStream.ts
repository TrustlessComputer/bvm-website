import { useRef } from "react";

const API_BASE = "https://chatgpt.staging.autonomousdev.xyz";

export function useAIStream(): {
  stream: (args: { messages: any, onStream: (data: any, isDone: boolean) => void, onDone: () => void }) => Promise<string | undefined>;
  cancel: () => void;
} {
  const API_URL_TEXT = API_BASE + "/api/v1/ai/chat";
  const signal = useRef<AbortController | null>(new AbortController());

  const stream = async ({ messages, onStream, onDone }: { messages: any, onStream: (data: any, isDone: boolean) => void, onDone: () => void }) => {
    const jsonPayload = {
      messages,
      threadId: '1212123123'
    };
        
    signal.current = new AbortController(); 
    const response = await fetch(API_URL_TEXT, {
      method: "POST",
      body: JSON.stringify(jsonPayload),
      headers: {
        "Content-Type": "application/json",
      },
      signal: signal.current.signal,
    });

    if (response.status === 200) {
      const reader = response.body?.getReader();
      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            const chunk = new TextDecoder().decode(value);
            const isDone = chunk.includes('[DONE]');

            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const jsonData = JSON.parse(line.slice(6)); 
                  onStream(jsonData, isDone);
                } catch (error) {
                  console.error('Error parsing JSON:', error);
                }
              }
            }

            if (done) {    
              onDone();
              break;
            }
          }
        } catch (error) {
          if (error.name === 'AbortError') {
            console.error('BodyStreamBuffer was aborted');
          } else {
            console.error('Stream reading error:', error);
          }
        }
        return undefined;
      }
    }
    return undefined;
  };

  const cancel = () => {
    if (signal.current) {
      signal.current.abort();
      signal.current = new AbortController(); // Reset the AbortController
    }
  };

  return { stream, cancel };
}
