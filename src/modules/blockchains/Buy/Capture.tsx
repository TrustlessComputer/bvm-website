import l2ServicesAPI from '@/services/api/l2services';
import { convertBase64ToFile } from '@/utils/file';
import { encodeBase64, openExtraLink } from '@/utils/helpers';
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

  const exportAsImage = async () => {
    props.setIsCapture(true);
    const canvasDom = document.querySelector('#imageCapture');
    setTimeout(async () => {
      const canvas = await html2canvas(canvasDom).then((res) => {
        props.setIsCapture(false);
        return res;
      });
      const image = canvas.toDataURL('image/png', 1.0);
      console.log('image', image);

      if (!image) return;

      const file = convertBase64ToFile(image);

      const urlCDN = await l2ServicesAPI.uploadFile({ file });

      if (!urlCDN) return;

      handleClickShareTwitter(urlCDN);

      // return image;
    }, 1500);
    // downloadImage(image, imageFileName);
  };

  return (
    <Button backgroundColor={'#f96e39'} onClick={() => exportAsImage()}>
      capture
    </Button>
  );
};

export default Capture;
