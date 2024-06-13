import React, { ReactElement, useMemo, useRef, useState } from 'react';
import s from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ILabItemContent } from '../data';
import RandomText from '../RandomText';

type ILabArtItem = {
  index?: number;
  data: ILabItemContent;
  delay: number;
  isLowercaseTitle?: boolean;
};

const LabArtItem = ({ data, delay, index, isLowercaseTitle }: ILabArtItem) => {
  const { image, title, content, link, disabled, tags, video } = data;
  const [isLoaded, setIsLoaded] = useState(false);
  const refHeading = useRef<{ onHover: () => void }>();

  const onMouseEnter = () => {
    refHeading.current?.onHover();
  };

  const Content = useMemo((): ReactElement => {
    return (
      <>
        <div
          className={`${s.labArtItem_img} ${isLoaded && s.isLoaded}`}
          onMouseEnter={onMouseEnter}
        >
          <div className={s.labArtItem_img_inner}>
            {video ? (
              <video
                src={video}
                poster={image}
                playsInline
                autoPlay
                preload={'auto'}
                muted
                loop
              ></video>
            ) : (
              <>
                <Image
                  className={s.labArtItem_img_ori}
                  src={image}
                  alt="title"
                  width={368 * 2}
                  height={236 * 2}
                  loading={'lazy'}
                  onLoad={() => setIsLoaded(true)}
                />
                <Image
                  className={s.labArtItem_img_clo}
                  src={image}
                  alt="title"
                  loading={'eager'}
                  width={50}
                  height={50}
                />
              </>
            )}
          </div>
        </div>
        <div className={s.labArtItem_info}>
          <div
            className={`${s.labArtItem_info_top} ${
              isLowercaseTitle && s.isLowercase
            }`}
          >
            {isLowercaseTitle ? (
              <RandomText
                isLowerCase
                ref={refHeading}
                {...{
                  className: `${s.labArtItem_title} `,
                }}
              >
                {title}
              </RandomText>
            ) : (
              <>
                {index && (
                  <span className={s.labArtItem_title_label}>
                    0{index + 1}.
                  </span>
                )}
                <RandomText
                  ref={refHeading}
                  {...{
                    className: `${s.labArtItem_title}`,
                  }}
                >
                  {title}
                </RandomText>
              </>
            )}
          </div>
          <p className={s.labArtItem_content}>{content}</p>
          {tags && (
            <ul className={s.labArtItem_tags}>
              {tags.map((tag) => {
                return <li className={s.tag}>{tag}</li>;
              })}
            </ul>
          )}
        </div>
      </>
    );
  }, [isLoaded]);

  return disabled ? (
    <div
      className={`${s.labArtItem} ${disabled ? s.disabled : ''}`}
      style={{ '--delay-in': `${delay}s` } as React.CSSProperties}
    >
      {Content}
    </div>
  ) : (
    <Link
      href={link}
      target="_blank"
      className={`${s.labArtItem} ${disabled ? s.disabled : ''}`}
      style={{ '--delay-in': `${delay}s` } as React.CSSProperties}
    >
      {Content}
    </Link>
  );
};

export default LabArtItem;
