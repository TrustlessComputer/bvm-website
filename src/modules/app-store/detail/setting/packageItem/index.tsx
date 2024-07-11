import { Circle, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import cx from 'clsx';
import { IDAppDetails } from '@/services/api/DAServices/types';

const PackageItem = ({
  data,
  isSelected,
  onSelect,
  isInstalled,
  status,
}: {
  data: IDAppDetails;
  isSelected: boolean;
  onSelect: any;
  isInstalled: boolean;
  status: string;
}) => {
  return (
    <Flex
      className={cx(s.container, !isInstalled && isSelected ? s.isSelect : '')}
      onClick={!isInstalled && onSelect}
    >
      <Text className={s.title}>
        {data?.name} -{' '}
        {Number(data?.price_usd) > 0
          ? `$${data?.price_usd} (${data?.price_bvm} BVM)`
          : 'Free'}
      </Text>
      <Flex gap={'12px'} alignItems={'center'}>
        {isInstalled && isSelected && <Text className={s.title}>{status}</Text>}
        {((isInstalled && isSelected) || !isInstalled) && (
          <Circle className={s.select} size={'24px'} />
        )}
      </Flex>
    </Flex>
  );
};

export default PackageItem;
