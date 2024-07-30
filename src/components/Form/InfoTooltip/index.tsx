/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  Image,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ReactNode, useEffect, useRef } from 'react';
import { isDesktop } from 'react-device-detect';

interface InfoTooltipProps {
  label: ReactNode;
  children?: ReactNode;
  placement?: PlacementWithLogical;
  iconSize?: string;
  fontSize?: string;
  iconColor?: string;
  showIcon?: boolean;
  iconName?: any;
  setIsOpen?: (b: boolean) => void;
  isStyleConfig?: boolean;
}

const InfoTooltip = (props: InfoTooltipProps) => {
  const {
    label,
    children,
    showIcon = false,
    setIsOpen,
    isStyleConfig = true,
    placement,
    iconName = '/icons/ic-tooltip-dark.svg',
  } = props;
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    setIsOpen && setIsOpen(isOpen);
  }, [isOpen]);

  const initRef = useRef<any>();

  const renderChild = () => {
    if (children && showIcon) {
      return (
        <Flex gap={1} alignItems={'center'}>
          {children}
          <Image w="16px" src={iconName} />
        </Flex>
      );
    }
    if (children) {
      return children;
    }
    return <Image w="16px" src={iconName} />;
  };

  return (
    <Popover
      closeOnBlur={true}
      placement={placement || 'auto'}
      initialFocusRef={initRef}
      isOpen={isOpen}
      onClose={onClose}
      styleConfig={
        isStyleConfig
          ? {
              zIndex: 999999999,
            }
          : undefined
      }
    >
      <PopoverTrigger>
        <Box
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
          onMouseEnter={isDesktop ? onOpen : undefined}
          onMouseOut={isDesktop ? onClose : undefined}
          cursor={'pointer'}
        >
          {renderChild()}
        </Box>
      </PopoverTrigger>
      <Box zIndex="popover">
        <PopoverContent maxW="300px">
          <PopoverArrow bg="#ececec" />
          <PopoverBody
            style={{
              padding: '8px 12px',
              background: '#ececec',
            }}
          >
            {typeof label === 'string' ? (
              <Text
                fontSize={'16px'}
                fontWeight={'400'}
                color="#000"
                dangerouslySetInnerHTML={{ __html: label as any }}
              />
            ) : (
              label
            )}
          </PopoverBody>
        </PopoverContent>
      </Box>
    </Popover>
  );
};

export default InfoTooltip;
