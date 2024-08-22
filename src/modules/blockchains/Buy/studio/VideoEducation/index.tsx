import ModalVideo from 'react-modal-video';
import React from 'react';
import { useVideoEducation } from '@/modules/blockchains/Buy/studio/useVideoEducation';

export default function VideoEducation() {
  const { isShowVideo, setShowVideo } = useVideoEducation(state => state);

  return <div>
    <ModalVideo
      channel="custom"
      url={
        'https://storage.googleapis.com/bvm-network/icons-tool/DragnDrop_03.mp4'
      }
      isOpen={isShowVideo}
      onClose={() => {
        setShowVideo(false);
      }}
    />
  </div>;
}
