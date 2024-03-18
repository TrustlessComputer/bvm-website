import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import { Button } from '@chakra-ui/react';
import Lines from '@/interactive/Lines';

type TSectionBottom = {
  title: string;
  link?: string;
  data?: {
    left: string;
    right: string;
    icon: string;
  }[];
  bgBottom: string;
  description?: string;
};

export default function SectionBottom({
  data,
  delay,
  isLaunch = false,
  isYourChain = false,
}: {
  data: TSectionBottom;
  delay: number;
  isLaunch?: boolean;
  subText?: string;
  isYourChain?: boolean;
}) {
  return (
    <div
      className={`${s.sectionBottom} ${s[`sectionBottom__${data.bgBottom}`]}  ${
        isYourChain && s[`sectionBottom__isYourChain`]
      }`}
    >
      <div className={s.sectionBottom_title}>
        <h6
          className={`${s.sectionBottom_title_main} ${
            isLaunch && s[`sectionBottom_title_main_isLaunch`]
          } 
             ${isYourChain && s[`sectionBottom_title_main_isYourChain`]}
          `}
        >
          <Chars delay={delay}>{data.title}</Chars>
        </h6>
        <Chars delay={delay}>
          <p className={s.sectionBottom_title_sub}>
            {!data?.link && !isLaunch && 'Coming soon'}
          </p>
        </Chars>
      </div>

      {isYourChain && (
        <ul className={`${s.sectionBottom_listInfo}`}>
          <Lines delay={delay + 0.15}>
            <p className={s.sectionBottom_yourChain_desc}>{data.description}</p>
          </Lines>
          <Fade delay={delay + 0.3}>
            <Button
              bgColor={'#FA4E0E'}
              color={'#fff'}
              borderRadius={0}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              px={'40px'}
              py={'11.5px'}
              w={['100%']}
              h={'40px'}
              fontWeight={400}
              marginTop={'12px'}
              fontSize={'14px'}
              onClick={() => {
                scrollTo();
                // router.push('/blockchains/customize');
              }}
              _hover={{
                opacity: 0.8,
              }}
            >
              Build
            </Button>
          </Fade>
        </ul>
      )}
      {!isLaunch && !isYourChain && (
        <ul className={s.sectionBottom_listInfo}>
          {data.data &&
            data.data.map((item, index) => {
              return (
                <Fade key={index} delay={delay + 0.1 + index / 10}>
                  <li className={s.sectionBottom_listInfo_item}>
                    <span className={s.sectionBottom_listInfo_item__left}>
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={16}
                        height={16}
                      />
                      <p className={s.sectionBottom_listInfo_item__left_text}>
                        {item.left}
                      </p>
                    </span>
                    <p className={s.sectionBottom_listInfo_item__right}>
                      {item.right}
                    </p>
                  </li>
                </Fade>
              );
            })}
        </ul>
      )}
    </div>
  );
}
