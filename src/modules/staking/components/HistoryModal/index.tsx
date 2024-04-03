import BaseModal from '@/components/BaseModal';
import ListTable, { ColumnProp } from '@/components/ListTable';
import React, { useContext, useMemo } from 'react';
import styles from './styles.module.scss';
import { HistoryType, StakeHistory } from '@/services/interfaces/stakeV2';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { formatCurrency, formatDate } from '@/utils/format';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CStakeV2 from '@/contract/stakeV2/stakeV2.class';
// import { getErrorMessage } from '@/utils/error';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { historySelector } from '@/stores/states/stakingV2/selector';
import { requestReload } from '@/stores/states/common/reducer';
import { sleep } from '@toruslabs/base-controllers';
import { CDN_URL_ICONS } from '@/config';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';
import { compareString } from '@utils/string';
import toast from 'react-hot-toast';
import { INakaConnectContext, NakaConnectContext } from '@/Providers/NakaConnectProvider';
import STAKE_TOKEN from '@/contract/stakeV2/configs';
// import { showError, showSuccess } from '@/components/toast';
// import sleep from '@/utils/sleep';
// import { requestReload } from '@/store/states/common/reducer';
// import { compareString } from '@/utils/string';
// import { CDN_URL_ICONS } from '@/configs';

dayjs.extend(customParseFormat);

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLAIMED_IDS = [] as string[];

const StakeHistoryModal = (props: IProps) => {
  const { isOpen, onClose } = props;
  const history = useAppSelector(historySelector);
  const { getConnector } = useContext(NakaConnectContext) as INakaConnectContext;

  const [loadingID, setLoadingID] = React.useState<string | undefined>(
    undefined,
  );

  const cStake = new CStakeV2();
  const dispatch = useAppDispatch();

  const labelConfig = {
    color: '#898989',
    fontSize: '14px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
  };

  const onClaim = async (item: StakeHistory) => {
    try {
      const unStakeID = item.unstake_id.toString();
      setLoadingID(unStakeID);
      const calldata = cStake.createClaimUnstakeCallData({ unstakeID: unStakeID });
      const connector = getConnector();
      await connector.requestSign({
        calldata,
        target: "_blank",
        to: STAKE_TOKEN.BVM.stBVM || '',
        functionType: 'Claim Unstake',
      })
      dispatch(requestReload());
      await sleep(2);
      CLAIMED_IDS.push(unStakeID);
      toast.success('Claim successfully.')
    } catch (error: any) {
      console.log('ERROR: ', error);
      toast.error(error?.message)
    } finally {
      setLoadingID(undefined);
    }
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'type',
        label: <Box>TYPE</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: StakeHistory) {
          let name = '';
          switch (data.type) {
            case HistoryType.restake: {
              name = 'Restake';
              break;
            }
            case HistoryType.stake: {
              name = 'Stake';
              break;
            }
            case HistoryType.unStake: {
              name = 'Unstake';
              break;
            }
          }
          return (
            <Flex alignItems="center" gap="12px">
              <Text className={styles.title}>{name}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'amount',
        label: <Box>AMOUNT</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: StakeHistory) {
          return (
            <Flex alignItems="center" gap="6px">
              <Image
                src={`${CDN_URL_ICONS}/ic-bvm.svg`}
                width="20px"
                borderRadius="32px"
              />
              <Text className={styles.title}>
                {formatCurrency(
                  data.principle_amount,
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
        id: 'date',
        label: <Box textAlign="end">DATE</Box>,
        labelConfig: {
          ...labelConfig,
          display: 'flex',
          justifyContent: 'end',
        },
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
        },
        render(data: StakeHistory) {
          const showClaim = data.type === HistoryType.unStake;
          const isClaimed =
            data.is_claimed ||
            CLAIMED_IDS.some((unStakeID) =>
              compareString(unStakeID, data.unstake_id),
            );
          const isClaimable = dayjs.utc(data.valid_at).isBefore();
          return (
            <Flex alignItems="center" gap="12px" justifyContent="flex-end">
              {showClaim && (
                <Button
                  isLoading={
                    !!loadingID && compareString(loadingID, data.unstake_id)
                  }
                  isDisabled={isClaimed || !isClaimable}
                  height="32px"
                  onClick={() => {
                    onClaim(data);
                  }}
                >
                  {isClaimed
                    ? 'Claimed'
                    : isClaimable
                      ? 'Claim'
                      : formatDate(data.valid_at)}
                </Button>
              )}
              <Text className={styles.title}>
                {formatDate(
                  data.type === HistoryType.restake
                    ? (data.restake_at as string)
                    : (data.created_at as string),
                )}
              </Text>
            </Flex>
          );
        },
      },
    ];
  }, [loadingID, onClaim]);

  return (
    <BaseModal theme="dark" isShow={isOpen} onHide={onClose} title="History" size="small">
       <ListTable
         data={history}
         columns={columns}
         className={styles.tableContainer}
       />
    </BaseModal>
  );
};

export default StakeHistoryModal;
