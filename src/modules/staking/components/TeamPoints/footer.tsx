import React from 'react';
import { StakeV2Role } from '@/contract/stakeV2/types';
import { Box, Flex } from '@chakra-ui/react';
import styles from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import copy from 'copy-to-clipboard';
import { useAppSelector } from '@/stores/hooks';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { isAmount } from '@utils/number';
import toast from 'react-hot-toast';

const TeamPointFooter = () => {
  const stakeUser = useAppSelector(stakeUserSelector);
  const roleName = React.useMemo(() => {
    switch (stakeUser?.teamRole) {
      case StakeV2Role.captain:
        return 'Captain';
      default:
        return 'Member';
    }
  }, []);

  return (
    <Flex className={styles.footerBox}>
      <p className={styles.footerBox_text}>
        Multiplier Points APR{' '}
        <span>
          {isAmount(stakeUser?.stakingPercent)
            ? stakeUser?.stakingPercent + '%'
            : '-'}
        </span>
      </p>
      <p className={styles.footerBox_text}>
        Stake Role <span>{roleName}</span>
      </p>
      <Flex className={styles.footerBox_text} alignItems="center" gap="6px">
        <p>
          Invite code <span>{stakeUser?.userTeamCode || '-'}</span>{' '}
        </p>
        {!!stakeUser?.userTeamCode && (
          <Box _hover={{ opacity: 0.9 }} mt="4px" cursor="pointer">
            <SvgInset
              svgUrl={'/icons/ic-copy-gradient.svg'}
              onClick={() => {
                copy(stakeUser?.userTeamCode || '');
                toast.success('Copied.')
              }}
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default TeamPointFooter;
