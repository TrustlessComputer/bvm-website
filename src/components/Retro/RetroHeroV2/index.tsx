import React, {PropsWithChildren} from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import ImagePlaceholder from '@components/ImagePlaceholder';
import {Button} from "@chakra-ui/react";
import {useContactUs} from "@/Providers/ContactUsProvider/hook";

export interface IHeroBtn_1 {
  title: string,
  link: string,
  target?: '_blank' | '_self'
}

export interface IHeroBtn_2 extends IHeroBtn_1 {
  label: string;
}

export interface IRetroHero extends PropsWithChildren {
  subTitle: string,
  label?: string,
  btn1: IHeroBtn_1,
  btn2?: IHeroBtn_2,
  src: string,
  isVideo?: boolean
  isHadContact?: boolean
}

function RetroHeroV2({
                       label,
                       subTitle,
                       isHadContact,
                       children,
                       btn1,
                       btn2,
                       src,
                       isVideo
                     }: IRetroHero): React.JSX.Element {
  const {showContactUsModal} = useContactUs();
  return (

    <div className={s.wrapper}>
      {
        isVideo ? <video src={src} className={s.bg} autoPlay loop playsInline muted></video> :
          <div className={s.wrapperbg}>
            <ImagePlaceholder className={s.bg} src={src} width={1920} height={567} alt={'bg-hero'}/>
          </div>
      }
      <div className={` ${s.container} containerV3`}>
        <div className={s.wrapperContent}>
          <p className={s.subTitle}>{subTitle}</p>
          <p className={s.heading}>{children}</p>
          <p className={s.label}>{label}</p>
          <div className={s.wrapperLink}>
            <div className={s.gr}>
              <Link href={btn1.link} target={btn1.target} className={s.btn}>{btn1.title}</Link>

              {
                isHadContact && <Button
                  bgColor={'transparent'}
                  color={'#FA4E0E'}
                  padding={[10, 0, 10, 0]}
                  borderRadius={100}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontWeight={500}
                  fontSize={'14px'}
                  _hover={{
                    bgColor: 'transparent'
                  }}
                  onClick={showContactUsModal}
                >
                  Contact us
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="#FA4E0E" stroke-width="1.2" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                  </svg>
                </Button>
              }
            </div>
            {
              btn2 && (
                <div className={s.linkBottom}>
                  <p>{btn2.label}</p>
                  <Link href={btn2.link} target={btn2.target}>{btn2.title}</Link>
                  <div className={s.icon}>
                    <Image src={'/retro/ic_arrowTR.svg'} alt={'icon'} width={12} height={12}/>
                  </div>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default RetroHeroV2;
