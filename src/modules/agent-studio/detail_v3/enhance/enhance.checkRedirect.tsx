import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { OrderStatus } from '@/stores/states/l2services/types';
import { useRouter } from 'next/navigation';

const enhanceCheckRedirect = (WrappedComponent: any) => (props: any) => {
  const router = useRouter();
  const { orderDetail } = useAppSelector(getL2ServicesStateSelector);
  const { loggedIn } = useWeb3Auth();

  // Chain ready
  if (
    orderDetail?.status === OrderStatus.Started ||
    orderDetail?.status === OrderStatus.Updating
  ) {
    return <WrappedComponent {...props} />;
  }

  // Not login (TODO)
  if (!loggedIn) {
  }

  // if (!isOwner) {
  //   router.push('/chains');
  //   return;
  // }

  router.push('/chains');
};

export default enhanceCheckRedirect;
