import { isAddress } from '@ethersproject/address';
import { validate } from 'bitcoin-address-validation';
import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import s from '@/modules/PublicSale/BuyForm/styles.module.scss';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Image from 'next/image';
import { CDN_URL_ICONS } from '@/config';
import Avatar from '@/components/Avatar';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';

const IMAGE_SIZE = 14;

const UserLoggedAvatar = () => {
  const user = useAppSelector(userSelector);
  const renderUser = () => {
    if (!user) return '';
    const isEVM = isAddress(user.twitter_id);
    const isBTC = validate(user.twitter_id);
    let component: React.ReactNode | undefined = undefined;
    if (user.twitter_id && (isEVM || isBTC)) {
      component = (
        <Flex
          className={s.profileBox_content}
          onClick={() => {
            if (isEVM) {
              window.open(`https://etherscan.io/address/${user?.twitter_id}`)
            } else {
              window.open(`https://mempool.space/address/${user?.twitter_id}`)
            }
          }}>
          {isEVM ? (
            <Jazzicon diameter={IMAGE_SIZE} seed={jsNumberForAddress(user?.twitter_id || "")} />
          ) : (
            <Image src={`${CDN_URL_ICONS}/ic-btc-2.svg`} alt="ic bitcoin" width={IMAGE_SIZE} height={IMAGE_SIZE} />
          )}
          {/*<Text color="black" fontSize="14px" fontWeight="500">{ellipsisCenter({ str: user.twitter_id })}</Text>*/}
        </Flex>
      )
    } else if (user.twitter_id) {
      component = (
        <Flex
          className={s.profileBox_content}
          onClick={() => {
            setTimeout(() => {
              window.open(`https://twitter.com/${user?.twitter_username}`)
            })
          }}
        >
          <Avatar
            url={getUrlAvatarTwitter(
              user?.twitter_avatar as string,
              'normal',
            )}
            address={''}
            width={IMAGE_SIZE}
            name={user.twitter_name || user.twitter_username || ''}
          />
          {/*<Text color="black" fontSize="14px" fontWeight="500">{formatString(user.twitter_name, 12)}</Text>*/}
        </Flex>
      )
    }

    if (component) {
      return (
        <Flex className={s.profileBox}>
          {component}
        </Flex>
      )
    }
  }

  if (!user) return <></>;
  return (
    <Flex>
      {renderUser()}
    </Flex>
  )
}

export default UserLoggedAvatar;
