import React from 'react';
import useChatBoxState, { BotMessage } from '../chatbox-store';

const useMessageServices = () => {
  const { setMessages, messages } = useChatBoxState();

  const initNewBotMessage = () => {
    const newMessage: BotMessage = {
      beforeJSON: '',
      afterJSON: '',
      jsonPart: '',
      template: [],
      sender: 'bot',
    };

    setMessages([...messages, newMessage]);
  };

  const updateLastBotMessage = (markdown: string) => {
    const _messages = [...messages];
    const lastMessage = _messages[_messages.length - 1];

    if (lastMessage?.sender !== 'bot') return;

    lastMessage.beforeJSON = markdown;

    setMessages([..._messages]);
  };

  return {
    initNewBotMessage,
    updateLastBotMessage,
  };
};

export default useMessageServices;
