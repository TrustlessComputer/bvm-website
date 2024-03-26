import { StakeLeaderBoard, StakeMember } from '@/services/interfaces/stakeV2';
import { Flex, Image, Td, Text, Tr } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { formatCurrency, formatName } from '@/utils/format';
import styles from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import cs from 'classnames';
import Avatar from '@/components/Avatar';
import { ethers } from 'ethers';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { compareString, labelAmountOrNumberAdds } from '@/utils/string';
import { getUrlAvatarTwitter } from '@utils/twitter';
import { shortCryptoAddress } from '@utils/address';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';
import useShareStakeOnX from '@/modules/shard/topMiners/hooks/useShareStakeOnX';
import stakeV2Services from '@/services/stakeV2';

interface IProps {
  data: StakeLeaderBoard;
  i: number;
  cols: any[];
}

const LeaderboardItem = ({ data }: IProps) => {
  // const { address } = useAuthen();
  const address = '';
  const [members, setMembers] = useState<StakeMember[]>();
  const { onShareStakeOnX } = useShareStakeOnX();
  // const target = React.useMemo(() => {
  //   return getTarget({
  //     teamPrincipleBalance: new BigNumberJS(data?.principle_balance || 0)
  //       .times(1e18)
  //       .toString(),
  //   });
  // }, [data?.principle_balance]);

  useEffect(() => {
    if(data) {
      getStakeMembers();
    }
  }, [data]);

  const firstMember = useMemo(() => {
    if(members && members.length > 0) {
      return members[0].user;
    } else {
      return null;
    }
  }, [members]);

  const getStakeMembers = async () => {
    if (!data?.team_code) {
      return;
    }
    try {
      const members = await stakeV2Services.getTeamMembers({
        teamCode: data?.team_code || '',
      });
      setMembers(members);
    } catch (e) {
      setMembers([]);
    }
  };

  const isEther = React.useMemo(() => {
    return ethers.utils.isAddress(data?.twitter_username || '');
  }, [data?.twitter_avatar]);

  const isEtherFirstMember = React.useMemo(() => {
    return ethers.utils.isAddress(firstMember?.twitter_username || '');
  }, [firstMember?.twitter_avatar]);

  const onAvatarClick = () => {
    if (isEther) {
      return window.open(
        `https://explorer.nakachain.xyz/address/${data.address}`,
      );
    }

    window.open(`https://twitter.com/${data?.twitter_username}`);
  };

  const onFirstMemberAvatarClick = () => {
    if (isEtherFirstMember) {
      return window.open(
        `https://explorer.nakachain.xyz/address/${firstMember?.address}`,
      );
    }

    window.open(`https://twitter.com/${firstMember?.twitter_username}`);
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
                      {formatName(data?.twitter_name as string, 16)}
                    </p>
                    {data.need_active &&
                      compareString(data?.address, address) && (
                        <Text color="black !important">(YOU)</Text>
                      )}
                  </>
                ) : (
                  <p className={styles.leaderBoardItem_name}>
                    {shortCryptoAddress(data?.address || ('' as string), 16)}
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
          <Flex
            cursor="pointer"
            onClick={onFirstMemberAvatarClick}
            gap="8px"
            alignItems="center"
          >
            {isEtherFirstMember ? (
              <Jazzicon
                diameter={32}
                seed={jsNumberForAddress(firstMember?.twitter_username || '')}
              />
            ) : (
              <Avatar
                url={getUrlAvatarTwitter(
                  firstMember?.twitter_avatar as string,
                  'normal',
                )}
                address={firstMember?.address || ''}
                width={32}
                name={firstMember?.twitter_username || ''}
              />
            )}
            <Flex
              width={'100%'}
              gap={'12px'}
              direction={'row'}
              alignItems="center"
            >
              <Flex flexDirection="column">
                {firstMember?.twitter_name ? (
                  <>
                    <p className={styles.leaderBoardItem_name}>
                      {formatName(firstMember?.twitter_name as string, 16)}
                    </p>
                  </>
                ) : (
                  <p className={styles.leaderBoardItem_name}>
                    {shortCryptoAddress(firstMember?.address || ('' as string), 16)}
                  </p>
                )}
                <p className={styles.leaderBoardItem_member}>{data.total_members} Member{labelAmountOrNumberAdds(data.total_members)}</p>
              </Flex>
            </Flex>
          </Flex>
        </Td>
        <Td>
          <Flex gap="4px" alignItems="center">
            <Image
              src={`/shard/bvm_icon.svg`}
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
        {/*<Td>
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
            </Text>
          </Flex>
        </Td>*/}
        <Td>
          <Flex gap="4px" alignItems="center" justifyContent="flex-end">
            {/*<Image src={`/icons/stake_active.svg`} width="18px" height="18px" />*/}
            <p className={styles.leaderBoardItem_award}>
              +{formatCurrency(data.rewarded, 0, 2, 'BTC', false)} BVM
            </p>
          </Flex>
        </Td>
      </Tr>
    </>
  );
};

export default LeaderboardItem;
