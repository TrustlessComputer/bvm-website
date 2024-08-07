import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import React, { ReactElement } from 'react';
import Capture from '@/modules/blockchains/Buy/Capture';
import Button from '@/modules/blockchains/dapp/components/Button';
import Image from 'next/image';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';

export default function ActionsWorkArea():ReactElement {
  const { isCapture } = useCaptureStore();
  return <>
    {!isCapture && (
      <div className={s.resetButton}>
        <Capture />
        <Button
          element="button"
          type="button"
          onClick={() => setIsShowModal(true)}
        >
          RESET{' '}
          <Image
            src="/icons/undo.svg"
            alt="undo"
            width={20}
            height={20}
          />
        </Button>
      </div>
    )}
  </>
}
