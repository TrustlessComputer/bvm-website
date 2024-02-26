import s from './styles.module.scss'
import { Heading } from '@chakra-ui/react';


type TCardFiProps = {
  title: string;
  description: string;
  image: string;
  bgColorImage: string;
}

const CardFi = ({...props}:TCardFiProps) => {
  return <div className={`${s.cardWrapper}`}>
    <div className={`${s.imageWrapper}`} style={{backgroundColor: props.bgColorImage}}>
      <img src={props.image} alt="GameFi_1" />
    </div>
    <div className={`${s.contentWrapper}`}>
      <Heading fontSize={'32px'} fontWeight={400} marginBottom={'16px'}>{props.title}</Heading>
      <p>{props.description}</p>
    </div>
  </div>
}

export default CardFi;
