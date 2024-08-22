import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import { formatCurrencyV2 } from '@utils/format';
import LaunchButton from '@/modules/blockchains/Buy/components3/LaunchButton';
import React, { ReactElement } from 'react';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';

export default function TopWorkArea(): ReactElement {
  const { priceBVM, priceUSD, needContactUs } = useOrderFormStoreV3();

  const { order } = useChainProvider();

  return (
    <div className={s.right_box_footer}>
      {
        <div className={s.right_box_footer_left}>
          <h4 className={s.right_box_footer_left_content}>
            {formatCurrencyV2({
              amount: priceBVM,
              decimals: 0,
            })}{' '}
            BVM{'/'}month
          </h4>
          <h6 className={s.right_box_footer_left_title}>
            $
            {formatCurrencyV2({
              amount: priceUSD,
              decimals: 0,
            })}
            {'/'}month
          </h6>
        </div>
      }

      <LaunchButton isUpdate={!!order} />
    </div>
  );
}
