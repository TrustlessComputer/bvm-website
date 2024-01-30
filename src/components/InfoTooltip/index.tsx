/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode, useEffect, useRef } from 'react';
import IcHelp from './IcHelp';

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
  bodyClassName?: any;
  className?: any;
}

const InfoTooltip = (props: InfoTooltipProps) => {
  const {
    label,
    children,
    showIcon = false,
    setIsOpen,
    isStyleConfig = true,
    bodyClassName,
    className
  } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();

  useEffect(() => {
    setIsOpen && setIsOpen(isOpen);
  }, [isOpen]);

  const initRef = useRef<any>();

  const renderChild = () => {
    if (children && showIcon) {
      return (
        <Flex gap={1} alignItems={'center'}>
          {children}
          <IcHelp />
        </Flex>
      );
    }
    if (children) {
      return children;
    }
    return <IcHelp />;
  };

  return (
    <Popover
      closeOnBlur={true}
      placement="auto"
      initialFocusRef={initRef}
      isOpen={isOpen}
      onClose={onClose}
      styleConfig={
        { zIndex: 999999999 }
      }
    >
      <PopoverTrigger>
        <Box
          cursor={"pointer"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
          className={className}
        >
          {renderChild()}
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow bg="white" />
        <PopoverBody
          style={{
            padding: 5,
            zIndex: 999999999
          }}
          className={bodyClassName}
        >
          <Text fontSize={'12px'}>{label}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default InfoTooltip;
