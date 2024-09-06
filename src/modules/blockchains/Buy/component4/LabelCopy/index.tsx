import { formatAddressCenter } from '@/utils/string';
import Image from 'next/image';
import { ReactElement } from 'react';
import toast from 'react-hot-toast';
import s from './styles.module.scss';

export default function LabelCopy({ value }: { value: string }): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <div className={s.content}>{formatAddressCenter(value as string, 6)}</div>
      <div
        style={{
          cursor: 'pointer',
        }}
        onClick={() => {
          navigator.clipboard.writeText(value as string);
          toast.success('Copied to clipboard');
        }}
      >
        <Image src="/icons/ic-copy.svg" alt="copy" width={20} height={20} />
      </div>
    </div>
  );
}
