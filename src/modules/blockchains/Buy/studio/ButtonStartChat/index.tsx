import MagicIcon from '@/components/MagicIcon';
import { gsap } from 'gsap';
import { ReactElement, useState } from 'react';
import Chatbox from '../Chatbox';
import styles from './styles.module.scss';

export default function ButtonStartChat(): ReactElement {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const handleOpenChatbox = () => {
    setIsChatboxOpen(true);
    gsap.fromTo(
      '.chatbox-container',
      { x: '100%' },
      { x: '0%', duration: 0.5, ease: 'power2.out' }
    );
  };

  return (
    <>
      <button className={styles.button} onClick={handleOpenChatbox}>
        Ai voice prompt <MagicIcon color='white' />
      </button>
      {isChatboxOpen && (
        <div className="chatbox-container" style={{ position: 'absolute', top: 0, right: 0 }}>
          <Chatbox />
        </div>
      )}
    </>
  );
}