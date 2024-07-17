import { Button } from '@chakra-ui/react';
import html2canvas from "html2canvas";

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

  return <Button backgroundColor={'#f96e39'} onClick={()=> exportAsImage()}>capture</Button>
}

export default Capture
