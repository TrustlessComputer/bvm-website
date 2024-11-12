// import React from 'react';
// import { BlockCardItem } from '../..';
// import s from './SectionItemApp.module.scss';
// import Link from 'next/link';
// import cn from 'classnames';

// type Props = {
//   item: BlockCardItem;
// };

// const SectionItemApp = ({ item }: Props) => {
//   const appDescription = {
//     runedex: 'Buy Bitcoin permisionlessly.',
//     heartbeats: 'Insights into Bitcoin rollups.',
//     nakaFuture: 'Trade futures on Bitcoin.',
//     alpha: 'The first social app on Bitcoin. ',
//     eternalAI: 'The truly open AI for everyone.',
//     neuron: 'Power decentralized networks & earn',
//     capsule: 'Preserve the Internet’s history.',
//   };

//   const appThumbnail = {
//     runedex: '/landing-v4/home-runedex-2.png',
//     heartbeats: '/landing-v4/home-heartbeat-3.png',
//     nakaFuture: ' /landing-v4/home-naka-1.png',
//     alpha: '/landing-v4/home-alpha.png',
//     eternalAI: '/landing-v4/home-eai-2.png',
//     neuron: '/landing-v4/home-neuron.png',
//     capsule: '/landing-v4/home-capsule-1.png',
//   };

//   const appBgColor = {
//     runedex:
//       'linear-gradient(227deg, #FFC32A -7.83%, #F5E000 23.69%, #53B900 67.99%, #BDF710 100%)',
//     heartbeats:
//       ' linear-gradient(227deg, #FF8D97 -7.83%, #FF6366 21.47%, #E40004 69.37%, #FFDEDE 118.41%)',
//     nakaFuture:
//       'linear-gradient(227deg, #FD8DFF -7.83%, #FF63B7 21.47%, #E400CD 69.37%, #FADEFF 118.41%)',
//     alpha:
//       'linear-gradient(227deg, #AE71FF -7.83%, #9456FF 23.69%, #6610E6 67.99%, #ED68FB 100%)',
//     eternalAI: 'linear-gradient(0deg, #0071BC 0%, #1797D5 40%, #49D0C9 100%)',
//     neuron: ' linear-gradient(0deg, #F15A24 0%, #F7931E 40%, #FBB03B 100%)',
//     capsule:
//       'linear-gradient(227deg, #00D4BA -7.83%, #00D97E 21.47%, #47C445 69.37%, #339898 118.41%)',
//   };

//   return (
//     <Link
//       className={cn(s.wrapper, {
//         ['pointer-none']: !item.link?.url,
//       })}
//       href={item.link?.url}
//       target="_blank"
//       style={{
//         backgroundImage: appBgColor[item.id as keyof typeof appBgColor],
//       }}
//     >
//       <div className={s.info}>
//         <p className={s.title}>{item.title}</p>
//         <p className={s.desc}>
//           {appDescription[item.id as keyof typeof appDescription]}
//         </p>
//         <div className={s.tags}>
//           {item.tags.map((tag, index) => {
//             if (!tag) return null;
//             return <p key={index}>{tag}</p>;
//           })}
//         </div>
//       </div>
//       <div className={s.thumbnail}>
//         <img
//           src={appThumbnail[item.id as keyof typeof appThumbnail]}
//           alt={item.title}
//         />
//       </div>
//     </Link>
//   );
// };

// export default SectionItemApp;
