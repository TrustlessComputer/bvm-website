import { Flex } from '@chakra-ui/react';
import PhaseItem from '@/modules/Launchpad/components/phases/item';

const Phases = ({ data }: any) => {
  return (
    <Flex
      gap={'12px'}
      direction={['row', 'row']}
      alignItems={'center'}
    >
      {data?.map((p: any) => (
        <PhaseItem data={p} key={p.key} />
      ))}
    </Flex>
  );
};

export default Phases;
