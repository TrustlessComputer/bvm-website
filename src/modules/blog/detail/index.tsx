import s from './styles.module.scss';
import Socials from '@/modules/blog/detail/Socials';
import Tags from '@/modules/blog/detail/Tags';
import { IBlog } from '@/types/blog';
import Image from 'next/image';

export default function BLogDetail(props: IBlog) {
  const { content, title, thumbnail } = props;
  return (
    <div className={s.logDetail}>
      <div className="main">
        <div className="thumb">
          <Image src={thumbnail} alt={title} width={980} height={550} />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="auth"></div>
        <div className={s.meta}>
          <Tags />
          <Socials {...props} />
        </div>
      </div>
    </div>
  );
}
