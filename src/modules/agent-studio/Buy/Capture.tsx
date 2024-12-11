import React from 'react';
import Image from 'next/image';
import { memo, useState } from 'react';

import { convertBase64ToFile } from '@/utils/file';

import useStudioHelper from './hooks/useStudioHelper';
import useImageHelper from './hooks/useImageHelper';

import s from '@/modules/agent-studio/Buy/styles.module.scss';
import useFlowStore from './stores/useFlowStore';
import { isActingSignal } from './signals/useFlowStatus';
import { useSignalEffect } from '@preact/signals-react';

const Capture = () => {
  const [captureStatus, setCaptureStatus] = useState({
    isCapturing: false,
    isCaptured: false,
    content: '',
  });
  const { capture, getTwitterContent } = useStudioHelper();
  const { shareToTwitter, uploadFile, downloadImage } = useImageHelper();

  const abortSignal = React.useRef(new AbortController());

  const [isActing, setIsActing] = useState(false);

  useSignalEffect(() => {
    setIsActing(isActingSignal.value);
  });

  const startCapture = async () => {
    abortSignal.current.abort();
    abortSignal.current = new AbortController();

    setCaptureStatus({
      isCapturing: true,
      isCaptured: false,
      content: '',
    });
  };

  const stopCapture = () => {
    setCaptureStatus({
      isCapturing: false,
      isCaptured: false,
      content: '',
    });
  };

  const endCapture = (content: string) => {
    setCaptureStatus({
      isCapturing: false,
      isCaptured: true,
      content,
    });
  };

  const cancelCapture = () => {
    abortSignal.current.abort();
    abortSignal.current = new AbortController();

    setCaptureStatus({
      isCapturing: false,
      isCaptured: false,
      content: '',
    });
  };

  const handleAfterCaptured = async () => {
    await shareToTwitter(captureStatus.content);

    stopCapture();
  };

  const handleOnShare = async () => {
    if (captureStatus.isCapturing) return;

    startCapture();

    const imageAsBase64 = await capture(abortSignal.current.signal);

    if (!imageAsBase64) {
      stopCapture();
      return;
    }

    const imageAsFile = convertBase64ToFile(imageAsBase64);
    const url = await uploadFile(imageAsFile);
    const content = getTwitterContent(url);

    setCaptureStatus({
      isCapturing: false,
      isCaptured: true,
      content,
    });

    endCapture(content);
  };

  const handleOnExport = async () => {
    if (captureStatus.isCapturing) return;

    startCapture();

    const imageAsBase64 = await capture(abortSignal.current.signal);

    if (!imageAsBase64) {
      stopCapture();
      return;
    }

    downloadImage(imageAsBase64);
    endCapture('');
  };

  React.useEffect(() => {
    if (captureStatus.isCaptured && !isActing) {
      handleAfterCaptured();
    } else if (captureStatus.isCapturing && isActing) {
      cancelCapture();
    }
  }, [captureStatus.isCaptured, captureStatus.isCapturing, isActing]);

  return (
    <div className={s.wrapper_btn_top}>
      <div
        className={`${s.reset2} ${captureStatus.isCapturing && s.isCapturing}`}
        onClick={handleOnShare}
      >
        <p>{captureStatus.isCapturing ? 'SHARING...' : 'SHARE'}</p>
        <div>
          <Image src={'/icons/ic_x_v2.svg'} alt={'x'} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default memo(Capture);
