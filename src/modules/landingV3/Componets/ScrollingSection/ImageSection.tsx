import s from './styles.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { ISectionContentProps } from '@/modules/landingV3/Componets/SectionContent/section-content';
import { useRef } from 'react';
import { useSignalEffect } from '@preact/signals-react';
import {
  sectionActive
} from '@/modules/landingV3/Componets/ScrollingSection/useScrollingSectionStore';
interface IProps extends ISectionContentProps {
  idx: number
}


export default function ImageSection({idx, image}: IProps) {
  const refContent = useRef<HTMLDivElement>(null);
  useSignalEffect(()=>{

    sectionActive.value === idx ? refContent.current?.classList.add(s.active) : refContent.current?.classList.remove(s.active);
  })
  return <div className={s.left_image} ref={refContent} >
    <ImagePlaceholder src={image} width={753} height={460} sizes={'100vw'} quality={100} alt={'image'} />
  </div>
}
