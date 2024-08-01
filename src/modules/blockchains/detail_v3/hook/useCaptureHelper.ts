import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import l2ServicesAPI from '@/services/api/l2services';
import { convertBase64ToFile } from '@/utils/file';
import html2canvas from 'html2canvas';

const useCaptureHelper = () => {
  const { setIsCapture } = useCaptureStore();
  const handleClickShareTwitter = (url: string) => {
    try {
      // const imgEncode = encodeBase64(url);

      const content = `I'm launching my own ZK Rollup on Bitcoin with @BVMnetwork! 🚀

Bitcoin Studio makes blockchain building a breeze with simple drag-and-drop tools. No sweat, just pure innovation. Starting from $99/mo.

Let's upgrade #Bitcoin beyond a currency together!

👉https://bvm.network/studio/${url}`;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
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

  return {
    exportAsImage,
    handleClickShareTwitter,
    download,
  };
};

export default useCaptureHelper;
