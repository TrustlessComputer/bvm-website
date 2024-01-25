import s from './styles.module.scss';
import { Flex, Text } from '@chakra-ui/react';
import Avatar from '@/components/Avatar';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import React, { ReactElement, useState } from 'react';
import Image from 'next/image';

export default function AvatarItem({ data }: any) {

  const [error, setError] = useState<boolean>(false);


  const PlaceImage = (): ReactElement => {
    return <Image
      width={120}
      height={120}
      src={'/images/elipse.jpg'} alt={'elipse'}/>;
  };

  return <div className={`${s.avatarItem} ${data.levelRender !==undefined && 'level-' + data.levelRender} js-avatarItem`}>
    <div className={s.avatarItem_inner}>
      <div
        className={s.avatarItem_avatar}
        onClick={() => {
          window.open(`https://twitter.com/${data?.twitter_username}`);
        }}
      >
        {
          error && <PlaceImage />
        }
        {!error && <Image
          width={120}
          height={120}
          onError={(e) => {
            setError(true);
          }}
          src={getUrlAvatarTwitter(
            data?.twitter_avatar as string,
            'medium',
          ) || ''} alt={'medium'}/>}


      </div>
      <Flex width={'100%'} gap={'4px'} direction={'column'}>
        <p className={s.title}>{data?.twitter_name || ''}</p>
        {data?.need_active && (
          <Text className={s.subTitle}>YOU</Text>
        )}
      </Flex>
    </div>
  </div>;
}
