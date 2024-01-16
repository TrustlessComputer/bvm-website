import EternalAi from '@/modules/eternal-ai';

// ------------------------------------------------
// Override Metadata
// ------------------------------------------------

const APP_NAME = 'Eternal AI';
const APP_DEFAULT_TITLE = 'Eternal AI';
const APP_TITLE_TEMPLATE = 'Eternal AI';
const APP_DESCRIPTION = 'Decentralized AI on Bitcoin.';
// const APP_THUMBNAIL = `${CDN_URL_ICONS}/metadata.jpg`;

// or Dynamic metadata
export async function generateMetadata() {
  return {
    applicationName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    // manifest: "/manifest.json",// using for PWA
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: APP_DEFAULT_TITLE,
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: 'website',
      siteName: APP_NAME,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
      images: [
        {
          url: 'https://cdn.newbitcoincity.com/nbc/icons/bvm-icons/metadata_eternal_ai.png',
          width: 1200,
          height: 630,
          alt: APP_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    },
  };
}

export default function EternalAiPage() {
  return <EternalAi />;
}
