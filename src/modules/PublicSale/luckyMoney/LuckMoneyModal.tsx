import { claimPublicSaleLuckyMoney, IPublicSaleLuckyMoney } from '@/services/public-sale';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { requestReload, setCurrentLuckyMoney } from '@/stores/states/common/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Flex, Text } from '@chakra-ui/react';
import Loading from '@/components/Loading';
import s from './styles.module.scss';
import { closeModal } from '@/stores/states/modal/reducer';

type Props = {
  envelopSrc: string;
};

export default function LuckyMoneyModal({ envelopSrc }: Props) {
  const dispatch = useAppDispatch();
  const needReload = useAppSelector(commonSelector).needReload;
  const luckyMoneyList = useAppSelector(commonSelector).luckyMoneyList;
  const currentLuckyMoney = useAppSelector(commonSelector).currentLuckyMoney;

  const [submitting, setSubmitting] = useState(false);
  const [reward, setReward] = useState(null);
  const [subbmited, setSubmitted] = useState(false);

  useEffect(() => {
    handleClaim();
  }, []);

  const getLatestCurrentLuckyMoney = () => {
    if (luckyMoneyList) {
      for (let i = 0, k; i < luckyMoneyList.length; i++) {
        const lm = luckyMoneyList[i];

        if (dayjs().utc().isBefore(dayjs(lm.created_at))) {
          dispatch(setCurrentLuckyMoney(lm));
          break;
        }
      }
    }
  };

  const handleClaim = async () => {
    try {
      setSubmitting(true);
      const res = await claimPublicSaleLuckyMoney(
        currentLuckyMoney?.id as number,
      );

      setSubmitted(true);
      setReward(res);

      // if (res) {
      //   toast.success(
      //     `Claim successfully! You received ${currentLuckyMoney?.bvm_amount} BVM`,
      //   );
      // } else {
      //   toast.success('Better luck next time!');
      // }

      const index = luckyMoneyList.indexOf(
        currentLuckyMoney as IPublicSaleLuckyMoney,
      );

      if (index > 7) {
        dispatch(requestReload());
      } else {
        getLatestCurrentLuckyMoney();
      }
    } catch (e: any) {
      if (e?.code === -2010) {
        toast.error('Already claimed.');
      } else if (e?.code === 1003) {
        toast.error('Something went wrong. Please try again.');
      }
      getLatestCurrentLuckyMoney();
      dispatch(
        closeModal({
          id: 'lucky-money-dialog',
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex className={s.container} direction={"column"}>
      {
        submitting ? (
          <Flex alignItems={'center'} justifyContent={'center'}>
            <Loading className={s.loading} />
          </Flex>
        ) : (
          <>
            {
              subbmited && (
                <>
                  {
                    reward ? (
                      <>
                        <img src={envelopSrc} />
                        <Text className={s.reward}>Claim successfully! You received {currentLuckyMoney?.bvm_amount} BVM</Text>
                      </>
                    ) : (
                      <>
                        <img src={envelopSrc} />
                        <Text className={s.reward}>Better luck next time</Text>
                      </>
                    )
                  }
                </>
              )
            }
          </>
        )
      }
    </Flex>
  );
}
