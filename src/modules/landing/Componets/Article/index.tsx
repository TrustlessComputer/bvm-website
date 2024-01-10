import React from 'react';
import s from './styles.module.scss';
import ItemArticle from './ItemArticle';
import article_1 from '@/public/landing/images/article_1.jpg';
import article_2 from '@/public/landing/images/article_2.jpg';
import article_3 from '@/public/landing/images/article_3.jpg';
import article_4 from '@/public/landing/images/article_4.jpg';

const DATA_ARTICLE = {
  top: [
    {
      title: 'What Are BRC-20 Tokens? Explaining the Bitcoin Memecoin Hype',
      description:
        '"Memecoins" on Bitcoin is probably not what Satoshi Nakamoto envisioned when he released the Bitcoin whitepaper in 2008, but it just might be the mass adoption Bitcoin deserves.',
      img: article_1,
    },
    {
      title:
        'Ordinals turned Bitcoin into a worse version of Ethereum: Can we fix it?',
      description:
        'No one expected the Taproot upgrade would lead to a surge of NFTs and memecoins on Bitcoin. Are they here to stay, or can the problems they’re causing be fixed?',
      img: article_2,
    },
  ],
  bottom: [
    {
      title: 'BRC-721: The Token Standard Defying Bitcoin’s 4MB Storage Limit',
      description:
        'Degens will immediately recognize BRC-721’s acronymous name as being akin to ERC-721 — AKA the premiere token standard for Ethereum NFTs. Put simply, BRC-721s are smart-contract-based NFTs, but on BTC.',
      img: article_3,
    },
    {
      title: 'BRC-721: The Token Standard Defying Bitcoin’s 4MB Storage Limit',
      description:
        'Degens will immediately recognize BRC-721’s acronymous name as being akin to ERC-721 — AKA the premiere token standard for Ethereum NFTs. Put simply, BRC-721s are smart-contract-based NFTs, but on BTC.',
      img: article_4,
    },
  ],
};

export default function Article() {
  return (
    <div className={s.article}>
      <div className="container">
        <div className={s.article_inner}>
          <div className={s.article_inner_heading}>
            Oh, and the <span>press loves us too!</span>
          </div>
          <div className={s.article_inner_content}>
            <div className={s.article_inner_content_top}>
              {DATA_ARTICLE.top.map((item) => {
                return <ItemArticle data={item} />;
              })}
            </div>
            <div className={s.article_inner_content_divide}></div>
            <div className={s.article_inner_content_bottom}>
              {DATA_ARTICLE.bottom.map((item) => {
                return <ItemArticle data={item} />;
              })}
            </div>
          </div>

          <div className={s.article_inner_groupButton}>
            <span className={s.article_inner_groupButton_left}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
              >
                <path
                  d="M6.66656 0.666655C6.92256 0.666655 7.17859 0.76395 7.37326 0.95995C7.76393 1.35062 7.76393 1.984 7.37326 2.37466L2.74663 7.00129L7.37326 11.6279C7.76393 12.0186 7.76393 12.652 7.37326 13.0426C6.98259 13.4333 6.34921 13.4333 5.95855 13.0426L0.625214 7.7093C0.234547 7.31863 0.234547 6.68525 0.625214 6.29459L5.95855 0.961252C6.15455 0.763919 6.41056 0.666655 6.66656 0.666655Z"
                  fill="black"
                  fill-opacity="0.3"
                />
              </svg>
            </span>
            <span className={s.article_inner_groupButton_right}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
              >
                <path
                  d="M1.33345 13.3333C1.07745 13.3333 0.821407 13.236 0.62674 13.04C0.236074 12.6494 0.236074 12.016 0.62674 11.6253L5.25337 6.99871L0.62674 2.37208C0.236074 1.98141 0.236074 1.34803 0.62674 0.957368C1.01741 0.566701 1.65079 0.566701 2.04145 0.957368L7.37479 6.2907C7.76545 6.68137 7.76545 7.31475 7.37479 7.70541L2.04145 13.0387C1.84545 13.2361 1.58945 13.3333 1.33345 13.3333Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
