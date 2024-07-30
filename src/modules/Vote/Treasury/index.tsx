// import CProposal from '@/contract/proposal';
import { commonSelector } from '@/stores/states/common/selector';
import { abbreviateNumber, formatCurrencyV2 } from '@/utils/format';
import { Box } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';

const Treasury = ({
  minimunShardToSubmit,
}: {
  minimunShardToSubmit: number;
}) => {
  // const proposalContract = useRef(new CProposal()).current;

  const coinPrices = useSelector(commonSelector).coinPrices;
  const bvmPrice = useMemo(() => coinPrices?.['BVM'] || '0', [coinPrices]);

  // const [tresuryAmount, setTresuryAmount] = useState('0');
  const tresuryAmount = '50000000';

  // useEffect(() => {
  //   getBalance();
  // }, []);

  // const getBalance = async () => {
  //   try {
  //     const balance = await proposalContract.getTreasuryBalance();
  //     setTresuryAmount(balance);
  //   } catch (error) {
  //   }
  // };

  const tresuryAmountUsd = new BigNumber(tresuryAmount)
    .multipliedBy(new BigNumber(bvmPrice))
    .toFixed();

  return (
    <Box className={s.wrapper} position={'relative'}>
      <p className={s.title}>Governance</p>
      <p className={s.heading}>BVM DAO</p>
      <p className={s.desc}>
        SHARD holders govern BVM DAO. They can vote on proposals directly or
        delegate their voting power to a third party. To submit proposals, a
        minimum of <span>{minimunShardToSubmit} SHARD</span> is required.
      </p>

      <Box className={s.treasuryBox}>
        <Box className={s.treasury}>
          <p className={s.treasury_title}>Treasury</p>
          <p className={s.treasury_amount}>
            {abbreviateNumber(tresuryAmount)} BVM{' '}
            <span>
              {' '}
              ${formatCurrencyV2({ amount: tresuryAmountUsd, decimals: 0 })}
            </span>
          </p>
        </Box>
        <Box className={s.treasuryDesc}>
          <p>
            The treasury serves as a resource pool for SHARD holders to allocate
            funds towards the long-term growth and success of the BVM ecosystem.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Treasury;
