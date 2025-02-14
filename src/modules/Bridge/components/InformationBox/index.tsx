import { Flex, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { IFormValues, TokenType } from '@/modules/Bridge/types';
import { estimateBridge } from '@/modules/Bridge/utils';
import React from 'react';

const InformationBox = () => {
  const { values } = useFormikContext();
  const { toToken, fromToken, fromNetwork, toNetwork } = values as IFormValues;

  const { minAmount, processingTime } = React.useMemo(() => {
    return estimateBridge({ fromToken, toToken, fromNetwork, toNetwork });
  }, [fromToken, toToken, fromNetwork, toNetwork])

  return (
    <Flex direction={'column'} gap={'4px'} mt={'20px'} mb={'28px'}>
      {/*<Text fontSize={'14px'} fontWeight={'500'} color={'#000'}>*/}
      {/*  Fee ~{minAmount} EAI*/}
      {/*</Text>*/}
      {/*<Text fontSize={'12px'} fontWeight={'400'} color={'#657786'}>*/}
      {/*  Estimated processing time: ~{processingTime}*/}
      {/*</Text>*/}
      {/*<Text fontSize={'12px'} fontWeight={'400'} color={'#657786'}>*/}
      {/*  Note: The bridge takes about 6 hours to process for security reasons. Thanks for your patience!*/}
      {/*</Text>*/}
      {/*<Text fontSize={'12px'} fontWeight={'400'} color={'#657786'}>*/}
      {/*  Ensure your wallet has enough {fromToken?.network?.nativeCurrency?.symbol} for gas fees to complete the*/}
      {/*  transaction.*/}
      {/*</Text>*/}
    </Flex>
  )
};

export default InformationBox;
