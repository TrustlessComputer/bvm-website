import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import styles from '@/modules/staking/components/TeamPoints/styles.module.scss';
import { formatAmountToClient, formatCurrency } from '@/utils/format';
import SvgInset from '@/components/SvgInset';
import React from 'react';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';
import { BVM_TOKEN_SYMBOL } from '@constants/constants';
import { membersSelector, stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { useAppSelector } from '@/stores/hooks';
import useShareStakeOnX from '@/modules/staking/hooks/useShareStakeOnX';
import MemberListModal from '@/modules/staking/components/MemberListModal';

const TeamInfo = () => {
  const {memberCount} = useAppSelector(membersSelector);
  const stakeUser = useAppSelector(stakeUserSelector);
  const { onShareStakeOnX } = useShareStakeOnX();

  const {
    isOpen: isOpenMembers,
    onOpen: onOpenMembers,
    onClose: onCloseMembers,
  } = useDisclosure();

  const onShare = () => {
    onShareStakeOnX();
  };

  return (
    <>
      <Flex
        width="100%"
        justifyContent="space-between"
        flexDirection={{base: 'column', md: 'row'}}
        gap={{base: '12px', md: '0px'}}
      >
        <Flex
          gap={{base: '24px', md: '48px'}}
          justifyContent={{base: 'space-between', md: 'flex-start'}}
        >
          <Box className={styles.box}>
            <p className={styles.box_title}>Total staking amount</p>
            <p className={styles.box_value}>
              {formatCurrency(
                formatAmountToClient(stakeUser?.teamPrincipleBalance || 0),
                0,
                STAKE_MAX_DECIMAL,
              )}{' '}
              {BVM_TOKEN_SYMBOL}
            </p>
          </Box>
          <Box className={styles.box}>
            <p className={styles.box_title}>Members</p>
            <Text
              cursor="pointer"
              className={styles.box_value}
              _hover={{opacity: 0.7}}
              onClick={onOpenMembers}
            >
              {memberCount || '-'}
            </Text>
          </Box>
        </Flex>
        <Box className={styles.box}>
          <Flex
            cursor="pointer"
            _hover={{opacity: 0.7}}
            gap="4px"
            backgroundColor="white"
            borderRadius="100px"
            padding="8px 12px"
            color="black"
            alignItems="center"
            justifyContent="center"
            fontWeight="500"
            height="40px"
            width="120px"
            fontSize="16px"
            onClick={onShare}
            mt="auto"
            mb="auto"
          >
            Share
            <SvgInset
              svgUrl={`/icons/ic-tw-black.svg`}
              size={16}
              className="ic-copy"
            />
          </Flex>
        </Box>
      </Flex>
      <MemberListModal isOpen={isOpenMembers} onClose={onCloseMembers}/>
    </>
  );
};

export default TeamInfo;
