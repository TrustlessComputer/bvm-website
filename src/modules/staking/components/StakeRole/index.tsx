import React, { useContext } from 'react';
import styles from './styles.module.scss';
import OTPInput from 'react-otp-input';
import { Button, Flex, Select, Text } from '@chakra-ui/react';
import { StakeV2Role } from '@/contract/stakeV2/types';
import CStakeV2 from '@/contract/stakeV2/stakeV2.class';
import STAKE_TOKEN, { MAX_LENGTH_CODE } from '@/contract/stakeV2/configs';
import { ethers } from 'ethers';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import { generateRandomString } from '@utils/encryption';
import { requestReload } from '@/stores/states/common/reducer';
import { sleep } from '@toruslabs/base-controllers';
import toast from 'react-hot-toast';
import { NakaConnectContext } from '@/Providers/NakaConnectProvider';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';

const StakeRole = React.memo(() => {
  const cStake = new CStakeV2();
  const address  = useAppSelector(nakaAddressSelector);
  const { getConnector } = useContext(NakaConnectContext);
  const isAuthenticated = React.useMemo(() => {
    return !!address
  }, [address]);

  const stakeUser = useAppSelector(stakeUserSelector);
  const [stakeRole, setStakeRole] = React.useState<StakeV2Role>(
    StakeV2Role.captain,
  );
  const [teamCode, setTeamCode] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const isHaveTeam = React.useMemo(() => {
    return !!stakeUser?.isHaveTeam;
  }, [stakeUser]);

  const onSubmit = React.useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      let _teamCode = ethers.utils.formatBytes32String(
        teamCode || generateRandomString(MAX_LENGTH_CODE),
      );

      switch (stakeRole) {
        case StakeV2Role.captain: {
          const captain = await cStake.getTeamCaptain({ code: _teamCode });
          if (captain) {
            _teamCode = ethers.utils.formatBytes32String(
              teamCode || generateRandomString(MAX_LENGTH_CODE),
            );
          }
          break;
        }
        case StakeV2Role.member: {
          const captain = await cStake.getTeamCaptain({ code: _teamCode });
          if (!captain) {
            throw new Error('Invalid invite code.');
          }
          break;
        }
      }

      const calldata = cStake.createStakeCallData({
        amount: '0',
        code: _teamCode,
        role: stakeRole,
      });

      const connector = getConnector();
      await connector.requestSign({
        calldata,
        target: "_blank",
        to: STAKE_TOKEN.BVM.stBVM || '',
        functionType: 'Stake role',
      })

      dispatch(requestReload());
      await sleep(2);
      toast.success('Successfully.')

      dispatch(requestReload());
    } catch (error: any) {
      toast.error(error?.message);
      setSubmitting(false);
    }
  }, [cStake, teamCode, stakeRole]);

  const renderCode = () => {
    if (isHaveTeam || (!isHaveTeam && stakeRole === StakeV2Role.member)) {
      return (
        <div className={styles.codeInput}>
          <OTPInput
            numInputs={MAX_LENGTH_CODE}
            value={teamCode}
            onChange={(_code) => {
              setTeamCode(_code);
            }}
            renderInput={(props) => <input disabled={isHaveTeam} {...props} />}
          />
        </div>
      );
    }

    return <></>;
  };

  const renderContent = () => {
    let content = '';
    switch (stakeRole) {
      case StakeV2Role.captain:
        content = `As a leader in the crypto community, show your passion and
              commitment. The more $BVM members stake in your pool, the greater
              interest you'll earn. It's time to rally your connections!`;
        break;
      case StakeV2Role.member:
        content = `Stake your $BVM tokens and join the collective effort to earn higher interest. Let's build together!`;
        break;
    }

    return <Text fontSize="16px">{content}</Text>;
  };

  return (
    <Flex direction="column">
      <p className={styles.boxTitle}>
        <b>Your squad.</b> Invite friends to rank up and earn more.
      </p>
      <Flex className={styles.container}>
        <Flex flexDir="column" gap="8px">
          <p className={styles.title}>
            Stake Role{' '}
            <span>
              {stakeRole === StakeV2Role.captain ? 'Captain' : 'Member'}
            </span>
          </p>
          {renderContent()}
        </Flex>
        <Flex mt="20px" gap="12px" alignItems="center" flexWrap="wrap">
          <Flex width={{ base: '102px', md: '112px' }}>
            <Select
              value={stakeRole}
              paddingTop="4px"
              paddingBottom="4px"
              bgColor="rgba(255, 255, 255, 0.10)"
              borderRadius="1000px"
              fontSize={{ base: '14px', md: '16px' }}
              isDisabled={isHaveTeam}
              onChange={(e) => {
                const role = Number(e.target.value);
                setStakeRole(role);
                if (role === StakeV2Role.captain) {
                  setTeamCode('');
                }
              }}
            >
              <option value={StakeV2Role.captain}>Captain</option>
              <option value={StakeV2Role.member}>Member</option>
            </Select>
          </Flex>
          <Flex alignItems="center" gap="12px">
            {renderCode()}
            <Button
              isDisabled={
                isHaveTeam ||
                submitting ||
                (stakeRole === StakeV2Role.member &&
                  (!teamCode || teamCode.length < MAX_LENGTH_CODE)) ||
                !isAuthenticated ||
                !stakeUser?.isStaked
              }
              isLoading={submitting}
              backgroundColor="white"
              onClick={onSubmit}
              type="button"
              minW="80px"
              color="black"
            >
              {stakeRole === StakeV2Role.captain ? 'Generate Code' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
});

export default StakeRole;
