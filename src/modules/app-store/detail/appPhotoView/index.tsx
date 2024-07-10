import { Divider, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import LightGallery from 'lightgallery/react';
// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
// import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-video.scss';

// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';


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
                  <img src={url} alt="" className={s.item}/>
                </PhotoView>
              )
            })
          }
        </Flex>
      </PhotoProvider>

      <LightGallery
        plugins={[lgVideo]}
        elementClassNames={s.content}
        // onInit={onInit}
      >
        {
          photoUrl?.map(url => {
            return (
              <div
                key={url}
                // data-lg-size={item.size}
                // data-lg-size="1280-720"
                className={s.item2}
                data-src={"https://youtu.be/IUN664s7N-c"}
              >
                <img className="img-responsive" src={url} />
              </div>
            )
          })
        }
      </LightGallery>
    </Flex>
  )
};

export default AppPhotoView;
