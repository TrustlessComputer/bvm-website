import l2ServicesAPI from '@/services/api/l2services';
import { convertBase64ToFile } from '@/utils/file';
import { encodeBase64 } from '@/utils/helpers';
import { Button } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import Image from 'next/image';


const Capture = ({ ...props }) => {
  const handleClickShareTwitter = (url: string) => {
    try {
      const imgEncode = encodeBase64(url);

      const content = `Eternal AI`;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          content,
        )}&url=https://bvm.network/rollups/customizev2/${imgEncode}`,
        '_blank',
      );
    } catch (error) {
      //
    }
  };

  const exportBase64 = async () => {
    props.setIsCapture(true);
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
      const urlCDN = await l2ServicesAPI.uploadFile({ file });

      if (!urlCDN) return;

      props.setIsCapture(false);
      handleClickShareTwitter(urlCDN);
    }, 150);
  };

  async function download() {
    props.setIsCapture(true);
    const a = document.createElement('a');
    setTimeout(async () => {
      a.href = await exportBase64();
      props.setIsCapture(false);
      a.download = `${new Date}.png`;
      a.click();
    }, 150);
  }

  return (
    <div>
      <Button backgroundColor={'#f96e39'} onClick={exportAsImage}>
        SHARE
      </Button>
      <div onClick={() => download()}>
        <div>
          <Image src={'/icons/ic_image.svg'} alt={'icon'} width={20} height={20} />
        </div>
        <p>EXPORT</p>
      </div>
    </div>
  );
};

export default Capture;
