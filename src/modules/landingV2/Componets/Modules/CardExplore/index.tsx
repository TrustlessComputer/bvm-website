import React, { useMemo } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import cn from 'classnames';
import SvgInset from '@/components/SvgInset';
import SubCardText from './SubCardText';
import SubCardIcon from './SubCardIcon';
import Link from 'next/link';

type TCardExplore = {
  subTitle?: string;
  link: string;
  color?: string;
  title: string;
  target?: string;
  backgroundImg: string;
  decs: string;
  type: 'solutions' | 'modules';
  icon?: string;
  tags?: { subTitle: string; color: string }[];
};
export default function CardExplore({
  color,
  decs,
  backgroundImg,
  link,
  subTitle,
  title,
  type,
  icon,
  target,
  tags,
}: TCardExplore) {
  const isLink = useMemo(() => {
    return link !== '';
  }, [link]);
  const isSolutions = useMemo(() => {
    return type === 'solutions';
  }, [type]);

  return (
    <Link
      href={link}
      target={target}
      className={cn(
        s.wrapper,
        backgroundImg ? s.wrapper_image : s.wrapper_color,
      )}
    >
      <div className={cn(s.inner, s[`inner__${type}`])}>
        <div
          className={cn(
            s.inner_topSection,
            isSolutions && s.inner_topSection__solutions,
          )}
        >
          {backgroundImg && (
            <div className={s.inner_topSection__solutions_wrapImg}>
              <Image
                className={s.inner_topSection__solutions_wrapImg_img}
                alt={title}
                src={backgroundImg}
                width={472}
                height={282}
              />
            </div>
          )}
          <div className={s.inner_topSection_content}>
            {tags ? (
              <div className={s.tags}>
                {tags.map((tag) => {
                  return (
                    <div
                      className={cn(
                        s.inner_topSection_subTitle,
                        s[`inner_topSection_subTitle__${type}`],
                      )}
                    >
                      <p
                        className={cn(
                          s.inner_topSection_subTitle_text,
                          tag.color &&
                            s[`inner_topSection_subTitle_text__${tag.color}`],
                        )}
                      >
                        {tag.subTitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className={cn(
                  s.inner_topSection_subTitle,
                  s[`inner_topSection_subTitle__${type}`],
                )}
              >
                <p
                  className={cn(
                    s.inner_topSection_subTitle_text,
                    color && s[`inner_topSection_subTitle_text__${color}`],
                  )}
                >
                  {subTitle}
                </p>
              </div>
            )}
            {isLink && (
              <SvgInset
                className={s.inner_topSection_button}
                svgUrl="/landing-v2/svg/arrow-r-t.svg"
                size={20}
              />
            )}
          </div>
        </div>
        {isSolutions ? (
          <SubCardText decs={decs} title={title} />
        ) : (
          <SubCardIcon decs={decs} title={title} icon={icon as string} />
        )}
      </div>
    </Link>
  );
}
