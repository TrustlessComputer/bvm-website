import { convertBase64ToFile } from '@/utils/file';
import Image from 'next/image';
import { memo, useState } from 'react';

import useStudioHelper from './hooks/useStudioHelper';
import useImageHelper from './hooks/useImageHelper';

import s from '@/modules/blockchains/Buy/styles_v5.module.scss';

const Capture = () => {
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const { capture, getTwitterContent } = useStudioHelper();
  const { shareToTwitter, uploadFile, downloadImage } = useImageHelper();

  const handleOnShare = async () => {
    if (isCapturing) return;

    setIsCapturing(true);

    const imageAsBase64 = await capture();
    const imageAsFile = convertBase64ToFile(imageAsBase64);
    const url = await uploadFile(imageAsFile);
    const content = getTwitterContent(url);

    await shareToTwitter(content);

    setIsCapturing(false);
  };

  const handleOnExport = async () => {
    if (isCapturing) return;

    setIsCapturing(true);

    const imageAsBase64 = await capture();
    downloadImage(imageAsBase64);

    setIsCapturing(false);
  };

  return (
    <div className={s.wrapper_btn_top}>
      <div
        className={`${s.reset2} ${isCapturing && s.isCapturing}`}
        onClick={handleOnShare}
      >
        <p>{isCapturing ? 'SHARING...' : 'SHARE'}</p>
        <div>
          <Image src={'/icons/ic_x_v2.svg'} alt={'x'} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default memo(Capture);
