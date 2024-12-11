export default function useFocusChatBox() {
 
  const focusChatBox = () => {
      setTimeout(() => {
          const elChatBox = document.getElementById('chatbox-messages');    
      if (elChatBox)
        elChatBox.scrollTo(0, elChatBox.scrollHeight);
    }, 5);
  };

  return { focusChatBox };
}