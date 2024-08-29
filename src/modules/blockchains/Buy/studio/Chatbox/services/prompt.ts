import { SendPromptBodyRequest, SendPromptBodyResponse } from '../types';

export const sendPrompt = async (
  body: SendPromptBodyRequest,
): Promise<SendPromptBodyResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assist`, {
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
