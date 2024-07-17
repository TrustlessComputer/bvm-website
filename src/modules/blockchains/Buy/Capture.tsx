import { Button } from '@chakra-ui/react';
import html2canvas from "html2canvas";
import { forwardRef } from 'react';

//
// function Capture() {
//
//   async function handleCapture() {
//      await html2canvas(document.querySelector('.imageCapture'), {
//       onrendered: function(canvas) {
//         // document.body.appendChild(canvas);
//         // const img = Canvas2Image.saveAsPNG(canvas)
//         console.log('canvas', canvas)
//         // console.log(img)
//         // return img;
//       }
//     });
//   }
//
//   return <Button backgroundColor={'#f96e39'} onClick={()=> handleCapture()}>capture</Button>
// }

const Capture = forwardRef((props, ref) => {
  async function handleCapture() {
    await html2canvas(document.querySelector('.imageCapture'), {
      onrendered: function(canvas) {
        // document.body.appendChild(canvas);
        // const img = Canvas2Image.saveAsPNG(canvas)
        console.log('canvas', canvas)
        // console.log(img)
        // return img;
      }
    });
  }

  const exportAsImage = async () => {
    const canvas = await html2canvas(ref);
    const image = canvas.toDataURL("image/png", 2.0);
    console.log('image', image)
    // downloadImage(image, imageFileName);

  };

  return <Button backgroundColor={'#f96e39'} onClick={()=> exportAsImage()}>capture</Button>
})

export default Capture
