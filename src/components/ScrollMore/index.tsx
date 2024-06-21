import s from './styles.module.scss';
import Image from 'next/image';

export default function ScrollMore() {

  return <div className={`${s.scrollMore} scrollMore`}>
    <span className={s.text}>Learn more</span>
    <div className={s.line}>
            <span className={s.dot}>
              <Image src='/icons/icon-scroller.svg' alt='icon-scroller' width={32} height={32} />
            </span>
    </div>
  </div>;
}
