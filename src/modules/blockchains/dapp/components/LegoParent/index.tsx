import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

import SvgInset from '@/components/SvgInset';

import { adjustBrightness } from '../../utils';

import styles from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { DappType } from '@/modules/blockchains/dapp/types';
import { DappModel } from '@/types/customize-model';
import { Text } from '@chakra-ui/react';

type Props = {
  zIndex?: number;
  background?: string;
  disabled?: boolean;
  title?: React.ReactNode;
  icon?: string;
  smallMarginHeaderTop?: boolean;
  children?: React.ReactNode;
  label?: DappModel['label'];
  dapp?: DappModel;
  linkDownloadFile?: string;
};

const LegoParent = ({
  zIndex = 0,
  background = '#A041FF',
  disabled = false,
  title = '',
  icon,
  children,
  smallMarginHeaderTop = false,
  label,
  dapp,
  linkDownloadFile,
  ...rest
}: Props) => {
  const legoRef = React.useRef<HTMLDivElement | null>(null);
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const footerRef = React.useRef<HTMLDivElement | null>(null);

  const dappState = useAppSelector(dappSelector);

  const handleLabelClick = () => {
    switch (dapp?.key) {
      case DappType.token_generation: {
        if (!label?.actionID) return;
        // https://bloom.appstore.dev.bvm.network/apps/token/0x517db2dd81aaa829bb9856539b83751dd3779f13
        window.open(
          `${dappState?.chain?.dappURL || ''}/apps/token/${label.actionID}`,
        );
        return;
      }
    }
  };

  React.useEffect(() => {
    let parentDOM = legoRef.current?.parentElement;
    if (!parentDOM) return;

    // parentDOM.style.position = 'relative';
    parentDOM.style.zIndex = `${zIndex} `;
  }, [legoRef.current, zIndex]);

  React.useEffect(() => {
    if (!headerRef.current || !footerRef.current) return;

    const headerWidth = headerRef.current.offsetWidth;

    footerRef.current.style.width = `${headerWidth}px`;
  }, [title]);

  return (
    <div
      className={styles.lego}
      style={{
        // @ts-ignore
        '--background-color': background,
        '--border-color': adjustBrightness(background, -20),
      }}
      ref={legoRef}
    >
      <div className={styles.lego__header} ref={headerRef}>
        <div
          className={cn(
            styles.lego__header__piece,
            styles.lego__header__piece__top,
            {
              [styles.lego__header__piece__top__smallMargin]:
                smallMarginHeaderTop,
            },
          )}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" size={26} />
        </div>

        <div className={styles.lego__header__title}>
          {icon && <Image src={icon} width={20} height={20} alt="icon" />}
          {title}
          {linkDownloadFile && (
            <Text
              as={'a'}
              href={linkDownloadFile}
              fontSize={'14px'}
              textDecoration={'underline'}
            >
              (File template)
            </Text>
          )}
        </div>

        <div
          className={cn(
            styles.lego__header__piece,
            styles.lego__header__piece__bottom,
          )}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" size={26} />
        </div>

        {label && (
          <div
            className={cn(
              styles.lego__header__label,
              styles[`lego__header__label__${label.status}`],
            )}
            style={{
              // @ts-ignore
              // prettier-ignore
              '--label-background': label.background ? label.background : undefined,
              '--label-color': label.color ? label.color : undefined,
            }}
            onClick={() => handleLabelClick()}
          >
            {label.title}
          </div>
        )}
      </div>

      <div className={styles.lego__body}>
        <div className={styles.lego__body__stick} />
        <div className={styles.lego__body__content}>{children}</div>
      </div>

      <div className={styles.lego__footer} ref={footerRef}>
        <div
          className={cn(
            styles.lego__footer__piece,
            styles.lego__footer__piece__bottom,
            {
              [styles.lego__footer__piece__bottom__smallMargin]:
                smallMarginHeaderTop,
            },
          )}
        >
          <SvgInset svgUrl="/landingV3/svg/stud.svg" size={26} />
        </div>
      </div>
    </div>
  );
};

export default LegoParent;
