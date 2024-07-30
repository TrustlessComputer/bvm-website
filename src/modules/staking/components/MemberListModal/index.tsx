import BaseModal from '@/components/BaseModal';
import ListTable, { ColumnProp } from '@/components/ListTable';
import React, { useMemo } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import styles from '../HistoryModal/styles.module.scss';
import { formatCurrency } from '@/utils/format';
import { StakeMember } from '@/services/interfaces/stakeV2';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import copy from 'copy-to-clipboard';
import SvgInset from '@/components/SvgInset';
import orderBy from 'lodash/orderBy';
import { compareString } from '@/utils/string';
import { useAppSelector } from '@/stores/hooks';
import { membersSelector } from '@/stores/states/stakingV2/selector';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import toast from 'react-hot-toast';
import { CDN_URL_ICONS } from '@/config';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IMember extends StakeMember {
  need_active: boolean;
}

const MemberListModal = (props: IProps) => {
  const { isOpen, onClose } = props;
  const { members } = useAppSelector(membersSelector);
  const userAddress = useAppSelector(nakaAddressSelector);

  const MemberMaps = React.useMemo(() => {
    return orderBy(
      members,
      [(item: IMember) => compareString(item.user.address, userAddress)],
      ['desc'],
    ).map((item: any) => ({
      ...item,
      need_active: compareString(item.user.address, userAddress),
    }));
  }, [members, userAddress]);

  const labelConfig = {
    color: '#898989',
    fontSize: '14px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'address',
        label: <Box>ADDRESS</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IMember) {
          const isYou = compareString(data.user?.address, userAddress);
          const address = data.user?.address || '';
          return (
            <Flex alignItems="center" gap="12px">
              <Jazzicon diameter={36} seed={jsNumberForAddress(address)} />
              <Flex alignItems="center" gap="4px">
                <Text className={styles.title}>{address}</Text>
                <Box
                  cursor="pointer"
                  onClick={() => {
                    copy(address);
                    toast.success('Copied.')
                  }}
                >
                  <SvgInset svgUrl={`/icons/ic-copy.svg`} size={16} />
                </Box>
                {isYou && <Text color="#008D30 !important">(You)</Text>}
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'amount',
        label: <Box>STAKED TOKENS</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IMember) {
          return (
            <Flex alignItems="center" gap="12px">
              <Image
                src={`${CDN_URL_ICONS}/ic-bvm.svg`}
                width="22px"
                borderRadius="32px"
              />
              <Text className={styles.title}>
                {formatCurrency(
                  data.principle_balance,
                  0,
                  STAKE_MAX_DECIMAL,
                  'BTC',
                )}{' '}
                BVM
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'stake-role',
        label: <Box>STAKE ROLE</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IMember) {
          return (
            <Flex alignItems="center" gap="12px">
              <Text textTransform="uppercase" className={styles.title}>
                {data.team_role}
              </Text>
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <BaseModal isShow={isOpen} theme="dark" onHide={onClose} title="Your Team">
      <ListTable
        data={MemberMaps}
        columns={columns}
        className={styles.tableContainer}
      />
    </BaseModal>
  );
};

export default MemberListModal;
