import { formatCurrencyV2 } from '@utils/format';
import LaunchButton from '@/modules/agent-studio/Buy/components3/LaunchButton';
import React, { ReactElement, useMemo } from 'react';
import useOrderFormStoreV3 from '@/modules/agent-studio/Buy/stores/index_v3';
import { useChainProvider } from '@/modules/agent-studio/detail_v4/provider/ChainProvider.hook';
import { EstTimeView } from '../EstTimeView';
import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import BigNumber from 'bignumber.js';

function customRound(number: number) {
  const lowerBound = Math.floor(number / 10) * 10;
  const upperBound = lowerBound + 10;

  return Math.abs(number - lowerBound) <= Math.abs(number - upperBound)
    ? lowerBound
    : upperBound;
}

// export default function TopWorkArea(): ReactElement {
//   const { priceBVM, priceUSD, needContactUs } = useOrderFormStoreV3();

//   const { order } = useChainProvider();

//   return (
//     <div className={s.right_box_footer}>
//       {
//         <div className={s.right_box_footer_left}>
//           <h4 className={s.right_box_footer_left_content}>
//             {formatCurrencyV2({
//               amount: priceBVM,
//               decimals: 0,
//             })}{' '}
//             BVM{'/'}month
//           </h4>
//           <h6 className={s.right_box_footer_left_title}>
//             $
//             {formatCurrencyV2({
//               amount: priceUSD,
//               decimals: 0,
//             })}
//             {'/'}month
//           </h6>
//         </div>
//       }

//       <LaunchButton isUpdate={!!order} />
//     </div>
//   );
// }

export default function TopWorkArea(): ReactElement {
  const { priceBVM, priceUSD, needContactUs } = useOrderFormStoreV3();

  const { order } = useChainProvider();

  const priceBVMFormated = useMemo(() => {
    const priceBVMPerDay = new BigNumber(priceBVM).dividedBy(30).toString();
    const priceBVMPerDayRounded = customRound(Number(priceBVMPerDay));

    const result = formatCurrencyV2({
      amount: priceBVMPerDay,
      decimals: 0,
    });
    return result;
  }, [priceBVM]);

  const priceUSDFormated = useMemo(() => {
    const priceUSDPerDay = new BigNumber(priceUSD).dividedBy(30).toString();
    const result = formatCurrencyV2({
      amount: priceUSDPerDay,
      decimals: 0,
    });
    return result;
  }, [priceUSD]);

  return (
    <Flex flexDir={'row'} align={'center'} gap={'24px'} className={s.container}>
      {/* <EstTimeView />

      <Flex flexDir={'column'}>
        <Text fontSize={['18px']} fontWeight={600} color={'#333'}>
          {priceBVMFormated} BVM{'/'}day
        </Text>
        <Text fontSize={['13px']} fontWeight={500} color={'#777'}>
          ${priceUSDFormated}
          {'/'}day
        </Text>
      </Flex> */}

      <LaunchButton isUpdate={!!order} />
    </Flex>
  );
}
