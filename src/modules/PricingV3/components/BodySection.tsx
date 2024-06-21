import { Th, Tr, Td, Flex } from '@chakra-ui/react';
import CheckedIcon from './CheckedIcon';
import NoCheckIcon from './NoCheckIcon';
import s from '../styles.module.scss';

type Props = {
  dataList: any[][];
};

const BodySection = (props: Props) => {
  const { dataList } = props;

  return dataList.map((item, index1) => {
    return (
      <Tr key={`${item[0]}-${index1}`} height={'40px'}>
        {item.map((value, index2) => {
          if (index2 === 0)
            return (
              <Td
                key={`${value}-${index2}`}
                minWidth={'220px'}
                fontWeight={500}
                fontSize={'14px'}
                style={{
                  textWrap: 'wrap',
                }}
                className={s.fontJetBrains}
                borderRightWidth={'1px'}
                borderRightColor={'#e7e7e781'}
              >
                {value || '--'}
              </Td>
            );
          else
            return (
              <Td
                key={`${value}-${index2}`}
                style={{
                  textWrap: 'unset',
                }}
                w={index2 === item.length - 1 ? '18%' : '22%'}
                maxW={index2 === item.length - 1 ? '18%' : '22%'}
                textAlign={'center'}
                className={s.fontSFProDisplay}
                borderRightWidth={'1px'}
                borderRightColor={'#e7e7e781'}
              >
                {typeof value === 'string' ? (
                  value
                ) : typeof value === 'boolean' && value ? (
                  <Flex justify={'center'} align={'center'}>
                    <CheckedIcon />
                  </Flex>
                ) : (
                  <Flex justify={'center'} align={'center'}>
                    <NoCheckIcon />
                  </Flex>
                )}
              </Td>
            );
        })}
      </Tr>
    );
  });
};

export default BodySection;
