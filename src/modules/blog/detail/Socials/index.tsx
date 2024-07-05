import { useMemo } from 'react';
import { DOMAIN_URL } from '@/config';
import s from './styles.module.scss';
import { IBlog } from '@types/blog';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from 'react-share';

export default function Socials({ title, slug }: IBlog) {

  const url = useMemo(() => {
    return DOMAIN_URL + `/blog/${slug}`;
  }, []);

  return <div className={s.wrapper}>
    <FacebookShareButton
      url={slug}
      className="Demo__some-network__share-button"
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <TwitterShareButton
      url={slug}
      title={title}
      className="Demo__some-network__share-button"
    >
      <XIcon size={32} round />
    </TwitterShareButton>
    <RedditShareButton
      url={slug}
      title={title}
      windowWidth={660}
      windowHeight={460}
      className="Demo__some-network__share-button"
    >
      <RedditIcon size={32} round />
    </RedditShareButton>
  </div>;
}
