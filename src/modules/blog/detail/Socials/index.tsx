import { useMemo } from 'react';
import { DOMAIN_URL } from '@/config';
import s from './styles.module.scss';
import { IBlog } from '@types/blog';
import { ShareSocial } from 'react-share-social';

export default function Socials({ title, slug, thumbnail }: IBlog) {

  const url = useMemo(() => {
    return DOMAIN_URL + `/blog/${slug}`;
  }, []);

  return <div className={s.wrapper}>
    <ShareSocial
      title={title}
      url={url}
      socialTypes={['facebook', 'twitter', 'reddit']}
    />
  </div>;
}
