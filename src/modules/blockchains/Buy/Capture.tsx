import l2ServicesAPI from '@/services/api/l2services';
import { convertBase64ToFile } from '@/utils/file';
import { encodeBase64 } from '@/utils/helpers';
import { Button } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import s from '@/modules/blockchains/Buy/styles_v5.module.scss';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';

const Capture = () => {
  const { setIsCapture } = useCaptureStore();
  const handleClickShareTwitter = (url: string) => {
    try {
      // const imgEncode = encodeBase64(url);

      const content = `I'm launching my own ZK Rollup on Bitcoin with @BVMnetwork! 🚀

Bitcoin Studio makes blockchain building a breeze with simple drag-and-drop tools. No sweat, just pure innovation for $99/mo.

Join the Bitcoin bonanza:`;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          content,
        )}&url=https://bvm.network/studio/${url}`,
        '_blank',
      );
    } catch (error) {
      //
    }
  };

  const exportBase64 = async () => {
    setIsCapture(true);
    const canvasDom = document.querySelector('#imageCapture') as HTMLElement;
    const canvas = await html2canvas(canvasDom).then((res) => {
      return res;
    });
    return canvas.toDataURL('image/png', 1.0);
  };

  const exportAsImage = async () => {
    setTimeout(async () => {
      const image = await exportBase64();
      console.log('image', image);

      if (!image) return;

      const file = convertBase64ToFile(image);
      const res = await l2ServicesAPI.uploadFile({ file });

      if (!res) return;

      setIsCapture(false);
      handleClickShareTwitter(res);
    }, 150);
  };

  async function download() {
    setIsCapture(true);
    const a = document.createElement('a');
    setTimeout(async () => {
      console.log('capture');

      a.href = await exportBase64();
      setIsCapture(false);
      a.download = `${new Date()}.png`;
      a.click();
    }, 150);
  }

  return (
    <div className={s.wrapper_btn_top}>
      {/* <div className={s.reset} onClick={() => download()}>
        <div>
          <Image
            src={'/icons/ic_image.svg'}
            alt={'icon'}
            width={20}
            height={20}
          />
        </div>
        <p>EXPORT</p>
      </div> */}
      <div className={s.reset} onClick={exportAsImage}>
        <p>Share on</p>
        <div>
          <Image src={'/icons/x.svg'} alt={'x'} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default Capture;
