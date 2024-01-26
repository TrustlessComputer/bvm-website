import s from './styles.module.scss';
import { useState } from 'react';

export default function EternalAi() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={s.eternalAi} onClick={() => setOpen(true)}>
        {/*<video className={s.eternalAi_video} playsInline loop autoPlay muted src={'landing/loop-videos.webm'} />*/}
        <img loading={'eager'} src={'public-sale/playGame.png'} alt={'eternail'} />
      </div>
      {/*<ModalVideo
        channel="custom"
        url={'landing/loop-videos.webm'}
        isOpen={isOpen}
        // videoId="L61p2uyiMSo"
        onClose={() => {
          console.log('aaaaaa')
          setOpen(false);
        }}
      />*/}
    </>
  );
}
