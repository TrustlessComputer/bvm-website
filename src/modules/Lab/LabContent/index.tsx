import s from '../style.module.scss';
import React, { PropsWithChildren } from 'react';
import useLabStore from '../useLabStore';
import { ILabItemContent } from '../data';
import LabArtItem from '../LabArtItem';

interface Iprops extends PropsWithChildren {
  heading: string | React.ReactElement;
  landingData: ILabItemContent[];
  isLowercaseTitle?: boolean;
}

export default function LabContent({
  heading,
  children,
  landingData,
  isLowercaseTitle,
}: Iprops) {
  const { isFirst } = useLabStore();

  return (
    <div className={`${s.container} container`}>
      <div className={s.labHeadline}>
        <h2 className={`${s.labHeadline_title}`}>{heading}</h2>
        <p className={`${s.labHeadline_content} ${isFirst && s.isIN}`}>
          {children}
        </p>
      </div>

      {/* {isFirst && ( */}
      <div className={s.labArtList}>
        {landingData.map((item, index) => (
          <LabArtItem
            key={index}
            index={index}
            data={item}
            isLowercaseTitle={isLowercaseTitle}
            delay={index / 10}
          />
        ))}
      </div>
      {/* )} */}
    </div>
  );
}
