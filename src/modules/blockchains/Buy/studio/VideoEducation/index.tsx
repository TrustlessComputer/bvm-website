import ModalVideo from 'react-modal-video';
import React from 'react';

export default function VideoEducation(){

  return <div>
    <ModalVideo
      channel="custom"
      url={
        'https://storage.googleapis.com/bvm-network/icons-tool/DragnDrop_03.mp4'
      }
      isOpen={isOpenModalVideo}
      onClose={() => {
        setIsOpenModalVideo(false);
      }}
    />
  </div>
}
