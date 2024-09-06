import { v4 as uuidv4 } from 'uuid';

export function useVoiceChatSession(): {
    getVoiceChatAiSessionId: () => string | null;
} {
    const getVoiceChatAiSessionId = () => {
        const sessionId = localStorage.getItem('voice-chat-ai-session');
        if (!sessionId) {
            const tmpSessionId = uuidv4();
            setVoiceChatAiSessionId(tmpSessionId);
            return tmpSessionId;
        };
        return localStorage.getItem('voice-chat-ai-session');
    }

    const setVoiceChatAiSessionId = (sessionId: string) => {
        localStorage.setItem('voice-chat-ai-session', sessionId);
    }

    return {
        getVoiceChatAiSessionId
    }
    
}

