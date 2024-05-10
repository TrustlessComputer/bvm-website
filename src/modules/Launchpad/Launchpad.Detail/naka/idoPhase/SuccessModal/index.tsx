import BaseModal from '@/components/BaseModal';
import { launchpadSelector } from '@/modules/Launchpad/store/reducer';
import { userSelector } from '@/stores/states/user/selector';
import { formatCurrency } from '@/utils/format';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { labelAmountOrNumberAdds } from '@/utils/string';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

interface IProps {
  isShow: boolean;
  onHide: () => void;
  amount: string;
}

const SuccessModal = ({ isShow, onHide, amount }: IProps) => {
  const user = useSelector(userSelector);
  const params = useParams();
  const { blockScout } = useSelector(launchpadSelector);

  const onShare = () => {
    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `Just discovered @naka_chain - the first Bitcoin L2 for DeFi! Impressive growth for a new Bitcoin L2:\n\n🔥$${formatCurrency(
      blockScout.tvl,
      0,
      0,
      'BTC',
      false,
    )}+ TVL
🔥${formatCurrency(
      blockScout.address,
      0,
      0,
      'BTC',
      false,
      1000,
    )}+ active wallets
🔥${formatCurrency(
      blockScout.total_transactions,
      0,
      0,
      'BTC',
      false,
    )}+ transactions\n\nYou can buy $NAKA now at very low valuation ($1M FDV) on $NAKA launchpad IDO now:\n👉${url}`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    }, 200);
  };

  return (
    <BaseModal isShow={isShow} onHide={onHide} title="" size="small">
      <Flex
        flexDirection="column"
        alignItems="center"
        marginTop="24px"
        gap="20px"
      >
        <Image src="/icons/stake-success.png" width="84px" height="84px" />
        <Flex flexDirection="column">
          <Text fontSize="24px" textAlign="center" fontWeight="500">
            Congratulations!
          </Text>
        </Flex>
        <Text fontSize="18px" textAlign="center">
          You've successfully purchased {amount} ticket
          {labelAmountOrNumberAdds(Number(amount))}!
        </Text>
        <Button width="80%" onClick={onShare}>
          Share now
        </Button>
        <div />
      </Flex>
    </BaseModal>
  );
};

export default SuccessModal;
