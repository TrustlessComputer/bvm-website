import l2ServicesAPI from '@/services/api/l2services';
import { convertBase64ToFile } from '@/utils/file';
import { encodeBase64 } from '@/utils/helpers';
import { Button } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import s from '@/modules/blockchains/Buy/styles_v5.module.scss';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import { getNodesBounds, getViewportForBounds, useReactFlow } from '@xyflow/react';
import { toPng } from 'html-to-image';


const imageWidth = 1024;
const imageHeight = 768;

const Capture = () => {
  const { setIsCapture } = useCaptureStore();
  const { getNodes } = useReactFlow();
  const handleClickShareTwitter = (url: string) => {
    try {
      // const imgEncode = encodeBase64(url);

      const content = `I'm launching my own ZK Rollup on Bitcoin with @BVMnetwork! 🚀

Bitcoin RaaS Studio makes blockchain building a breeze with simple drag-and-drop tools. No sweat, just pure innovation. Starting from $99/mo.

Let's transform #Bitcoin beyond money together!
https://bvm.network/studio/${url}`;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          content,
        )}`,
        '_blank',
      );
    } catch (error) {
      //
    }
  };

  const exportBase64 = async ():Promise<string> => {
    // const nodesBounds = getNodesBounds(getNodes());
    // const viewport = getViewportForBounds(
    //   nodesBounds,
    //   imageWidth,
    //   imageHeight,
    //   0.5,
    //   2,
    //   5
    // );

    const canvasDom = document.querySelector('#viewport') as HTMLElement;
    const canvas = await html2canvas(canvasDom).then((res) => {
      return res;
    });
    return canvas.toDataURL('image/png', 1.0);
    // const canvasDom = document.querySelector('.react-flow__viewport') as HTMLElement;
    // return toPng(canvasDom, {
    //   backgroundColor: '#fff',
    //   width: imageWidth,
    //   height: imageHeight,
    //   quality: 100,
    //   style: {
    //     width: `${imageWidth}`,
    //     height: `${imageHeight}`,
    //     transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
    //   },
    // }).then(res => res)
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

  // async function download() {
  //   setIsCapture(true);
  //   const a = document.createElement('a');
  //   setTimeout(async () => {
  //
  //     a.href = await exportBase64();
  //     setIsCapture(false);
  //     a.download = `${new Date()}.png`;
  //     a.click();
  //   }, 150);
  // }

  async function download() {
    setIsCapture(true);
    const a = document.createElement('a');
    setTimeout(async () => {

      a.href = await exportBase64();
      a.download = `${new Date()}.png`;
      a.click();
      setIsCapture(false);
    }, 150);
  }

  // function downloadImage(dataUrl) {
  //   const a = document.createElement('a');
  //
  //   a.setAttribute('download', 'reactflow.png');
  //   a.setAttribute('href', dataUrl);
  //   a.click();
  // }

  return (
    <div className={s.wrapper_btn_top}>
       <div className={s.reset2} onClick={() => download()}>
        <div>
          <Image
            src={'/icons/ic_image_2.svg'}
            alt={'icon'}
            width={20}
            height={20}
          />
        </div>
        <p>EXPORT</p>
      </div>
      <div className={s.reset2} onClick={exportAsImage}>
        <p>SHARE</p>
        <div>
          <Image src={'/icons/ic_x_v2.svg'} alt={'x'} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default Capture;
