import React, { useState } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import ImagePlaceholder from '@components/ImagePlaceholder';
import ModalButton from '@/modules/bvm_v4/HeroV4/ModalButton';

const DATA = [
  {
    title: 'Buy',
    buttons: [
      {
        btnTitle: 'Uniswap',
        link: 'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d&chain=ethereum',
        blank: true,
        icon: '/bvm/uniswap.svg',
      },
      {
        btnTitle: 'Gate.io',
        link: 'https://www.gate.io/trade/BVM_USDT',
        blank: true,
        icon: '/bvm/gateio.svg',
      },
      {
        btnTitle: 'MEXC',
        link: 'https://www.mexc.com/exchange/BVM_USDT',
        icon: '/bvm/mexc.svg',
        blank: true,
      },
      // {
      //   btnTitle: 'Bitmart',
      //   link: 'https://www.bitmart.com/trade/en-US?symbol=BVM_USDT',
      //   icon: '/bvm/bitmart.svg',
      //   blank: true,
      //
      // },
      // {
      //   btnTitle: 'Naka',
      //   link: 'https://nakachain.xyz/swap',
      //   icon: '/bvm/naka.svg',
      // },
      // {
      //   btnTitle: 'Uniswap (Arbitrum)',
      //   link: 'https://app.uniswap.org/swap?outputCurrency=0x694A7eF60ACe282E2a55a9bc6AdD56730e5Ee8B6&chain=arbitrum',
      //   icon: '/bvm/uniswap.svg',
      // },
      // {
      //   btnTitle: 'OKXWEB3',
      //   link: 'https://www.okx.com/web3/dex-swap#inputChain=1&inputCurrency=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outputChain=1&outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d',
      //   icon: '/bvm/okx2.svg',
      // },
      // {
      //   btnTitle: 'Unisat',
      //   link: 'https://unisat.io/market/brc20?tick=BVMN',
      //   icon: '/bvm/unisat.svg',
      // },
    ],
  },
  {
    title: 'Stake',
    description: <p className={s.btnWrapper_description}>Earn up to <span>58% APR</span> on your BVM and receive airdrops from upcoming Bitcoin L2 projects.
    </p>,
    red: true,
    buttons: [
      {
        btnTitle: 'Stake BVM',
        link: '/staking',
        blank: false,
        icon: undefined,
      },
    ],
  },
];


const Heading = (): React.JSX.Element => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className={s.wrapper}>
      <div className={s.heading}>
        <Image
          src={'/bvm/bvm-v2.png'}
          width={210}
          height={131}
          alt="heading"
          sizes={'100vw'}
          quality={100}
        />
      </div>
      <p className={s.headingText}>
        Welcome to the future of Bitcoin
      </p>
      <div className={s.btnSection}>
        {
          DATA.map(item => {
            return (
              <div className={`${s.btnWrapper} ${item.red && s.red}`}>
                <p className={s.btnWrapper_heading}>{item.title}</p>
                {
                  item.description && item.description
                }

                <div className={`${s.btnContainer}  ${item.red && s.fullWidth}`}>
                  {
                    item.buttons.map(itemBtn => {
                      return (
                        <a href={itemBtn?.link} target={itemBtn.blank ? '_blank' : ''}>
                          <div className={`${s.item} ${item.red && s.red}`}>
                            {
                              itemBtn?.icon && (
                                <div>
                                  <Image src={itemBtn?.icon} alt={itemBtn.btnTitle} width={52} height={52}
                                                    className={s.item_icon} />
                                </div>
                              )
                            }

                            <p className={`${s.item_title} ${item.red && s.red}`}>{itemBtn.btnTitle}</p>
                          </div>
                        </a>
                      );
                    })
                  }
                  {
                    item.red || (
                      <div className={s.iconDot} onClick={() => setIsShowModal(true)}>
                        <ImagePlaceholder src={'/icons/ic_dots.svg'} alt={'dots'} width={16} height={3} className={s.icon}
                        />
                      </div>
                    )
                  }
                </div>

              </div>
            );
          })
        }
      </div>
      <ModalButton
        show={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
    </div>
  );
};

export default Heading;
