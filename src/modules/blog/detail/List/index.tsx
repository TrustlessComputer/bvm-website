import Link from 'next/link';
import { ReactElement } from 'react';
import s from './styles.module.scss';

export default function List({ title }: { title: string }): ReactElement {

  return <ul className={s.list}>
    <li><Link href={'/blog'}>Blog</Link></li>
    <li>/</li>
    <li>{title}</li>
  </ul>;
}
