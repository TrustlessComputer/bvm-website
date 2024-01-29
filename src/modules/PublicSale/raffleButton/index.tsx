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
import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { getLink } from '@/utils/helpers';
import {
  getPublicSaleProgram,
  getRaffleJoinProgame,
  IPublicSalePrograme,
  joinRafflePrograme,
} from '@/services/public-sale';
import AuthenStorage from '@/utils/storage/authen.storage';

const RaffleButton = ({className}: any) => {
  const [isEnd, setIsEnd] = React.useState(false);
  const user = useAppSelector(userSelector);
  const [programeInfo, setProgrameInfo] = useState<IPublicSalePrograme>();
  const [isLoading, setIsLoading] = useState(true);
  const [raffleCode, setRaffleCode] = useState();
  const token = AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();

  const handleShareTw = () => {
    if(token) {
      const shareUrl = getLink(user?.referral_code || '');

      const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon\n\nJoin the allowlist`;
      const url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`;

      window.open(url, '_blank');
      joinRafflePrograme(programeInfo?.id as number);
    }
  }

  useEffect(() => {
    getProgramInfo();
  }, []);

  useEffect(() => {
    if(programeInfo?.id) {
      getRaffleJoinInfo();
    }
  }, [programeInfo?.id]);

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleProgram();
      setProgrameInfo(res);
    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  }

  const getRaffleJoinInfo = async () => {
    const res = await getRaffleJoinProgame(programeInfo?.id as number);
    setRaffleCode(res);
  }

  return !isLoading && (
    <Popover>
      <PopoverTrigger>
        <Flex className={cx(s.container, className)}>
          <Flex gap={"6px"} className={s.timeWrapper}>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.8336 3.81861C3.78016 4.38861 3.74266 5.39736 4.07923 5.82674C4.07923 5.82674 3.92079 4.71861 5.3411 3.3283C5.91298 2.76861 6.04516 2.00736 5.84548 1.43642C5.73204 1.11299 5.52485 0.845799 5.34485 0.659236C5.23985 0.549549 5.32048 0.368611 5.47329 0.375174C6.39766 0.416424 7.89579 0.673298 8.53235 2.2708C8.81173 2.97205 8.83235 3.69674 8.69923 4.43361C8.61485 4.90424 8.31485 5.95049 8.99923 6.07892C9.48766 6.1708 9.72391 5.78267 9.82985 5.5033C9.87391 5.38705 10.0267 5.35799 10.1092 5.4508C10.9342 6.38924 11.0045 7.49455 10.8339 8.44611C10.5039 10.2855 8.6411 11.6242 6.79048 11.6242C4.4786 11.6242 2.63829 10.3014 2.1611 7.90705C1.96891 6.94049 2.06641 5.02799 3.55704 3.67799C3.66766 3.57674 3.8486 3.66674 3.8336 3.81861Z" fill="url(#paint0_radial_30141_6168)"/>
              <path d="M7.63538 7.25774C6.78319 6.16086 7.16475 4.9093 7.37381 4.41055C7.40194 4.34493 7.32694 4.28305 7.26788 4.32336C6.90131 4.57274 6.15038 5.15961 5.80069 5.98555C5.32725 7.10211 5.361 7.64868 5.64131 8.31618C5.81006 8.71836 5.61413 8.80368 5.51569 8.81868C5.42006 8.83368 5.33194 8.76993 5.26163 8.70336C5.05935 8.50917 4.91521 8.26244 4.84538 7.99086C4.83038 7.93274 4.75444 7.9168 4.71975 7.96461C4.45725 8.32743 4.32131 8.90961 4.31475 9.32118C4.29413 10.5934 5.34506 11.6246 6.61631 11.6246C8.2185 11.6246 9.38569 9.85274 8.46506 8.37149C8.19788 7.94024 7.94663 7.65805 7.63538 7.25774Z" fill="url(#paint1_radial_30141_6168)"/>
              <defs>
                <radialGradient id="paint0_radial_30141_6168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.33258 11.6534) rotate(-179.751) scale(6.61759 10.8581)">
                  <stop offset="0.314" stop-color="#FF9800"/>
                  <stop offset="0.662" stop-color="#FF6D00"/>
                  <stop offset="0.972" stop-color="#F44336"/>
                </radialGradient>
                <radialGradient id="paint1_radial_30141_6168" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.70443 5.06759) rotate(90.5787) scale(6.92404 5.21086)">
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
              expiredTime={dayjs.utc(programeInfo?.end_date, 'YYYY-MM-DD HH:mm:ss').toString()}
              hideIcon={true}
              onRefreshEnd={() => setIsEnd(true)}
            />
          </Flex>
        </Flex>
      </PopoverTrigger>
      <PopoverContent className={cx(s.menuContent)}>
        <PopoverArrow />
        <PopoverBody>
          <Flex gap={6} direction={["column", "row"]}>
            <Flex direction={"column"}>
              <Text className={s.title}>{programeInfo?.title}</Text>
              <Text className={s.desc}>{programeInfo?.description}</Text>
              <Flex gap={4}>
                {/*<a href={programeInfo?.link} target={"_blank"}>
                  <Flex className={s.learnMoreWrapper} gap={3}>
                    <Text>Learn more</Text>
                    <Center w={"28px"} height={"28px"} bgColor={"#FA4E0E"}>
                      <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z" fill="white"/>
                      </svg>
                    </Center>
                  </Flex>
                </a>*/}
                {
                  raffleCode ? (
                    <Text className={s.yourRaffleCode}>Your raffle code: <b>{raffleCode}</b></Text>
                  ) : (
                    <Flex className={cx(s.learnMoreWrapper, !token ? s.isDisable : '')} gap={3} onClick={handleShareTw}>
                      <Text>Get raffle code</Text>
                      <Center w={"28px"} height={"28px"} bgColor={"#FA4E0E"}>
                        <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z" fill="white"/>
                        </svg>
                      </Center>
                    </Flex>
                  )
                }
              </Flex>
            </Flex>
            <Center className={s.raffleBg}>
              <img src={programeInfo?.image} alt="raffleBtnBg" />
            </Center>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default RaffleButton;
