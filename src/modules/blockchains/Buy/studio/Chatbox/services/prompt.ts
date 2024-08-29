import { SendPromptBodyRequest, SendPromptResponse } from '../types';

export const sendPrompt = async (
  body: SendPromptBodyRequest,
): Promise<SendPromptResponse> => {
  try {
    const response = await fetch('https://14.225.217.214:9006/assist', {
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
