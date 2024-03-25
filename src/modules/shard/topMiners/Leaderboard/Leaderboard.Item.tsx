import { StakeLeaderBoard } from '@/services/interfaces/stakeV2';
import { Flex, Image, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';
import { formatCurrency, formatName } from '@/utils/format';
import styles from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import cs from 'classnames';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { StakeV2Role } from '@/contract/stakeV2/types';
import Avatar from '@/components/Avatar';
import { ethers } from 'ethers';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { compareString } from '@/utils/string';
import { getUrlAvatarTwitter } from '@utils/twitter';
import { shortCryptoAddress } from '@utils/address';
import { CDN_URL_ICONS } from '@/config';
import { useAppSelector } from '@/stores/hooks';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';
import useShareStakeOnX from '@/modules/shard/topMiners/hooks/useShareStakeOnX';

interface IProps {
  data: StakeLeaderBoard;
  i: number;
  cols: any[];
}

const LeaderboardItem = ({ data }: IProps) => {
  // const { address } = useAuthen();
  const address = '';
  const stakeUser = useAppSelector(stakeUserSelector);
  const { onShareStakeOnX } = useShareStakeOnX();
  // const target = React.useMemo(() => {
  //   return getTarget({
  //     teamPrincipleBalance: new BigNumberJS(data?.principle_balance || 0)
  //       .times(1e18)
  //       .toString(),
  //   });
  // }, [data?.principle_balance]);

  const isEther = React.useMemo(() => {
    return ethers.utils.isAddress(data?.twitter_username || '');
  }, [data?.twitter_avatar]);

  const onAvatarClick = () => {
    if (isEther) {
      return window.open(
        `https://explorer.nakachain.xyz/address/${data.address}`,
      );
    }

    window.open(`https://twitter.com/${data?.twitter_username}`);
  };

  return (
    <>
      <Tr
        key={data.id}
        className={cs(styles.leaderBoardItem, {
          [styles.leaderBoardItem_active as string]: data?.need_active,
        })}
      >
        <Td>
          <Flex
            cursor="pointer"
            onClick={onAvatarClick}
            gap="8px"
            alignItems="center"
          >
            {isEther ? (
              <Jazzicon
                diameter={32}
                seed={jsNumberForAddress(data?.twitter_username || '')}
              />
            ) : (
              <Avatar
                url={getUrlAvatarTwitter(
                  data?.twitter_avatar as string,
                  'normal',
                )}
                address={data?.address || ''}
                width={32}
                name={data?.twitter_username || ''}
              />
            )}
            <Flex
              width={'100%'}
              gap={'12px'}
              direction={'row'}
              alignItems="center"
            >
              <Flex flexDirection="column">
                {data?.twitter_name ? (
                  <>
                    <p className={styles.leaderBoardItem_name}>
                      {formatName(data?.twitter_name as string, 8)}
                    </p>
                    {data.need_active &&
                      compareString(data?.address, address) && (
                        <Text color="black !important">(YOU)</Text>
                      )}
                  </>
                ) : (
                  <p className={styles.leaderBoardItem_name}>
                    {shortCryptoAddress(data?.address || ('' as string), 8)}
                    {data.need_active &&
                      compareString(data?.address, address) && (
                        <Text color="black !important">(YOU)</Text>
                      )}
                  </p>
                )}
              </Flex>
              {data?.need_active && (
                <Flex
                  cursor="pointer"
                  _hover={{ opacity: 0.7 }}
                  gap="4px"
                  backgroundColor="white"
                  borderRadius="100px"
                  padding="8px 12px"
                  color="black"
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  fontWeight="500"
                  onClick={onShareStakeOnX}
                  w="fit-content"
                  border="2px solid rgba(16, 200, 0, 0.30);"
                >
                  <p>Share on</p>
                  <SvgInset
                    svgUrl={`/icons/simple-icons_x.svg`}
                    size={18}
                    className="ic-copy"
                  />
                </Flex>
              )}
            </Flex>
          </Flex>
        </Td>
        <Td>
          <Flex gap="4px" alignItems="center">
            <Image
              src={`https://cdn.nakaswap.org/naka/icons/ic-bvm.svg`}
              width="18px"
              borderRadius="32px"
            />
            <p className={styles.leaderBoardItem_amount}>
              {formatCurrency(
                data.principle_balance,
                0,
                STAKE_MAX_DECIMAL,
                'BTC',
                false,
              )}{' '}
              BVM
            </p>
          </Flex>
        </Td>
        <Td>
          <Flex gap="8px" alignItems="center">
            <Text
              fontSize="16px"
              fontWeight="500"
              lineHeight="120%"
              whiteSpace="pre"
              textAlign="center"
              color="black !important"
            >
              {data.total_members}
              {data.need_active &&
              stakeUser?.teamRole === StakeV2Role.member ? (
                <span style={{ fontSize: '12px', color: 'black' }}>{`\n(YOU +${
                  Number(data.total_members || 0) - 1
                })`}</span>
              ) : (
                ''
              )}
            </Text>
          </Flex>
        </Td>
        <Td>
          <Flex gap="4px" alignItems="center" justifyContent="flex-end">
            {/*<Image src={`/icons/stake_active.svg`} width="18px" height="18px" />*/}
            <p className={styles.leaderBoardItem_award}>
              {formatCurrency(data.rewarded, 0, 2, 'BTC', false)} BVM
            </p>
          </Flex>
        </Td>
      </Tr>
    </>
  );
};

export default LeaderboardItem;
