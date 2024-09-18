import MagicIcon from '@/components/MagicIcon';
import { gsap } from 'gsap';
import { useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useRef } from 'react';
import Chatbox from '../Chatbox';
import useChatBoxState from '../Chatbox/chatbox-store';
import SocketProvider from '../Chatbox/SocketProvider';
import styles from './styles.module.scss';

export default function ButtonStartChat(): ReactElement {
  const { isChatboxOpen, setIsChatboxOpen } = useChatBoxState((state) => state);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const params = useSearchParams();
  const chatAIParams = params.get('chat-ai') || '0';
  const ENTER_CHATBOX = localStorage.getItem('chat-ai') === '1' || chatAIParams;

  useEffect(() => {
    localStorage.setItem('chat-ai', chatAIParams.toString());
  }, [chatAIParams]);

  useEffect(() => {
    if (chatboxRef.current) {
      if (isChatboxOpen) {
        gsap.fromTo(
          chatboxRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.5, ease: 'power2.out' },
        );
      } else {
        gsap.to(chatboxRef.current, {
          x: '100%',
          duration: 0.5,
          ease: 'power2.in',
        });
      }
    }
  }, [isChatboxOpen]);

  if (!ENTER_CHATBOX) return <></>;

  return (
    <SocketProvider>
      <button className={styles.button} onClick={() => setIsChatboxOpen(true)}>
        Ai voice prompt <MagicIcon color="white" />
      </button>
      <div
        ref={chatboxRef}
        className="chatbox-container"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          transform: 'translateX(100%)',
        }}
      >
        <Chatbox />
      </div>
    </SocketProvider>
  );
}
