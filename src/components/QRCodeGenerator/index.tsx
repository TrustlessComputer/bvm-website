import React from 'react';
import QRCode from 'react-qr-code';
import s from './styles.module.scss';
import cs from 'classnames';

interface IProps {
  className?: string;
  bgColor?: string; // #FFFFFF
  fgColor?: string; // #000000
  level?: 'L' | 'M' | 'Q' | 'H';
  size?: number;
  title?: string;
  value: string;
}

const QRCodeGenerator: React.FC<IProps> = (
  props: IProps,
): React.ReactElement => {
  const { className, ...delegatedProps } = props;

  return (
    <div className={cs(s.qrCodeGenerator, className)}>
      <QRCode {...delegatedProps} />
    </div>
  );
};

export default QRCodeGenerator;
