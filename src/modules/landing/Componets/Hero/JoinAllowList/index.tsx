import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import { getTopLeaderBoards } from '@/services/whitelist';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import { PUBLIC_SALE_END } from '@/modules/Whitelist';
import { CDN_URL_ICONS } from '@/config';
import { getPublicSaleSummary } from '@/services/public-sale';
import { checkIsEndPublicSale, checkIsPublicSale } from '@/modules/Whitelist/utils';
import cs from 'classnames';
import ModalVideo from 'react-modal-video';
import SvgInset from '@/components/SvgInset';
import { MenuBuild } from '@/layouts/Header/menuConfig';

const DELAY = 2;
const JoinAllowList = ({isFooter}: {isFooter?: boolean}) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [totalUser, setTotalUser] = useState<string>('');
  const [totalDeposit, setTotalDeposit] = useState('');
  const [listUser, setListUser] = useState<ILeaderBoardPoint[]>([]);

  const isPublicSale = React.useMemo(() => checkIsPublicSale(), [])

  const getCount = async () => {
    try {
      if (isPublicSale) {
        const response = await getPublicSaleSummary();
        setTotalUser(response.total_user.toString());
        setTotalDeposit(response.total_usdt_value_not_boost.toString())
      } else {
        const response = await getTopLeaderBoards({ page: 1, limit: 20 });
        const topWhiteList = response.data.filter((item, index) => index < 5);
        setTotalUser(response.count);
        setListUser(topWhiteList);
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getCount();
  }, [isPublicSale]);

  const isEnded = React.useMemo(() => checkIsEndPublicSale(), [])

  const delay = isFooter ? 0 : DELAY;
  const [isOpen, setOpen] = useState(false);

  return (
    <Fade delay={delay}>
      <div className={`${s.container} ${isFooter && s.isFooter}`}>
        <div className={`container ${s.content}`}>
          <Flex flexDirection={'column'} gap={'8px'}>
            {/*<Fade delay={delay + .2}>
              <div className={s.titleWrapper}>
                <div className={cs(s.title)}>{"WELCOME TO THE FUTURE OF BITCOIN"}</div>
              </div>
            </Fade>*/}
            <div className={cs(s.desc)}>
              {isPublicSale ? (
                (!!totalUser && Number(totalUser || 0)) ? (
                  <Chars delay={delay + .4}>
                    Experience Bitcoin like never before.
                  </Chars>
                ) : (
                  <Chars delay={delay + .4}>
                    Back us building the future of Bitcoin
                  </Chars>
                )
              ) : (
                <Chars delay={delay + .4}>
                  Be the first to know.
                  <br />
                  Allowlisters get up to <span>&nbsp;30% extra tokens</span>.
                </Chars>
              )}
            </div>
            <Flex direction={["column", "row"]} alignItems={"center"} gap={"24px"} marginTop={"16px"}>
              <Button
                className={s.button}
                onClick={() => {
                  router.push('/use-bitcoin');
                }}
              >
                Use Bitcoin
              </Button>
              <div className={s.dropMenu}>
                <Button
                  className={s.buttonBuild}
                >
                  Build on Bitcoin
                </Button>
                <ul className={s.dropMenu_list}>
                  {
                    MenuBuild?.subMenu.map((item) => {
                      return (<li className={s.listItem}>
                        <a href={item.href} target={item?.isNewWindow ? '_blank' : '_self'} style={{ color: 'black' }}>
                          {
                            item.label
                          }
                          <SvgInset svgUrl={`landing/images/basil_arrow-up-outline.svg`} />
                        </a>
                      </li>);
                    })
                  }
                </ul>
              </div>
            </Flex>
          </Flex>

          <Flex gap={5} flexDirection={'column'}>
            <Fade delay={delay + .6}>
              <div>
                <a href={'#'} onClick={() => setOpen(true)} style={{textAlign: 'center', display: 'block'}}>
                  <img src={`/public-sale/btn-play-4.png`} width={224} alt={'right'} style={{margin: 'auto', marginBottom: '8px'}}/>
                  <span style={{fontSize: '14px', fontWeight: 400}}>What is BVM?</span>
                </a>
              </div>
              {/*<Button
                type='submit'
                // isDisabled={isCreating || !formValues.username}
                isLoading={isCreating}
                loadingText={'Submitting...'}
                className={s.button}
                onClick={() => {
                  router.push('/blockchains/customize');
                }}
              >
                Launch your Bitcoin L2

              </Button>*/}
              {/*<div className={s.whiteList} onClick={() => {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSejQvjHQE91B4DL4p9pzt4IPhWi05nxdwSI9wktra1i15ieqQ/viewform', "_blank");
              }}
                   style={{cursor: 'pointer'}}
              >
                <div className={s.whiteList_users} style={{color: '#fa4e0e'}}>
                  Apply for a Developer Grant
                </div>
                <div className={s.whiteList_total}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <path d="M14.4613 8.50018C14.4359 8.56151 14.3994 8.61678 14.3534 8.66278L9.68669 13.3294C9.58935 13.4268 9.46133 13.4761 9.33333 13.4761C9.20533 13.4761 9.07731 13.4274 8.97998 13.3294C8.78465 13.1341 8.78465 12.8174 8.97998 12.6221L12.7933 8.80877H2C1.724 8.80877 1.5 8.58477 1.5 8.30877C1.5 8.03277 1.724 7.80877 2 7.80877H12.7926L8.97933 3.99546C8.784 3.80013 8.784 3.48343 8.97933 3.2881C9.17466 3.09277 9.49135 3.09277 9.68669 3.2881L14.3534 7.95477C14.3994 8.00077 14.4359 8.05603 14.4613 8.11737C14.5119 8.24003 14.5119 8.37751 14.4613 8.50018Z" fill="#FA4E0E"/>
                  </svg>
                </div>
              </div>*/}
              {/*{!isPublicSale && (
                <div className={s.whiteList}>
                  <div className={s.whiteList_users}>
                    <Image src={'/landing/allow-avatars.png'} quality={100} width={88} height={24}
                           alt={'allow-avatars'} />
                  </div>
                  <div className={s.whiteList_total}>
                    <span>{formatCurrency(totalUser, 0,0)}&nbsp;people</span>&nbsp;{isPublicSale ? "made contributions" : "are on the allowlist"}
                  </div>
                </div>
              )}*/}
              {/*<Flex flexDir="column" marginTop="0px">*/}
              {/*  /!*<Flex alignItems="center" gap="4px" justifyContent="center">*!/*/}
              {/*  /!*  <span style={{ color: "#FA4E0E", fontWeight: "700", textAlign: 'center' }}>${formatCurrency(*!/*/}
              {/*  /!*    totalDeposit || '0',*!/*/}
              {/*  /!*    0,*!/*/}
              {/*  /!*    0,*!/*/}
              {/*  /!*    'BTC',*!/*/}
              {/*  /!*    true,*!/*/}
              {/*  /!*  )}*!/*/}
              {/*  /!*  </span>*!/*/}
              {/*  /!*  <span style={{ color: "white", fontWeight: "700", textAlign: 'center', paddingBottom: "2px" }}>raised</span>*!/*/}
              {/*  /!*</Flex>*!/*/}
              {/*  {!isEnded && (*/}
              {/*    <Flex gap="8px" alignItems="center" className={s.countDown_wrapper}>*/}
              {/*      <img style={{ width: 18 }} src={`${CDN_URL_ICONS}/hourglass.png`}/>*/}
              {/*      <p className={s.countDown_title}>Ends in</p>*/}
              {/*      <Countdown*/}
              {/*        className={s.countDown_time}*/}
              {/*        expiredTime={dayjs.utc(PUBLIC_SALE_END, 'YYYY-MM-DD HH:mm:ss').toString()}*/}
              {/*        hideIcon={true}*/}
              {/*      />*/}
              {/*    </Flex>*/}
              {/*  )}*/}
              {/*</Flex>*/}
            </Fade>
          </Flex>
        </div>
        {/*</form>*/}
        <ModalVideo
          channel="custom"
          url={'/public-sale/public_sale_video_2.mp4'}
          isOpen={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
    </Fade>
  );
};

export default JoinAllowList;
