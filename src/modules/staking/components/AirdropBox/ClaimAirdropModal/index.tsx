import BaseModal from '@/components/BaseModal';
import { formatCurrency, formatDate } from '@/utils/format';
import { Button, Flex } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import s from './styles.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  claimingId?: number;
  airdrops?: any[];
  symbol?: string;
  onClickClaim?: (id: number) => void;
}

const ClaimAirdropModal = (props: IProps) => {
  const { isOpen, onClose, claimingId, airdrops, symbol, onClickClaim } = props;

  return (
    <BaseModal
      theme="dark"
      isShow={isOpen}
      onHide={onClose}
      title="Airdrop"
      size="small"
    >
      <Flex direction="column" gap="8px">
        {airdrops &&
          airdrops.map((airdrop) => {
            const isClaimed =
              airdrop && (airdrop.is_claimed || Number(airdrop.amount) <= 0);
            const claimable =
              airdrop.claimable || moment().isAfter(moment(airdrop.valid_at));
            return (
              <>
                {isClaimed ? (
                  <>
                    {Number(airdrop.amount) <= 0 ? (
                      <p className={s.airdropCard_ct}>
                        {`You missed the ${symbol} airdrop. Don't miss out on the next one!`}
                      </p>
                    ) : (
                      <div
                        className={`${s.airdropCard_release} ${s.airdropCard_ct}`}
                      >
                        <span className={s.token}>
                          {formatCurrency(airdrop.amount, 0, 3)} ${symbol}
                        </span>
                        <span className={s.date}>{'Received'}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <Button
                    w="100%"
                    minH="56px"
                    className={`${s.airdropCard_release} ${s.airdropCard_ct}`}
                    onClick={() =>
                      claimable &&
                      onClickClaim &&
                      onClickClaim(airdrop?.id || 0)
                    }
                    cursor={claimable ? 'pointer' : 'not-allowed'}
                    isLoading={claimingId ? claimingId === airdrop?.id : false}
                  >
                    <span className={s.token}>
                      {formatCurrency(airdrop.amount, 0, 3)} ${symbol}
                    </span>
                    <span className={s.date}>
                      {claimable
                        ? 'Claim'
                        : `in ${formatDate(airdrop.valid_at, 'D MMMM, HH:mm')}`}
                    </span>
                  </Button>
                )}
              </>
            );
          })}
      </Flex>
    </BaseModal>
  );
};

export default ClaimAirdropModal;
