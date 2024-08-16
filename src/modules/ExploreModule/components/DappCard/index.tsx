import React from 'react';
import s from './styles.module.scss';
import Fade from '@interactive/Fade';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';
import cn from 'classnames';

export type TDappCardProps = {
  idx: number;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  tags: string[];
  link: {
    url: string;
    target: string;
  };
  homeImage: string;
};

export default function DappCard({
  idx,
  ...props
}: TDappCardProps): React.JSX.Element {
  console.log('props.bgColor', props.bgColor);
  const { link } = props;
  return (
    <Fade delayEnter={0.5 + idx / 10}>
      <Link
        href={link.url}
        target={link.target}
        className={cn(s.wrapperDappCard, {
          ['pointer-none']: !link.url,
        })}
        style={{ background: props.bgColor }}
      >
        <div className={s.wrapperDappCard_image}>
          <ImagePlaceholder
            src={props.image}
            alt={'dapp1'}
            width={448}
            height={432}
          />
        </div>
        <div className={s.wrapperDappCardContent}>
          <p className={s.wrapperDappCard_heading}>{props.title}</p>
          <p
            className={s.wrapperDappCard_decs}
            dangerouslySetInnerHTML={{ __html: props.description }}
          />
          <div className={s.tags}>
            {props.tags.map((tag, index) => {
              if (!tag) return null;
              return <p key={index}>{tag}</p>;
            })}
          </div>
        </div>
      </Link>
    </Fade>
  );
}
