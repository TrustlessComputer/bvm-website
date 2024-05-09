import { isDesktop } from 'react-device-detect';
import React from 'react';
import BaseModal from '@/components/BaseModal';

interface IProps {
  isShow: boolean;
  onHide: () => void;
}

const CDN_URL = 'https://cdn.generative.xyz';

const FilmsModal = ({ isShow, onHide }: IProps) => {
  const videoUrl = React.useMemo((): string => {
    return isDesktop
      ? `https://storage.googleapis.com/generative-static-prod/Teaser_GenBrain_01.mp4`
      : 'https://storage.googleapis.com/generative-static-prod/output_video_mobile.mp4';
  }, []);

  return (
    <BaseModal isShow={isShow} onHide={onHide}>
      <video
        poster={`${CDN_URL}/Screen%20Shot%202023-03-21%20at%2010.43.18%20AM.jpg`}
        src={videoUrl}
        controls
        preload="auto"
        autoPlay={isDesktop}
        playsInline
        loop
      />
    </BaseModal>
  );
};

export default FilmsModal;
