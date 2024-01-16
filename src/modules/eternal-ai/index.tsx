import s from './styles.module.scss';
import Image from 'next/image';

export default function EternalAi() {
  return (
    <div className={s.eternalAi}>
      <video
        className={s.eternalAi_video}
        playsInline
        loop
        autoPlay
        muted
        src={'landing/loop-videos.webm'}
      />
      <Image
        loading={'eager'}
        src={'landing/images/eternail.svg'}
        width={485}
        height={213}
        alt={'eternail'}
      />
    </div>
  );
}
