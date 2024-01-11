// import React from 'react';
// import s from './styles.module.scss';
// import ItemArticle from './ItemArticle';
// import article_1 from '@/public/landing/images/article_1.jpg';
// import article_2 from '@/public/landing/images/article_2.jpg';
// import article_3 from '@/public/landing/images/article_3.jpg';
// import article_4 from '@/public/landing/images/article_4.jpg';

// const DATA_ARTICLE = {
//   top: [
//     {
//       title: 'What Are BRC-20 Tokens? Explaining the Bitcoin Memecoin Hype',
//       description:
//         '"Memecoins" on Bitcoin is probably not what Satoshi Nakamoto envisioned when he released the Bitcoin whitepaper in 2008, but it just might be the mass adoption Bitcoin deserves.',
//       img: article_1,
//     },
//     {
//       title:
//         'Ordinals turned Bitcoin into a worse version of Ethereum: Can we fix it?',
//       description:
//         'No one expected the Taproot upgrade would lead to a surge of NFTs and memecoins on Bitcoin. Are they here to stay, or can the problems they’re causing be fixed?',
//       img: article_2,
//     },
//   ],
//   bottom: [
//     {
//       title: 'BRC-721: The Token Standard Defying Bitcoin’s 4MB Storage Limit',
//       description:
//         'Degens will immediately recognize BRC-721’s acronymous name as being akin to ERC-721 — AKA the premiere token standard for Ethereum NFTs. Put simply, BRC-721s are smart-contract-based NFTs, but on BTC.',
//       img: article_3,
//     },
//     {
//       title: 'BRC-721: The Token Standard Defying Bitcoin’s 4MB Storage Limit',
//       description:
//         'Degens will immediately recognize BRC-721’s acronymous name as being akin to ERC-721 — AKA the premiere token standard for Ethereum NFTs. Put simply, BRC-721s are smart-contract-based NFTs, but on BTC.',
//       img: article_4,
//     },
//   ],
// };

// export default function Article() {
//   return (
//     <div className={s.article}>
//       <div className="container">
//         <div className={s.article_inner}>
//           <h3 className={s.article_inner_heading}>
//             Oh, and the <span>press loves us too!</span>
//           </h3>
//           <div className={s.article_inner_content}>
//             <div className={s.article_inner_content_top}>
//               {DATA_ARTICLE.top.map((item, index) => {
//                 return <ItemArticle data={item} key={index} />;
//               })}
//             </div>
//             <div className={s.article_inner_content_divide}></div>
//             <div className={s.article_inner_content_bottom}>
//               {DATA_ARTICLE.bottom.map((item, index) => {
//                 return <ItemArticle data={item} key={index} />;
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
