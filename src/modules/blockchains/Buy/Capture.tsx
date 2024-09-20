import useFocusNode from '@/modules/blockchains/Buy/hooks/useFocusNode';
import s from '@/modules/blockchains/Buy/styles_v5.module.scss';
import l2ServicesAPI from '@/services/api/l2services';
import { convertBase64ToFile } from '@/utils/file';
import { signal, useSignalEffect } from '@preact/signals-react';
import { toPng } from 'html-to-image';
import Image from 'next/image';
import { memo, useCallback, useRef, useState } from 'react';

const isExportImage = signal(false);
const isSharing = signal(false);

const Capture = () => {
  const { handleFocusNode } = useFocusNode();
  const timerRef = useRef<any>();
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(10);
  const handleClickShareTwitter = (url: string) => {
    try {
      const content = `I'm launching my own ZK Rollup on Bitcoin with @BVMnetwork! 🚀

BVM Studio makes blockchain building a breeze with simple drag-and-drop tools. No sweat, just pure innovation. Starting from $99/mo.

Let's transform #Bitcoin beyond money together!
https://bvm.network/studio/${url}`;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    } catch (error) {
      //
    }
  };

  const handleShareTwitter = async () => {
    if (isCapturing) return;
    isSharing.value = true;
    setIsCapturing(true);
    setTimeout(async () => {
      const image = await convertToBase64();

      if (!image) return;

      const file = convertBase64ToFile(image);
      const res = await l2ServicesAPI.uploadFile({ file });

      if (!res) return;

      setIsCapturing(false);
      isSharing.value = false;
      clearIntervalTimer();
      setSeconds(10);
      handleClickShareTwitter(res);
    }, 150);
  };

  const convertToBase64 = useCallback(async () => {
    const viewport = document.querySelector('#viewport');

    if (!viewport) return '';
    const imageWidth = viewport.clientWidth;
    const imageHeight = viewport.clientHeight;

    return await toPng(
      document.querySelector('.react-flow__viewport') as HTMLElement,
      {
        backgroundColor: '#fff',
        width: imageWidth,
        height: imageHeight,
        canvasWidth: imageWidth,
        canvasHeight: imageHeight,
        quality: 1,
        style: {
          width: `${imageWidth}`,
          height: `${imageHeight}`,
        },
      },
    );
  }, []);

  async function downloadImage() {
    if (isCapturing) return;

    isExportImage.value = true;
    setIsCapturing(true);

    const a = document.createElement('a');
    const dataUrl = await convertToBase64();
    a.setAttribute('download', `${new Date()}.png`);
    a.setAttribute('href', dataUrl);
    a.click();
    setIsCapturing(false);
    isExportImage.value = false;
    clearIntervalTimer();
    setSeconds(10);
  }

  const clearIntervalTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  useSignalEffect(() => {
    if (isExportImage.value || isSharing.value) {
      countDown();
    }
  });

  const countDown = () => {
    let num = seconds;
    timerRef.current = setInterval(() => {
      if (num === 0) {
        clearIntervalTimer();
      }
      if (num > 0) {
        num--;
        setSeconds(num);
      }
    }, 1000);
  };

  return (
    <div className={s.wrapper_btn_top}>
      <div
        className={`${s.reset2} ${isCapturing && s.isCapturing}`}
        onClick={handleShareTwitter}
      >
        <p>{isSharing.value ? `SHARING...${seconds}` : 'SHARE'}</p>
        <div>
          <Image src={'/icons/ic_x_v2.svg'} alt={'x'} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default memo(Capture);
