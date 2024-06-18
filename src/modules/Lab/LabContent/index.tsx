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
  const {tagCurrent} = useStoreFilterModule();

  useEffect(() => {
    if(!isFilter) {
      setRenderData(landingData);
      return;
    }

    setRenderData(landingData.filter(()=>{
      tagCurrent
      //todo venn
    }))

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
            key={index}
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
