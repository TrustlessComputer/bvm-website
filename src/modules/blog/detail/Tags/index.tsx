import { ITag } from '@types/blog';
import Link from 'next/link';
import s from './style.module.scss';

interface IPprops {
  tags: ITag[];
}

export default function Tags({ tags }: IPprops) {

  return <div className={s.wrapper}>
    <ul className={s.list}>
      {
        tags.map(tag => (
          <li className={s.tag}>
            <Link href={`tag/${tag.slug}`}>
              #{tag.title}
            </Link>
          </li>
        ))
      }
    </ul>
  </div>;
}
