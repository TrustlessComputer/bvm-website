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


  async function download() {
    const a = document.createElement('a');
    const base64 = await exportAsImage().then((res) => {
      a.href = res
      a.download = "Image.png";
      a.click();
    } )
  }

  return <div>
    <Button backgroundColor={'#f96e39'} onClick={()=> exportAsImage()}>capture</Button>
    <Button backgroundColor={'#f96e39'} onClick={()=> download()}>Download</Button>
  </div>
}

export default Capture
