import html2canvas from 'html2canvas';
import s from '@/modules/blockchains/Buy/styles_v5.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';

const Capture = ({...props}) => {

  const exportBase64 = async ( ) => {
    const canvasDom = document.querySelector('#imageCapture')
    const canvas = await html2canvas(canvasDom).then((res) => {
      props.setIsCapture(false);
      return res;
    });
    return canvas.toDataURL("image/png", 1.0)
  }

  const exportAsImage = async () => {
    props.setIsCapture(true);
    setTimeout( async () => {
      return exportBase64()
    },1500)
  };


  async function download() {
    props.setIsCapture(true);
    const a = document.createElement('a');
    setTimeout( async () => {
      a.href = await exportBase64()
      a.download = `${new Date}.png`;
      a.click();
    },1500)
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
