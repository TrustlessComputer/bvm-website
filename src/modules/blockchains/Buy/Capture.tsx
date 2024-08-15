import l2ServicesAPI from '@/services/api/l2services';
import { convertBase64ToFile } from '@/utils/file';
// import html2canvas from 'html2canvas';
import Image from 'next/image';
import s from '@/modules/blockchains/Buy/styles_v5.module.scss';
// import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
// import { useReactFlow } from '@xyflow/react';
import { toPng } from 'html-to-image';
import { useState } from 'react';
import Loading from '@components/Loading';

// const imageWidth = 1920;
// const imageHeight = 1080;

const Capture = () => {
  // const { setIsCapture } = useCaptureStore();
  // const { getNodes } = useReactFlow();
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const handleClickShareTwitter = (url: string) => {
    try {
      // const imgEncode = encodeBase64(url);

      const content = `I'm launching my own ZK Rollup on Bitcoin with @BVMnetwork! 🚀

Bitcoin RaaS Studio makes blockchain building a breeze with simple drag-and-drop tools. No sweat, just pure innovation. Starting from $99/mo.

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

  // capture old flow
  // async function download() {
  //   setIsCapture(true);
  //
  //   const a = document.createElement('a');
  //   setTimeout(async () => {
  //     a.href = await exportBase64();
  //     a.download = `${new Date()}.png`;
  //     a.click();
  //     setIsCapture(false);
  //   }, 150);
  // }

  // const exportBase64 = async (): Promise<string> => {
  //   const canvasDom = document.querySelector('#viewport') as HTMLElement;
  //   const canvas = await html2canvas(canvasDom, {
  //     // width: 1920,
  //     // height: 1080,
  //     removeContainer: false,
  //     x: 0,
  //     y: 0,
  //   }).then((res) => {
  //     return res;
  //   });
  //   return canvas.toDataURL('image/png', 1.0);
  //   // const canvasDom = document.querySelector('.react-flow__viewport') as HTMLElement;
  //   // return toPng(canvasDom, {
  //   //   backgroundColor: '#fff',
  //   //   width: imageWidth,
  //   //   height: imageHeight,
  //   //   quality: 1,
  //   //   style: {
  //   //     width: `${imageWidth}`,
  //   //     height: `${imageHeight}`,
  //   //     transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
  //   //   },
  //   // }).then(res => {
  //   //   // setIsCapture(false);
  //   //   return res;
  //   // })
  // };

  const handleShareTwitter = async () => {
    setIsCapturing(true);
    setTimeout(async () => {
      const image = await convertToBase64();

      if (!image) return;

      const file = convertBase64ToFile(image);
      const res = await l2ServicesAPI.uploadFile({ file });

      if (!res) return;

      setIsCapturing(false);
      handleClickShareTwitter(res);
    }, 150);
  };

  async function convertToBase64() {
    const viewport = document.querySelector('#viewport');

    if(!viewport) return '';
    const imageWidth = viewport.clientWidth;
    const imageHeight = viewport.clientHeight;

    return await toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
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
    })
  }

  async function downloadImage() {
    if (isCapturing) return;
    setIsCapturing(true);

    const a = document.createElement('a');
    const dataUrl = await convertToBase64();
    a.setAttribute('download', `${new Date()}.png`);
    a.setAttribute('href', dataUrl);
    a.click();
    setIsCapturing(false)
  }

  // const onClick = () => {
  //   if (isCapturing) return;
  //   setIsCapturing(true);
  //
  //   toPng(document.querySelector('#viewport') as HTMLElement, {
  //     backgroundColor: '#fff',
  //     width: imageWidth,
  //     height: imageHeight,
  //     canvasWidth: imageWidth,
  //     canvasHeight: imageHeight,
  //     quality: 1,
  //     style: {
  //       width: `${imageWidth}`,
  //       height: `${imageHeight}`,
  //     },
  //   }).then(downloadImage).then(() => setIsCapturing(false));
  // };

  return (
    <div className={s.wrapper_btn_top}>
      {/*<div className={s.reset2} onClick={() => download()}>*/}
      <div className={`${s.reset2} ${isCapturing && s.isCapturing}`} onClick={downloadImage}>
        <p>EXPORT</p>
        <div>
          <Image
            src={'/icons/ic_image_2.svg'}
            alt={'icon'}
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className={`${s.reset2} ${isCapturing && s.isCapturing}`} onClick={handleShareTwitter}>
        <p>SHARE</p>
        <div>
          <Image src={'/icons/ic_x_v2.svg'} alt={'x'} width={20} height={20} />
        </div>
      </div>
      {
        isCapturing && (
          <div className={s.loading}>
            <Loading />
            <p className={s.loading_text}>We are capturing...</p>
          </div>
        )
      }
    </div>
  );
};

export default Capture;
