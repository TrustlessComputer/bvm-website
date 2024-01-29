import {
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import React, { useState } from 'react';
import { TIME_CHAIN_EXPIRED_TIME } from '@/modules/PublicSale/BuyForm';
import cx from 'clsx';
import { getLink } from '@/utils/helpers';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';

const RaffleButton = ({className}: any) => {
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format())
  );
  const user = useAppSelector(userSelector);

  const handleShareTw = () => {
    const shareUrl = getLink(user?.referral_code || '');

    const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon\n\nJoin the allowlist`;
    const url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
      content,
    )}`;

    window.open(url, '_blank');
  }

  return (
    <Flex className={cx(s.container, className)} direction={"column"} alignItems={"center"}>
      <Flex alignItems={"center"} gap={"6px"}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.3336 3.81861C3.28016 4.38861 3.24266 5.39736 3.57923 5.82674C3.57923 5.82674 3.42079 4.71861 4.8411 3.3283C5.41298 2.76861 5.54516 2.00736 5.34548 1.43642C5.23204 1.11299 5.02485 0.845799 4.84485 0.659236C4.73985 0.549549 4.82048 0.368611 4.97329 0.375174C5.89766 0.416424 7.39579 0.673298 8.03235 2.2708C8.31173 2.97205 8.33235 3.69674 8.19923 4.43361C8.11485 4.90424 7.81485 5.95049 8.49923 6.07892C8.98766 6.1708 9.22391 5.78267 9.32985 5.5033C9.37391 5.38705 9.52673 5.35799 9.60923 5.4508C10.4342 6.38924 10.5045 7.49455 10.3339 8.44611C10.0039 10.2855 8.1411 11.6242 6.29048 11.6242C3.9786 11.6242 2.13829 10.3014 1.6611 7.90705C1.46891 6.94049 1.56641 5.02799 3.05704 3.67799C3.16766 3.57674 3.3486 3.66674 3.3336 3.81861Z" fill="url(#paint0_radial_30141_6168)"/>
          <path d="M7.13538 7.25774C6.28319 6.16086 6.66475 4.9093 6.87381 4.41055C6.90194 4.34493 6.82694 4.28305 6.76788 4.32336C6.40131 4.57274 5.65038 5.15961 5.30069 5.98555C4.82725 7.10211 4.861 7.64868 5.14131 8.31618C5.31006 8.71836 5.11413 8.80368 5.01569 8.81868C4.92006 8.83368 4.83194 8.76993 4.76163 8.70336C4.55935 8.50917 4.41521 8.26244 4.34538 7.99086C4.33038 7.93274 4.25444 7.9168 4.21975 7.96461C3.95725 8.32743 3.82131 8.90961 3.81475 9.32118C3.79413 10.5934 4.84506 11.6246 6.11631 11.6246C7.7185 11.6246 8.88569 9.85274 7.96506 8.37149C7.69788 7.94024 7.44663 7.65805 7.13538 7.25774Z" fill="url(#paint1_radial_30141_6168)"/>
          <defs>
            <radialGradient id="paint0_radial_30141_6168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.83258 11.6534) rotate(-179.751) scale(6.61759 10.8581)">
              <stop offset="0.314" stop-color="#FF9800"/>
              <stop offset="0.662" stop-color="#FF6D00"/>
              <stop offset="0.972" stop-color="#F44336"/>
            </radialGradient>
            <radialGradient id="paint1_radial_30141_6168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.20443 5.06759) rotate(90.5787) scale(6.92404 5.21086)">
              <stop offset="0.214" stop-color="#FFF176"/>
              <stop offset="0.328" stop-color="#FFF27D"/>
              <stop offset="0.487" stop-color="#FFF48F"/>
              <stop offset="0.672" stop-color="#FFF7AD"/>
              <stop offset="0.793" stop-color="#FFF9C4"/>
              <stop offset="0.822" stop-color="#FFF8BD" stop-opacity="0.804"/>
              <stop offset="0.863" stop-color="#FFF6AB" stop-opacity="0.529"/>
              <stop offset="0.91" stop-color="#FFF38D" stop-opacity="0.209"/>
              <stop offset="0.941" stop-color="#FFF176" stop-opacity="0"/>
            </radialGradient>
          </defs>
        </svg>
        <Countdown
          className={s.time}
          expiredTime={dayjs.utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
          hideIcon={true}
          onRefreshEnd={() => setIsEnd(true)}
        />
      </Flex>
      <Flex direction={"column"} alignItems={"center"}>
        <Center className={s.raffleBg}>
          <img style={{width: '100px', height: '100px'}} src={"/public-sale/raffleImg.png"} alt="raffleBtnBg" />
        </Center>
        <Text className={s.title} textAlign={"center"}>Share to earn reward worth <span className={s.highlight}>$3000</span></Text>
        <Flex className={s.learnMoreWrapper} gap={3} onClick={handleShareTw}>
          <Text>Share</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default RaffleButton;
