import l2ServicesAPI from '@/services/api/l2services';
import { convertBase64ToFile } from '@/utils/file';
import { encodeBase64 } from '@/utils/helpers';
import { Button } from '@chakra-ui/react';
import html2canvas from 'html2canvas';

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
    const canvasDom = document.querySelector('#imageCapture') as HTMLElement;
    const canvas = await html2canvas(canvasDom).then((res) => {
      props.setIsCapture(false);
      return res;
    });
    return canvas.toDataURL('image/png', 1.0);
  };


  const exportAsImage = async () => {
    props.setIsCapture(true);
    const canvasDom = document.querySelector('#imageCapture') as HTMLElement;

    setTimeout(async () => {
      const canvas = await html2canvas(canvasDom).then((res) => {
        props.setIsCapture(false);
        return res;
      });
      const image = await exportBase64();
      console.log('image', image);

      if (!image) return;

      const file = convertBase64ToFile(image);
      const urlCDN = await l2ServicesAPI.uploadFile({ file });

      if (!urlCDN) return;

      handleClickShareTwitter(urlCDN);
    }, 1500);
  };

  async function download() {
    props.setIsCapture(true);
    const a = document.createElement('a');
      await exportAsImage().then((res) => {
      a.href = res;
      a.download = 'Image.png';
      setTimeout(async () => {
        a.href = await exportBase64();
        a.download = `${new Date}.png`;
        a.click();
      });
    }, 1500);
  }

  return (
    <div>
      <Button backgroundColor={'#f96e39'} onClick={() => exportAsImage()}>
        capture
      </Button>
      <div onClick={() => download()} className={s.reset}>
        <div className={s.icon}>
          <Image src={'/icons/ic_image.svg'} alt={'icon'} width={20} height={20} />
        </div>
        <p>EXPORT</p>
      </div>
    </div>
  );
};

export default Capture;
