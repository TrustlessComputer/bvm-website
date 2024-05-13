import { PERP_NAKA_API_URL } from '@/config';
import { AppThumbnail, getMetadata } from '@/modules/Launchpad/metadata';
import LaunchpadDetailHome from '@/modules/Launchpad/Launchpad.Detail';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  const response = await fetch(
    `${PERP_NAKA_API_URL}/api/launchpad/detail/${id}`,
  ).then((res) => res.json());
  const launchpad = response?.result;

  const metadata: Metadata = getMetadata({
    thumbnail: launchpad?.seo_image || AppThumbnail.page,
    description:
      launchpad?.seo_description ||
      'BVM is the first modular Bitcoin L2 metaprotocol on Bitcoin. With a few clicks, anyone can plug and play the best-of-breed blockchain modules to launch their own Bitcoin L2.',
  });

  return {
    title: launchpad?.name,
    ...metadata,
  };
}

function LaunchpadDetailPage() {
  return (
    <>
      <LaunchpadDetailHome />
    </>
  );
}

export default LaunchpadDetailPage;
