import s from './styles.module.scss';
import React from 'react';
import Link from 'next/link';
import { HEART_BEAT } from '@constants/route-path';

export default function Banner() {
  return (
    <div className={s.banner}>
      <Link href={HEART_BEAT}>
        <img
          src="/icons/noto_heartbeat.svg"
          alt="heartbeat"
          width={24}
          height={24}
        />
        Bitcoin Heartbeat: Provide transparent and verifiable insights into
        Bitcoin rollups.{' '}
        <strong>
          Let's explore{' '}
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.04831 5.90091L14.15 5.90081M14.15 5.90081L14.15 12.9015M14.15 5.90081L5.90039 14.1504"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </strong>
      </Link>
    </div>
  );
}
