import { Button } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { toast } from 'react-hot-toast';

interface IButtonConnectedProps extends PropsWithChildren {
  className?: any;
  title?: any;
}

const ButtonConnected: React.FC<IButtonConnectedProps> = ({
  children,
  className,
  title,
}) => {
  const { loggedIn, login } = useWeb3Auth();
  const handleConnect = async () => {
    try {
      login();
    } catch (err: unknown) {
      toast.error(
        (err as Error).message ||
        'Something went wrong. Please try again later.',
      );
    }
  };

  if (!loggedIn) {
    return (
      <Button className={className} onClick={handleConnect} type="button">
        {title || 'Connect account'}
      </Button>
    );
  }

  return children;
};

export default ButtonConnected;
