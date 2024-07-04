import s from '@/modules/blog/detail/styles.module.scss';
import { IBlog } from '@types/blog';
import Image from 'next/image';

export default function SidebarRight({ title, views, auth }: IBlog) {

  return <div>
    <h1 className={s.heading}>
      {title}
    </h1>
    <div className={s.meta}>
      <div className={s.auth}>
        <Image src={auth.avatar} alt={auth.username} width={80} height={80} />
        MeoMeo
      </div>
      <div className={s.date}>
        12/01/2024
      </div>
    </div>
  </div>;
}
