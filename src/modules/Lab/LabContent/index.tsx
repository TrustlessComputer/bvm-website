import s from '../style.module.scss';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import useLabStore from '../useLabStore';
import { ILabItemContent } from '../data';
import LabArtItem from '../LabArtItem';
import TabFilter from '../TabFilter';
import { useStoreFilterModule } from '@/modules/Lab/TabFilter/useStoreFilterModule';

interface Iprops extends PropsWithChildren {
  heading: string | React.ReactElement;
  landingData: ILabItemContent[];
  isLowercaseTitle?: boolean;
  isHaveNumber?: boolean;
  paddingX?: boolean;
  imageRect?: boolean;
  isTagFilled?: boolean;
  isFilter?: boolean;
}

export default function LabContent({
  heading,
  children,
  landingData,
  isLowercaseTitle,
  isHaveNumber,
  isTagFilled,
  paddingX,
  imageRect,
  isFilter,
}: Iprops) {
  // const { isFirst } = useLabStore();

  const [renderData, setRenderData] = useState<ILabItemContent[]>([]);
  const { tagCurrent } = useStoreFilterModule();

  useEffect(() => {
    if (!isFilter) {
      setRenderData(landingData);
      return;
    }

    if (tagCurrent === 'All') {
      setRenderData(landingData);
      return;
    }

    const dataFilter: any = [];

    for (let i = 0; i < landingData.length; i++) {
      const tag = landingData[i].tags;
      const isExits = tag?.indexOf(tagCurrent);

      if (isExits !== -1) {
        dataFilter.push(landingData[i]);
      }
    }

    setRenderData(dataFilter);
  }, [isFilter, landingData, tagCurrent]);
  return (
    <div className={`${s.container} ${paddingX && s.paddingX} container`}>
      <div className={s.labHeadline}>
        <h2 className={`${s.labHeadline_title}`}>{heading}</h2>
        <p className={`${s.labHeadline_content} ${s.isIN}`}>{children}</p>
      </div>
      {isFilter && <TabFilter />}
      {/* {isFirst && ( */}
      <div className={s.labArtList}>
        {renderData.map((item, index) => (
          <LabArtItem
            key={item.title}
            index={isHaveNumber ? index : undefined}
            data={item}
            isLowercaseTitle={isLowercaseTitle}
            delay={index / 10}
            isTagFilled={isTagFilled}
            imageRect={imageRect}
          />
        ))}
      </div>
      {/* )} */}
    </div>
  );
}
