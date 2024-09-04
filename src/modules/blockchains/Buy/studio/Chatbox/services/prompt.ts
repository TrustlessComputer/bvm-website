import { SendPromptBodyRequest, SendPromptResponse } from '../types';

export const sendPrompt = async (
  body: SendPromptBodyRequest,
): Promise<SendPromptResponse> => {
  try {
    const response = await fetch('https://api-dojo2.eternalai.org/api/chat/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (error) {
    console.error('[sendPrompt] error', error);
    throw error;
  }
};
