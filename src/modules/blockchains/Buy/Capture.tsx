import { Button } from '@chakra-ui/react';
import html2canvas from "html2canvas";
import Image from 'next/image';
import s from '@/modules/blockchains/Buy/styles_v5.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';

const Capture = ({...props}) => {

  const exportAsImage = async () => {
    props.setIsCapture(true);
    const canvasDom = document.querySelector('#imageCapture')
    setTimeout( async () => {
      const canvas = await html2canvas(canvasDom).then((res) => {
        props.setIsCapture(false);
        return res;
      });
      const image = canvas.toDataURL("image/png", 1.0);
      console.log('image', image)
      return image
    },1500)
    // downloadImage(image, imageFileName);
  };


  async function download() {
    const a = document.createElement('a');
    const base64 = await exportAsImage().then((res) => {
      a.href = res
      a.download = "Image.png";
      a.click();
    })
  }

  return (
    <div  onClick={() => download()} className={s.reset}>
      <div className={s.icon}>
        <ImagePlaceholder src={'/icons/ic_image.svg'} alt={'icon'} width={20} height={20} />
      </div>
      <p>EXPORT</p>
    </div>
  )
}

export default Capture
