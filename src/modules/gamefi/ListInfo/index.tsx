import s from './styles.module.scss';
import RetroHeading from '@components/Retro/Heading';
import RetroCard, { RetroCardProps } from '@components/Retro/RetroCard';

// const GAMEFI_LIST_INFO: RetroCardProps [] = [
//   {
//     title: 'Unlock unparalleled performance',
//     children: 'Experience lightning-fast 2-second block times and ultra-low gas fees (less than $0.001 per transaction).',
//     src: '/gamefi/gamefi-performace-min.png',
//   },
//   {
//     title: 'Migrate games seamlessly',
//     children: 'Effortlessly transition existing games from EVM-compatible chains like Ethereum, BSC, or Fantom to your new Bitcoin L2 without the need for a new toolkit.',
//     src: '/gamefi/gamefi-migrate-min.png',
//   },
//   {
//     title: 'Enhance Scalability and Security',
//     children: 'Leverage optimistic rollup technology for massive scalability and Bitcoin-grade security.',
//     src: '/gamefi/gamefi-security-min.png',
//   },
// ];

interface IListInfo {
  heading: string;
  list_info: RetroCardProps []
}

export default function ListInfo( {heading, list_info}: IListInfo ) {

  return <div className={s.listInfo}>
    <div className='containerV3'>
      <RetroHeading color={'black'}>
        {heading}
      </RetroHeading>
      <div className={s.list}>
        {
          list_info.map((item: RetroCardProps) => {
            return <RetroCard src={item.src} title={item.title} bgColor={item.bgColor}>{item.children}</RetroCard>;
          })
        }
      </div>
    </div>
  </div>;
}
