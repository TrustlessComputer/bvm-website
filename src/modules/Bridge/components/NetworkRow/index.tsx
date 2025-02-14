import SelectNetwork from './SelectNetwork';
import { Grid } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { IFormValues } from '@/modules/Bridge/types';
import React from 'react';
import { motion } from 'framer-motion';

const NetworkRow = () => {
  const { values, setValues } = useFormikContext();
  const {
    fromNetwork,
    toNetwork,
    fromToken,
    toToken,
  } = values as IFormValues;

  const [isRotate, setIsRotate] = React.useState(false);

  const canRotate = React.useMemo(() => {
    return Object.keys(fromToken.bridgeAddress || {}).includes(toNetwork.name) &&
      Object.keys(toToken.bridgeAddress || {}).includes(fromNetwork.name);
  }, [fromNetwork, toNetwork, fromToken, toToken]);

  const onRotate = () => {
    if (!canRotate) return;
    setValues((values: IFormValues) => ({
      ...values,
      fromNetwork: toNetwork,
      toNetwork: fromNetwork,
      fromToken: toToken,
      toToken: fromToken,
    }))
    setIsRotate(!isRotate)
  }

  return (
    <Grid w={'100%'} gridTemplateColumns={'1fr 32px 1fr'} gap={'12px'}>
      <SelectNetwork
        type="from"
        network={fromNetwork}
      />
      <motion.img
        style={{
          cursor: `${canRotate ? 'pointer' : 'not-allowed'}`,
          width: '32px',
          height: '32px',
          marginTop: '42px',
          marginBottom: 'auto',
        }}
        src="/icons/bridge/ic-arrow.svg"
        animate={{ rotate: isRotate ? 360 : 0 }}
        transition={{
          duration: 0.7,
          ease: 'easeInOut',
        }}
        onClick={onRotate}
      />
      <SelectNetwork
        type="to"
        network={toNetwork}
      />
    </Grid>
)
}

export default NetworkRow;
