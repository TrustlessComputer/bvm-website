import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { Button } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

interface IButtonConnectedProps extends PropsWithChildren {
  className?: any;
  title?: string;
}

const ButtonConnected: React.FC<IButtonConnectedProps> = ({
  children,
  className,
  title,
}) => {
  const { isAuthen, requestAccount } = useNakaAuthen();

  if (!isAuthen) {
    return (
      <Button className={className} onClick={requestAccount} type="button">
        {title || 'Connect Naka wallet'}
      </Button>
    );
  }

  return children;
};

export default ButtonConnected;
