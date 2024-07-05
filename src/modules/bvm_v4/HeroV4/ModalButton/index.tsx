import BaseModal from '@/components/BaseModal';
import React from 'react';
import s from './styles.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';

interface IProps {
  show: boolean;
  onClose: (() => void) | any;
}

const DATA = [
  {
    btnTitle: 'Uniswap (Ethereum)',
    link: 'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d&chain=ethereum',
    icon: '/bvm/uniswap.svg',
  },
  {
    btnTitle: 'Gate.io',
    link: 'https://www.gate.io/trade/BVM_USDT',
    icon: '/bvm/gateio.svg',
  },
  {
    btnTitle: 'MEXC',
    link: 'https://www.mexc.com/exchange/BVM_USDT',
    icon: '/bvm/mexc.svg',
  },
  {
    btnTitle: 'Bitmart',
    link: 'https://www.bitmart.com/trade/en-US?symbol=BVM_USDT',
    icon: '/bvm/bitmart.svg',
  },
  {
    btnTitle: 'Naka',
    link: 'https://nakachain.xyz/swap',
    icon: '/bvm/naka.svg',
  },
  {
    btnTitle: 'Uniswap (Arbitrum)',
    link: 'https://app.uniswap.org/swap?outputCurrency=0x694A7eF60ACe282E2a55a9bc6AdD56730e5Ee8B6&chain=arbitrum',
    icon: '/bvm/uniswap.svg',
  },
  {
    btnTitle: 'OKXWEB3',
    link: 'https://www.okx.com/web3/dex-swap#inputChain=1&inputCurrency=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outputChain=1&outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d',
    icon: '/bvm/okx2.svg',
  },
  {
    btnTitle: 'Unisat',
    link: 'https://unisat.io/market/brc20?tick=BVMN',
    icon: '/bvm/unisat.svg',
  },
]

const ModalButton = (props: IProps) => {
  const { show, onClose } = props;

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <div className={s.wrapper}>
        {
          DATA.map((item, index) => (
            <a href={item?.link} target={'_blank'}>
              <div className={`${s.item} `}>
                {
                  item?.icon && (
                    <div>
                      <ImagePlaceholder src={item?.icon} alt={item.btnTitle} width={52} height={52}
                                        className={s.item_icon} />
                    </div>
                  )
                }
                <p className={`${s.item_title}`}>{item.btnTitle}</p>
              </div>
            </a>
          ))
        }
      </div>
    </BaseModal>
  );
};

export default ModalButton;
