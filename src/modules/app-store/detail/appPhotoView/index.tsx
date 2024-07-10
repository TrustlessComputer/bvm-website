import { Divider, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const AppPhotoView = ({photoUrl}: {photoUrl: string[]}) => {
  return photoUrl?.length > 0 && (
    <Flex className={s.container} direction={"column"} gap={"40px"}>
      <Divider orientation={"horizontal"} bgColor={"#ECECEC"}/>

      <PhotoProvider>
        <Flex className={s.content}>
          {
            photoUrl?.map(url => {
              return (
                <PhotoView src={url}>
                  <img src={url} alt="" style={{ objectFit: 'cover', width: '30%', borderRadius: '12px' }}/>
                </PhotoView>
              )
            })
          }
        </Flex>
      </PhotoProvider>
    </Flex>
  )
};

export default AppPhotoView;
