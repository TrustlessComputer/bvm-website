import { Circle, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import cx from 'clsx';
import { IDAppDetails } from '@/services/api/DAServices/types';

const PackageItem = ({data, isSelected, onSelect, isInstalled}: {data: IDAppDetails, isSelected: boolean, onSelect: any, isInstalled: boolean}) => {
  return (
    <Flex className={cx(s.container, !isInstalled && isSelected ? s.isSelect: '')} onClick={!isInstalled && onSelect}>
      <Text className={s.title}>{data?.name} - ${data?.price_usd} (${data?.price_bvm} BVM)</Text>
      <Flex gap={"12px"} alignItems={"center"}>
        {isInstalled && isSelected && <Text className={s.title}>Installed</Text>}
        {((isInstalled && isSelected) || !isInstalled) && <Circle className={s.select} size={"24px"}/>}
      </Flex>
    </Flex>
  );
};

export default PackageItem;