import { PropsWithChildren, ReactNode } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import ImagePlaceholder from '@components/ImagePlaceholder';

interface ISectionContentProps extends PropsWithChildren {
  title: string,
  image: string,
  button: { link: string, title: string , target?:'_blank' | '_self' | '_top' },
  direction?: 'left' | 'right'
}

export default function SectionContent({ title, image, children, button, direction= 'right' }: ISectionContentProps) {
  return <div className={s.section}>
    <div className="containerV3">
      <div className={`${s.inner} ${s['inner__'+ direction]}`}>
        <div className={s.left}>
          <ImagePlaceholder src={image} width={753} height={460} sizes={'100vw'} quality={100} alt={'image'} />
        </div>
        <div className={s.right}>
          <div className={s.content}>
            <h2 className={s.content_title}>{title}</h2>
            <div className={s.content_desc}>{children}</div>
            <div className={s.content_action}>
              <Link href={button.link} className={s.button} target={button.target || '_self'}>
                {button.title}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="#FA4E0E" stroke-width="1.2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
