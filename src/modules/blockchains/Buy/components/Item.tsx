import { Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { ItemDetail } from '../Buy.types';

export type Props = {
  title: string;
  content?: string;
  isSelected?: boolean;
  value: number;
  disabled?: boolean;
  isMainnet?: boolean;
  item?: ItemDetail;
  onClickCallback?: (value: number) => void;
  onClickCB?: (item: ItemDetail) => void;
  priceNote?: string;
  key?: string;
  infor?: string;
  showLeftView?: boolean;
};

const Item = React.memo((props: Props) => {
  const {
    title,
    content,
    isSelected = true,
    value,
    disabled,
    isMainnet,
    item,
    priceNote,
    onClickCallback,
    onClickCB,
    key,
    infor,
    showLeftView = true,
  } = props;

  const selectedClassName = isSelected ? 'selected' : 'non-select';
  const disabledClassName = disabled ? 'disabled' : '';
  const sufixStr = disabled ? ' (coming soon)' : '';

  return (
    <Flex
      justify={'space-between'}
      borderWidth={'1.5px'}
      borderColor={'#d9d9d9'}
      borderRadius={'12px'}
      alignItems={'center'}
      py={'10px'}
      px={'16px'}
      minH={'70px'}
      fontSize={'20px'}
      color={'black'}
      aria-selected={isSelected}
      aria-disabled={disabled}
      _hover={{
        cursor: 'pointer',
        borderColor: '#2b35e4',
      }}
      _active={{
        borderColor: '#2b35e4',
      }}
      _selected={{
        borderColor: '#2b35e4',
      }}
      _disabled={{
        opacity: 0.5,
        pointerEvents: 'none',
      }}
      key={key}
      onClick={() => {
        if (disabled) return;
        onClickCallback && onClickCallback(value);
        onClickCB && onClickCB(item!);
      }}
    >
      {/* LeftView */}
      <Flex>
        <Text>{title + sufixStr}</Text>
      </Flex>

      {/* RightView */}
      {showLeftView && (
        <Flex>
          <Text>
            {content}
            {priceNote && (
              <Text fontSize={'16px'} color={'#ffae00'} textAlign={'center'}>
                {priceNote}
              </Text>
            )}
            {infor && (
              <Tooltip
                label={`${infor}`}
                minWidth="200px"
                padding="8px"
                placement="auto"
                backgroundColor="white"
                borderRadius="8px"
                borderColor={'#00000060'}
                borderWidth={'0.5px'}
              >
                {/* <Image
                  src={'/blockchains/customize/ic-infor.svg'}
                  alt="ic-infor.svg"
                  objectFit={'contain'}
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2b35e4"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </Tooltip>
            )}
          </Text>
        </Flex>
      )}
    </Flex>
  );
});

export default Item;
