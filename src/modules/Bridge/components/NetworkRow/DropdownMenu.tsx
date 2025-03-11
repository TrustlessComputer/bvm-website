import React, { ReactElement } from 'react';
import cs from 'classnames';
import s from './styles.module.scss';
import { BridgeNetwork } from '@/modules/Bridge/types';
import { motion } from 'framer-motion';
import { Text } from '@chakra-ui/react';
import Image from 'next/image';

type DropdownMenuType = {
  networks: BridgeNetwork[];
  onSelect: (network: BridgeNetwork) => void;
};

const DropDownMenu = ({
  networks,
  onSelect,
}: DropdownMenuType): ReactElement => {
  return (
    <motion.ul
      className={cs(s.dropMenu_list)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {networks.map((network: BridgeNetwork) => (
        <li
          key={`${network.name}`}
          className={s.listItem}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect(network);
          }}
        >
          <Image
            src={network.logoURI}
            width={28}
            height={28}
            style={{ borderRadius: '50%' }}
            alt="logo-image"
          />
          <Text
            fontSize={'16px'}
            fontWeight={'400'}
            color={'black'}
            _hover={{
              bgColor: 'transparent',
            }}
          >
            {network.displayName}
          </Text>
        </li>
      ))}
    </motion.ul>
  );
};

export default DropDownMenu;
