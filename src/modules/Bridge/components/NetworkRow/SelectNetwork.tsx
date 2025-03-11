import { Flex, Text, Image } from '@chakra-ui/react';
import { BridgeNetwork } from '@/modules/Bridge/types';
import React, { useRef, useState } from 'react';
import useChooseNetwork from '@/modules/Bridge/hooks/useChooseNetwork';
import DropDownMenu from '@/modules/Bridge/components/NetworkRow/DropdownMenu';
import cs from 'classnames';
import s from './styles.module.scss';
import { motion } from 'framer-motion';
import useBridgeStore from '@/modules/Bridge/hooks/useBridgeStore';
import { useFormikContext } from 'formik';
import { useOnClickOutside } from '@hooks/useOnClickOutside';

interface SelectNetworkProps {
  network: BridgeNetwork;
  type: 'from' | 'to';
}

const SelectNetwork = (props: SelectNetworkProps) => {
  const { network, type } = props;

  const [isShowMenu, setIsShowMenu] = useState(false);
  const { setFieldValue } = useFormikContext();
  const targetRef = useRef<HTMLDivElement>(null);

  const { networks, oppositionToken } = useChooseNetwork({ type });

  const title = React.useMemo(() => {
    return type === 'from' ? 'From Network' : 'To Network';
  }, [type]);

  const isSelectable = React.useMemo(
    () => !!networks?.length,
    [networks?.length],
  );

  const onSelectNetwork = (_network: BridgeNetwork) => {
    setIsShowMenu(false);
    setFieldValue(type === 'from' ? 'fromNetwork' : 'toNetwork', _network);

    // setIsShowMenu(false);
    // const token = tokens.find((token) => token.network.name === _network.name);
    // const isBridgeable = oppositionToken?.bridgeAddress?.[_network.name];
    // if (!!token && isBridgeable) {
    //   formik.setFieldValue(type === 'from' ? 'fromToken' : 'toToken', token);
    //   formik.setFieldValue(type === 'from' ? 'fromNetwork' : 'toNetwork', _network);
    // }
  };

  useOnClickOutside(targetRef, () => {
    setIsShowMenu(false);
  });

  return (
    <Flex
      direction={'column'}
      gap={'8px'}
      minW={{ base: '160px', md: '200px' }}
      ref={targetRef}
    >
      <Text fontSize={'14px'} fontWeight={'400'} color={'#657786'}>
        {title}
      </Text>
      <Flex
        background="#F8F9FA"
        border="1px solid #E5E7EB"
        p={'12px'}
        alignItems={'center'}
        borderRadius={'8px'}
        cursor={isSelectable ? 'pointer' : 'auto'}
        onClick={() => {
          isSelectable && setIsShowMenu(!isShowMenu);
        }}
        position="relative"
        className={cs(s.menusAction)}
      >
        <Flex gap="8px" alignItems="center" width="100%">
          <Image
            src={network.logoURI}
            w={'28px'}
            h={'28px'}
            borderRadius={'50%'}
          />
          <Text fontSize={'16px'} fontWeight={'400'} color="black">
            {network?.displayName}
          </Text>

          {isSelectable && (
            <motion.img
              style={{
                cursor: 'pointer',
                width: '10px',
                height: '5px',
                marginLeft: 'auto',
              }}
              src="/icons/bridge/ic-down.svg"
              animate={{ rotate: isShowMenu ? 360 : 0 }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
            />
          )}
        </Flex>
        {isSelectable && isShowMenu && (
          <DropDownMenu networks={networks} onSelect={onSelectNetwork} />
        )}
      </Flex>
    </Flex>
  );
};

export default SelectNetwork;
