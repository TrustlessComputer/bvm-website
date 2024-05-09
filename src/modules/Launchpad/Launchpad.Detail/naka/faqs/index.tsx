import React, { useMemo } from 'react';
import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import { ILaunchpad } from '@/modules/Launchpad/services/launchpad.interfaces';
import FAQs from '@/components/faq';

const IdoFaqs = ({ launchpadDetail }: { launchpadDetail?: ILaunchpad }) => {
  const data = useMemo(() => {
    return launchpadDetail?.id === 1
      ? [
          {
            q: 'How do I join the allowlist and receive a boost?',
            a: `
            <p>To join the allowlist and qualify for a boost, simply complete the tasks listed above, starting from sharing about NAKA on X.</p>
          `,
          },
          {
            q: 'Are there any rewards for top performers?',
            a: `
            <p>Participants in the top 2% will receive a 30% boost, while those in the top 8% will receive a 20% boost. Others will receive a 10% boost.</p>
          `,
          },
          {
            q: 'When is the raffle happening?',
            a: `
            <p>The raffle will take place on March 14th at 8 AM UTC.</p>
          `,
          },
          {
            q: 'How does the raffle work?',
            a: `
            <p>Participants can purchase tickets using $BVM tokens from March 11th, 8 AM UTC to March 14th, 8 AM UTC. Each ticket costs 200 $BVM tokens. Winners will be chosen randomly at the end of the raffle. Please note that the $BVM amount used for tickets will be locked for 3 days.</p>
            <p>If you do not win, the $BVM tokens used for ticket purchases will be refunded.</p>
          `,
          },
          {
            q: 'How does the boost affect my chances of winning?',
            a: `
            <p>The boost increases your chances of winning by granting you additional tickets. The higher your boost percentage, the greater your chances of being selected as a winner.</p>
          `,
          },
          {
            q: 'Can I track my points and boost status?',
            a: `
            <p>Yes, you can easily monitor your points and boost status to track your progress and chances of winning.</p>
          `,
          },
        ]
      : [];
  }, [launchpadDetail?.id]);

  return data?.length > 0 ? (
    <Box className={s.container}>
      <FAQs data={data} />
    </Box>
  ) : (
    <></>
  );
};

export default IdoFaqs;
