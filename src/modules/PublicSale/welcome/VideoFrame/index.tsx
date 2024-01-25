import s from './styles.module.scss';
import ModalVideo from 'react-modal-video';
import { useState } from 'react';

export default function EternalAi() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={s.eternalAi} onClick={() => setOpen(true)}>
        <video className={s.eternalAi_video} playsInline loop autoPlay muted src={'landing/loop-videos.webm'} />
        {/*<Image loading={'eager'} src={'landing/images/eternail.svg'} width={485} height={213} alt={'eternail'} />*/}
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
