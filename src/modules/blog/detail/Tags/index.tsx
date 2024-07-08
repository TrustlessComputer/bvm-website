import Link from 'next/link';
import s from './styles.module.scss';

interface IPprops {
  tags: Tag[];
}

export default function Tags({ tags }: IPprops) {

  return <div className={s.wrapper}>
    <ul className={s.list}>
      {
        tags?.map(tag => (
          <li className={s.tag} key={tag.slug}>
            <Link href={`/blog?tag=${tag.slug}`}>
              {tag.name}
            </Link>
          </li>
        ))
      }
    </ul>
  </div>;
}
