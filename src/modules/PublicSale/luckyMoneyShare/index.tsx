import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { getLuckyMoneyShare, getPublicSaleSummary } from '@/services/public-sale';
import { userSelector } from '@/stores/states/user/selector';
import { formatCurrency } from '@/utils/format';
import { useEffect, useState } from 'react';
import { openModal } from '@/stores/states/modal/reducer';
import { useDispatch } from 'react-redux';
import LuckyMoneyShareModal from '@/modules/PublicSale/luckyMoney/LuckMoneyShareModal';

const LuckyMoneyShare = () => {
  const { userContributeInfo } = useAppSelector(commonSelector);
  const user = useAppSelector(userSelector);
  const [luckyMoneyShare, setLuckyMoneyShare] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getLuckyMoneyShareInfo();
  }, []);

  const getLuckyMoneyShareInfo = async () => {
    try {
      const res = await getLuckyMoneyShare();
      setLuckyMoneyShare(res);
    } catch (e) {

    } finally {

    }
  }

  const handleClaimLuckyMoneyShare = async () => {
    try {
      dispatch(
        openModal({
          id: 'lucky-money-share-dialog',
          disableBgClose: true,
          contentPadding: 0,
          hideCloseButton: true,
          className: s.Modal,
          render: () => <LuckyMoneyShareModal />,
        }),
      );
    } catch (e) {

    } finally {

    }
  }

  const handleShareTw = async () => {
    const shareUrl = !user?.referral_code
      ? 'bvm.network/public-sale'
      : `bvm.network/public-sale?refer=${user?.referral_code}`;

    const saleSummary = await getPublicSaleSummary();

    const content = `I just aped in the $BVM public sale - the first modular blockchain metaprotocol that will power thousands of Bitcoin L2s!\n\nJoin me and the ${
      saleSummary.total_user || '0'
    } early contributors who've committed ${
      formatCurrency(saleSummary.total_usdt_value_not_boost || '0', 0, 0, 'BTC', false)
    } to building Bitcoin's future with @BVMnetwork\n\n`;

    setTimeout(() => {
      return window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
          content,
        )}`,
        '_blank',
      );
    }, 300);

    handleClaimLuckyMoneyShare();
  };

  return Number(userContributeInfo?.usdt_value || '0') > 0 && !luckyMoneyShare && (
    <Flex className={s.container} direction={"column"} gap={"24px"}>
      <Flex gap={8}>
        <Flex direction={"column"} gap={"12px"}>
          <Text className={s.title}>You’ve got a Red Packet</Text>
          <Text className={s.desc}>Thank you for backing our mission of building the future of Bitcoin. Here is a small gift from the core team. Wish you the best of luck in the crypto bull run year.</Text>
        </Flex>
        <img src={'/public-sale/red_packet_bvm.png'} alt={'red_packet_bvm'} className={s.img}/>
      </Flex>
      <button className={s.btnShare} onClick={handleShareTw}>
        Tweet to open it
      </button>
    </Flex>
  )
};

export default LuckyMoneyShare;
