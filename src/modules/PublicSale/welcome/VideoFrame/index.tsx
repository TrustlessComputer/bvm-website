import s from './styles.module.scss';
import ModalVideo from 'react-modal-video';
import { useState } from 'react';

export default function EternalAi() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={s.container} onClick={() => setOpen(true)}>
        {/*<video className={s.eternalAi_video} playsInline loop autoPlay muted src={'landing/loop-videos.webm'} />*/}
        <img loading={'eager'} src={'public-sale/welcome.png'} alt={'welcome'} />
      </div>
      <ModalVideo
        channel="custom"
        url={'landing/loop-videos.webm'}
        isOpen={isOpen}
        // videoId="L61p2uyiMSo"
        onClose={() => {
          console.log('aaaaaa')
          setOpen(false);
        }}
      />
    </>
  );
}
