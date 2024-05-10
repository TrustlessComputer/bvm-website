import Faq from '@/components/faq';
import { ILaunchpad } from '@/modules/Launchpad/services/launchpad.interfaces';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import s from './styles.module.scss';

const IdoFaqs = ({ launchpadDetail }: { launchpadDetail?: ILaunchpad }) => {
  // const data = useMemo(() => {
  //   if (launchpadDetail?.faq) {
  //     const res = JSON.parse(launchpadDetail?.faq);
  //
  //     return res?.map((r: any) => ({
  //       q: r?.value,
  //       a: r?.label,
  //     }));
  //   }
  //
  //   return [];
  // }, [launchpadDetail?.faq]);

  const data = useMemo(() => {
    return [
      {
        q: 'What is the format of the public sale?',
        a: `
            <p>The $GSWP public sale takes the form of crowdfunding and is accessible to everyone. However, only those on the allowlist are eligible for a boost.</p>
          `,
      },
      {
        q: 'What payment methods are accepted?',
        a: `
            <p>BTC, ETH, USDT, USDC and SOL are accepted as payment options. Additionally, funding can be done directly from your Naka wallet.</p>
          `,
      },
      {
        q: 'How is the boost determined?',
        a: `
            <p>The boost is allocated based on your position in the allowlist. The top 2% receive a 30% boost, the next 8% receive a 20% boost, and the remaining participants receive a 10% boost.</p>
          `,
      },
      {
        q: 'How does the boost affect the price at the Token Generation Event (TGE)?',
        a: `
            <p>The price at the TGE is calculated with leverage and considers the boost. Participants with a 30% boost will have $GSWP at the lowest price, while those with no boost will buy at higher prices accordingly.</p>
          `,
      },
      {
        q: 'What percentage of the allocation is available in the public sale?',
        a: `
            <p>10% of the allocation is reserved for the public sale. Check the tokenomics of $GSWP <a href="https://twitter.com/swamps_src20/status/1774524087215292580" target="_blank">here</a>.</p>
          `,
      },
      {
        q: 'When will the Token Generation Event (TGE) take place?',
        a: `
            <p>The date of the TGE will be announced soon. Stay tuned for updates!</p>
          `,
      },
    ];
  }, [launchpadDetail?.id]);

  return data?.length > 0 ? (
    <Box className={s.container}>
      <Faq data={data} />
    </Box>
  ) : (
    <></>
  );
};

export default IdoFaqs;
