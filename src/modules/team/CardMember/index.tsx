import React from 'react';
import { TCardMember } from '../data-team';
import s from './styles.module.scss';
import Image from 'next/image';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export default function CardMember({ avatar, name }: TCardMember) {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <ImagePlaceholder
          className={s.image}
          src={avatar}
          alt={name}
          width={336}
          height={336}
        />
      </div>
      <p className={s.name}>{name}</p>
    </div>
  );
}
