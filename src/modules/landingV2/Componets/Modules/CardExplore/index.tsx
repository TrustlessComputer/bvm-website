import React, { useMemo } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import cn from 'classnames';
import SvgInset from '@/components/SvgInset';
import SubCardText from './SubCardText';
import SubCardIcon from './SubCardIcon';
import Link from 'next/link';
import SubTag, { TSubTag } from './SubTag';

type TCardExplore = {
  link: string;
  title: string;
  target?: string;
  backgroundImg: string;
  decs: string;
  type: 'solutions' | 'modules';
  icon?: string;
  tags: TSubTag;
};
export default function CardExplore({
  decs,
  backgroundImg,
  link,
  title,
  type,
  icon,
  target,
  tags,
}: TCardExplore) {
  const isSolutions = useMemo(() => {
    return type === 'solutions';
  }, [type]);

  return (
    <Link
      href={link}
      target={target}
      onClick={(e) => {
        if (!link) {
          e.preventDefault();
        }
      }}
      className={cn(s.wrapper, s[`wrapper__${type}`])}
    >
      <div className={cn(s.inner, s[`inner__${type}`])}>
        <div className={cn(s.inner_topSection, s[`inner_topSection__${type}`])}>
          {isSolutions && (
            <>
              <div className={s.inner_topSection__solutions_wrapImg}>
                <Image
                  className={s.inner_topSection__solutions_wrapImg_img}
                  alt={title}
                  src={backgroundImg}
                  width={472}
                  height={282}
                />
              </div>
              <div className={s.inner_topSection_content}>
                <SubTag tags={tags} type={'solutions'} />
              </div>
            </>
          )}
        </div>
        {isSolutions ? (
          <SubCardText decs={decs} title={title} link={link} />
        ) : (
          <SubCardIcon
            decs={decs}
            title={title}
            icon={icon as string}
            tags={tags}
            link={link}
          />
        )}
      </div>
    </Link>
  );
}
