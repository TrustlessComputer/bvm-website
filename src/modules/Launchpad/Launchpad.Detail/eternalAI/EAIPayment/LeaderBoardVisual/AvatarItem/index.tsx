import { compareString } from '@/utils/string';
import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import cx from 'clsx';
import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { gsap } from 'gsap';
import {
  forwardRef,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { proxy } from 'valtio';
import s from './styles.module.scss';
import ContributionIDItem from '../../ContributionIDs/item';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import {
  laupEAIPaymentSelector,
  needCheckDepositSelector,
} from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { useSelector } from 'react-redux';
import { formatAddressOrName, formatCurrency } from '@/utils/format';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import { shortCryptoAddress } from '@/utils/address';

interface IProps {
  data: ILeaderBoardEAI;
  isShowName?: boolean;
  isYou?: boolean;
  onCompleted?: () => void;
  idx: number;
  topBrains: {
    address: string;
    brains: {
      num: number;
      obj: {
        icon_thumb: string;
        label: string;
        style: any;
      };
      title: string;
      first: string;
      last: string;
    }[];
  }[];
}

export const PlaceImage = (): ReactElement => {
  return (
    <Image
      width={120}
      height={120}
      src={'/none-avatar.jpeg'}
      alt={'user'}
      style={{ cursor: 'pointer' }}
    />
  );
};

const AvatarItem = forwardRef((props: IProps, ref: any) => {
  const { data, idx, isYou, ...rest } = props;
  const lottieRef = useRef<any>();
  const refMoney = proxy<{ value: number }>({
    value: Number(data?.usdt_value) || 0,
  });
  // const refMoney = useRef<{ value: number }>({ value: Number(data?.usdt_value) || 0 });
  const refInertMoney = useRef<any>(null);
  const [isLoopDone, setIsLoopDone] = useState(true);
  const needCheckDeposit = useSelector(needCheckDepositSelector);
  const animatedLatestContributors = useSelector(
    laupEAIPaymentSelector,
  ).animatedLatestContributors;

  const newTotalMoney = useMemo((): number => {
    if (needCheckDeposit) {
      const add = animatedLatestContributors?.find(
        (c) =>
          (c.address &&
            data?.address &&
            compareString(c.address, data?.address)) ||
          compareString(c.address, data?.address),
      );

      if (add) {
        return refMoney.value + Number(add.usdt_value);
      } else {
        return refMoney.value;
      }
    } else {
      return refMoney.value;
    }
  }, [needCheckDeposit, JSON.stringify(animatedLatestContributors), data]);

  useEffect(() => {
    const gc = gsap.context(() => {
      if (!refInertMoney.current) return;
      if (newTotalMoney && refMoney.value !== newTotalMoney) {
        const numberLoop = 5;
        const duration = 19 / 24;
        gsap.to(refMoney, {
          value: newTotalMoney,
          ease: 'power3.inOut',
          duration: numberLoop * duration,
          onComplete: (): void => {
            setIsLoopDone(true);
          },
          overflow: 'auto',
          onUpdate: () => {
            if (refInertMoney.current) {
              refInertMoney.current.innerHTML = `$${formatCurrency(
                refMoney.value,
                0,
                0,
                '',
                true,
              )}`;
            }
          },
          onStart: () => {
            if (!lottieRef.current) return;
            lottieRef.current.setLoop(numberLoop);
            lottieRef.current.play();
            setIsLoopDone(false);
          },
        });
      } else {
        refInertMoney.current.innerHTML = `$${formatCurrency(
          refMoney.value,
          0,
          0,
          '',
          true,
        )}`;
      }
    });
    return () => {
      setIsLoopDone(true);
      gc.revert();
    };
  }, [newTotalMoney, data]);

  const brains = useMemo(
    () => props.topBrains.find((v) => compareString(v.address, data.address)),
    [props.topBrains, data],
  );

  const renderToolTip = useMemo(() => {
    let title = `${
      data?.twitter_name && isAddress(data?.twitter_name)
        ? shortCryptoAddress(data?.twitter_name, 8)
        : data?.twitter_name
    } has collected `;

    if (brains?.brains?.length === 2) {
      title += `<b>${brains?.brains[0]?.num}</b> ${
        brains?.brains[0]?.title
      } Seed${(brains?.brains[0]?.num || 0) > 1 ? 's' : ''} (#${
        brains?.brains[0]?.first
      }${
        brains?.brains[0]?.num || 0 > 1 ? ` - #${brains?.brains[0]?.last}` : ''
      }) and <b>${brains?.brains[1]?.num}</b> ${brains?.brains[1]?.title} Seed${
        (brains?.brains[1]?.num || 0) > 1 ? 's' : ''
      } (#${brains?.brains[1]?.first}${
        brains?.brains[1]?.num || 0 > 1 ? ` - #${brains?.brains[1]?.last}` : ''
      })`;
    } else if (brains?.brains?.length === 1) {
      title += `<b>${brains?.brains[0]?.num}</b> ${
        brains?.brains[0]?.title
      } Seed${(brains?.brains[0]?.num || 0) > 1 ? 's' : ''} (#${
        brains?.brains[0]?.first
      }${
        brains?.brains[0]?.num || 0 > 1 ? ` - #${brains?.brains[0]?.last}` : ''
      })`;
    }

    return (
      <Box p={'12px 6px'}>
        <Flex mb={'12px'} gap={'12px'}>
          {brains?.brains?.map((v, i) => (
            <ContributionIDItem key={i} id={v.first as any} hideID={true} />
          ))}
        </Flex>
        <Text dangerouslySetInnerHTML={{ __html: title }} />
        <Text mt={'4px'} opacity={0.9} fontSize={'12px'}>
          Eternal Seeds are placeholders for deploying AIs on the Eternal AI
          blockchain. The lower a seed number, the more historical value it has.
          Like Ordinal inscriptions, low seed numbers like Sub 1K are desirable.
        </Text>
      </Box>
    );
  }, [brains, data]);

  const renderContent = () => {
    return (
      <div className={s.avatarItem_inner}>
        {data?.levelRender === 0 && (
          <Image
            className={s.king}
            src={'/icons/public-sale/icon-king.svg'}
            width={60}
            height={60}
            alt={'king'}
          />
        )}

        <div
          className={s.avatarItem_avatar}
          onClick={() => {
            if (ethers.utils.isAddress(data?.twitter_username || '')) {
              window.open(
                `https://explorer.nakachain.xyz/address/${data?.twitter_username}`,
              );
            }
            if (
              !!data?.twitter_username &&
              !isNaN(Number(data?.twitter_id)) &&
              !ethers.utils.isAddress(data?.twitter_id || '') &&
              !data?.twitter_id?.startsWith('bc1p')
            ) {
              window.open(`https://twitter.com/${data?.twitter_username}`);
            }
          }}
        >
          {data?.address &&
          data?.twitter_username &&
          isAddress(data?.twitter_username) ? (
            <Jazzicon
              diameter={120}
              seed={jsNumberForAddress(data?.twitter_username)}
            />
          ) : (
            <Image
              width={120}
              height={120}
              src={
                getUrlAvatarTwitter(data?.twitter_avatar as string, 'medium') ||
                ''
              }
              alt={'medium'}
              fallback={
                <Image
                  width={120}
                  height={120}
                  src={'/none-avatar.jpeg'}
                  alt={'user'}
                  style={{ cursor: 'pointer' }}
                />
              }
            />
          )}
        </div>
        <div className={s.meta}>
          <p className={s.price} ref={refInertMoney} />
          {!isYou && (
            <p className={s.name}>
              {formatAddressOrName(data?.twitter_name || '')}
            </p>
          )}
          {isYou && <p className={cx(s.name, s.isYou)}>You</p>}

          <Flex className={s.brains}>
            <Tooltip
              bg={'#F6F6F6'}
              hasArrow
              minWidth={'min-content'}
              label={renderToolTip}
            >
              <Flex justifyContent={'center'} alignItems={'center'} gap={'8px'}>
                {brains?.brains?.map((v) => (
                  <Flex
                    alignItems={'center'}
                    gap={'2px'}
                    key={`${data.address}_${v.title}_${v.num}`}
                  >
                    <Text fontSize={'11px'} color={'#000'} fontWeight={600}>
                      {v.num}
                    </Text>
                    <Image
                      width={'20px'}
                      height={'20px'}
                      src={v.obj?.icon_thumb}
                    />
                  </Flex>
                ))}
              </Flex>
            </Tooltip>
          </Flex>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${s.avatarItem} ${s[`avatarItem__${idx}`]} ${
        isYou && s.isYou
      } ${
        data?.levelRender !== undefined && 'level-' + data?.levelRender
      } js-avatarItem`}
      ref={ref}
      {...rest}
    >
      <>{renderContent()}</>
      {
        <div className={`${s.lt} ${!isLoopDone ? s.isRun : ''}`}>
          <DotLottiePlayer
            className={s.lottie}
            lottieRef={lottieRef}
            src="/icons/presale-up-2.lottie"
          />
        </div>
      }
    </div>
  );
});

export default AvatarItem;
