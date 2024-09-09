import {
  SendPromptBodyRequest,
  SendPromptBodyRequestV2,
  SendPromptResponse,
  SendPromptResponseV2,
} from '../types';

export const sendPrompt = async (
  body: SendPromptBodyRequest,
): Promise<SendPromptResponse> => {
  console.log('[sendPrompt] body', body);

  try {
    const response = await fetch(
      'https://api-dojo2.eternalai.org/api/chat/assistant',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('[sendPrompt] error', error);
    throw error;
  }
};

export const sendPromptV2 = async (
  body: SendPromptBodyRequestV2,
): Promise<SendPromptResponseV2> => {
  console.log('[sendPromptV2] body', body);

  try {
    const response = await fetch(
      'https://api-dojo2.eternalai.org/api/chat/assistant-v2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('[sendPromptV2] error', error);
    throw error;
  }
};
