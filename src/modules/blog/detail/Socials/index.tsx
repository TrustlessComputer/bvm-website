import {useMemo} from 'react';
import {DOMAIN_URL} from '@/config';
import s from './styles.module.scss';
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton, TwitterShareButton,
  XIcon,
} from 'react-share';

export default function Socials({title, slug}: Blog) {

  const url = useMemo(() => {
    return `${DOMAIN_URL}/blog/${slug}`;
  }, []);

  return <div className={s.wrapper}>
    <FacebookShareButton
      url={url}
      className="Demo__some-network__share-button"
    >
      <FacebookIcon size={32} round/>
    </FacebookShareButton>
    <TwitterShareButton
      url={url}
      title={title}
      className="Demo__some-network__share-button"
    >
      <XIcon size={32} round/>
    </TwitterShareButton>
    <RedditShareButton
      url={slug}
      title={title}
      windowWidth={660}
      windowHeight={460}
      className="Demo__some-network__share-button"
    >
      <RedditIcon size={32} round/>
    </RedditShareButton>
  </div>;
}
