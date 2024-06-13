import { usePathname } from 'next/navigation';
import React from 'react';
import s from './styles.module.scss';
import Link from 'next/link';

const ACTIONS = [
  {
    href: '/bvm',
    label: '$BVM',
  },
  {
    href: '/shard',
    label: '$SHARD',
  },
];
export default function Actions() {
  const pathname = usePathname();
  return (
    <div className={s.actions}>
      {ACTIONS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link href={item.href} key={item.href}>
            <div className={`${s.actions_button} ${isActive ? s.active : ''}`}>
              <h6>{item.label}</h6>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
