import { formatCurrency } from '@/utils/format';
import styles from './styles.module.scss';
import BigNumberJS from 'bignumber.js';
import { useSelector } from 'react-redux';
import { userContributeSelector } from '@/modules/Launchpad/store/lpEAIPayment/selector';

const DepositWarning = () => {
  const userContribute = useSelector(userContributeSelector);

  return (
    <div className={styles.boxWarning}>
      <p>
        Important note: If your deposit with boost applied exceeds your hard cap
        tier (${formatCurrency(userContribute?.hard_cap, 0, 0)}), you will only
        receive the hard cap amount during the TGE. The excess amount will be
        locked for 6 months and vested over 1 year.
      </p>
      <p>
        Your hard cap may adjust within 10% (up to $
        {formatCurrency(
          new BigNumberJS(userContribute?.hard_cap || 0)
            .times(110)
            .div(100)
            .toFixed(),
          0,
          0,
        )}
        ) due to BTC or ETH price changes.
      </p>
      {/*<p>*/}
      {/*  Important note: If your deposit exceeds your hard cap tier ($*/}
      {/*  {formatCurrency(userContribute?.hard_cap, 0, 0)}), you will only receive*/}
      {/*  the hard cap amount during the TGE. The excess amount will be locked for*/}
      {/*  6 months and vested over 1 year.*/}
      {/*</p>*/}
    </div>
  );
};

export default DepositWarning;
