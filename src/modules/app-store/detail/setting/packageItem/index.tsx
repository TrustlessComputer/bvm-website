import { Circle, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import cx from 'clsx';

const PackageItem = ({data, isSelected, onSelect}: {data: IModeInstall, isSelected: boolean, onSelect: any}) => {
  console.log('package', data);
  return (
    <Flex className={cx(s.container, isSelected ? s.isSelect: '')} onClick={onSelect}>
      <Text className={s.title}>{data?.title} - ${data?.price_usd} (${data?.price_bvm} BVM)</Text>
      <Circle className={s.select} size={"24px"}/>
    </Flex>
  );
};

export default PackageItem;
