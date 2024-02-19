import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import React, { useEffect, useMemo, useState } from 'react';
import DropDown from '@/components/DropList';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import cx from 'clsx';
import { getLaunchpadDetail } from '@/services/launchpad';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ILaunchpadDetail } from '@/services/interfaces/launchpad';
import { getYouTubeID } from '@/utils/helpers';

const TopContent = () => {
  const params = useParams();

  const [isOpen, setOpen] = useState(false);
  const publicSaleSummary = useAppSelector(commonSelector).publicSaleSummary;
  const needReload = useSelector(commonSelector).needReload;
  const [launchpadDetail, setLaunchpadDetail] = useState<ILaunchpadDetail>();

  const id = params?.id;

  const isYoutube = useMemo(() => {
    return (
      launchpadDetail?.intro?.link?.includes('youtube') ||
      launchpadDetail?.intro?.link?.includes('youtu.be')
    );
  }, [launchpadDetail?.intro?.link]);

  const youtubeId = useMemo(() => {
    if(launchpadDetail?.intro?.link) {
      return getYouTubeID(launchpadDetail?.intro?.link);
    }
    return '';
  }, [launchpadDetail?.intro?.link]);

  useEffect(() => {
    if(id) {
      getLaunchpadInfo(id as unknown as number);
    }
  }, [id, needReload]);

  const getLaunchpadInfo = async (id: number) => {
    const res = await getLaunchpadDetail({id: id});
    setLaunchpadDetail(res);
  }

  return (
    <div className={cx(s.container, 'container')}>
      <div className={s.content}>
        <Flex direction={'column'} gap={3}>
          <Text fontSize={"16px"} fontWeight={400} lineHeight={'24px'} className={s.subTitle}>
            {launchpadDetail?.name}
          </Text>
          <Text className={s.title}>{launchpadDetail?.title}</Text>
          <Text fontSize={16} fontWeight={400} lineHeight={'24px'} className={s.desc}>{launchpadDetail?.description}</Text>
        </Flex>
        <ul className={s.actions}>
          <li>
            <a href={'#'} onClick={() => setOpen(true)}>
              <Image src={launchpadDetail?.intro?.image} width={168} height={90}
                     alt={'right'} />
              {launchpadDetail?.intro?.title}</a>
            {
              isYoutube ? (
                <ModalVideo
                  channel={'youtube'}
                  videoId={youtubeId as string}
                  isOpen={isOpen}
                  onClose={() => {
                    setOpen(false);
                  }}
                />
              ) : (
                <ModalVideo
                  channel={'custom'}
                  url={launchpadDetail?.intro?.link}
                  isOpen={isOpen}
                  onClose={() => {
                    setOpen(false);
                  }}
                />
              )
            }
          </li>
          <li className={s.dropDownItem}>
            <DropDown lists={launchpadDetail?.docs || []}>
              <Image src={`/public-sale/btn-pdf.png`} width={168} height={90}
                     alt={'right'} />
              <span className={s.text}>Learn more</span>
            </DropDown>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopContent;
