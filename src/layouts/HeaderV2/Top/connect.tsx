import {
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { WALLET_URL } from '@/Providers/NakaConnectProvider';
import SvgInset from '@components/SvgInset';
import { shortCryptoAddress } from '@utils/address';
import useNakaAuthen from '@hooks/useRequestNakaAccount';

const Connect = () => {
  const {
    requestAccount,
    isAuthen,
    buttonText,
    nakaAddress,
    loading,
    onLogout,
  } = useNakaAuthen();

  const renderConnected = () => {
    return (
      <Popover trigger="hover">
        <PopoverTrigger>
          <Button
            bg="rgba(0, 0, 0, 1)"
            _hover={{ bg: 'rgba(0, 0, 0, 1)' }}
            isDisabled={loading}
            isLoading={loading}
            height="32px"
            borderRadius="100px"
            gap="6px"
            fontSize="14px"
            fontWeight="500"
            onClick={() => {
              if (isAuthen) {
                window.open(WALLET_URL, '_blank');
              }
            }}
          >
            <SvgInset svgUrl="/icons/credit-card.svg" size={20} />
            {shortCryptoAddress(nakaAddress, 10)}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          display="inline-flex"
          padding="20px 24px"
          bg="white"
          width="fit-content"
          border="1px solid #ECECEC"
          box-shadow="0px 0px 24px -6px rgba(0, 0, 0, 0.12)"
        >
          <Flex
            alignItems="center"
            gap="24px"
            cursor="pointer"
            onClick={() => {
              onLogout();
            }}
          >
            <Text textTransform="uppercase" fontSize="14px" fontWeight="400">
              disconnect
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.2617 3.73926C14.6094 2.08691 11.9355 2.08691 10.2852 3.73926L8.39258 5.63184L9.38867 6.62793L11.2812 4.73535C12.332 3.68457 14.1055 3.57324 15.2656 4.73535C16.4277 5.89746 16.3164 7.66895 15.2656 8.71973L13.373 10.6123L14.3711 11.6104L16.2637 9.71777C17.9121 8.06543 17.9121 5.3916 16.2617 3.73926ZM8.7207 15.2666C7.66992 16.3174 5.89648 16.4287 4.73633 15.2666C3.57422 14.1045 3.68555 12.333 4.73633 11.2822L6.62891 9.38965L5.63086 8.3916L3.73828 10.2842C2.08594 11.9365 2.08594 14.6104 3.73828 16.2607C5.39062 17.9111 8.06445 17.9131 9.71484 16.2607L11.6074 14.3682L10.6113 13.3721L8.7207 15.2666ZM5.08398 4.09082C5.05462 4.06174 5.01496 4.04543 4.97363 4.04543C4.93231 4.04543 4.89265 4.06174 4.86328 4.09082L4.08984 4.86426C4.06077 4.89362 4.04445 4.93328 4.04445 4.97461C4.04445 5.01594 4.06077 5.05559 4.08984 5.08496L14.918 15.9131C14.9785 15.9736 15.0781 15.9736 15.1387 15.9131L15.9121 15.1396C15.9727 15.0791 15.9727 14.9795 15.9121 14.9189L5.08398 4.09082Z"
                fill="black"
              />
            </svg>
          </Flex>
        </PopoverContent>
      </Popover>
    );
  };

  const renderConnect = () => {
    return (
      <Button
        bg="rgba(0, 0, 0, 1)"
        _hover={{ bg: 'rgba(0, 0, 0, 1)' }}
        isDisabled={loading}
        isLoading={loading}
        height="32px"
        borderRadius="100px"
        gap="6px"
        fontSize="14px"
        fontWeight="500"
        onClick={() => {
          requestAccount();
        }}
      >
        <SvgInset svgUrl="/icons/credit-card.svg" size={20} />
        Connect Wallet
      </Button>
    );
  };

  return isAuthen ? renderConnected() : renderConnect();
};

export default Connect;
