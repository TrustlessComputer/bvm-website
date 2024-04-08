import '@/styles/index.scss';
import '@fontsource/space-mono';
import '@fontsource/urbanist';

import { Metadata, Viewport } from 'next';

import StoreProvider from '@/Providers/StoreProvider';
import { UnisatProvider } from '@/Providers/unisat-context';
import { UserProvider } from '@/Providers/user-context';
import { XVerseProvider } from '@/Providers/xverse-context';
import Hydrated from '@/components/Hydrated';
import ToastOverlay from '@/components/ToastOverlay';
import { MetadataConfig, ViewportConfig } from '@/config';
import chakraThemes from '@/themes/chakra-themes';
import { ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import ModalManager from '@/components/ModalManage';
import { AuthenticatedProvider } from '@/Providers/AuthenticatedProvider';
import { ContactUsProvider } from '@/Providers/ContactUsProvider';

export const metadata: Metadata = MetadataConfig;
export const viewport: Viewport = ViewportConfig;

const ChakraFontsFace = dynamic(
  () => import('@/themes/chakra-font').then((m) => m.default),
  {
    ssr: false,
  },
);


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D9T7LSF6BJ"
        ></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-D9T7LSF6BJ');`}
        </Script>
        <Script>
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ktq824k12x");`}
        </Script>
      </head>
      <body>
        <StoreProvider>
          <ChakraProvider theme={chakraThemes}>
            <ChakraFontsFace />
            <AuthenticatedProvider>
              <UserProvider>
                <XVerseProvider>
                  <UnisatProvider>
                    <ContactUsProvider>
                      <Hydrated>
                        <ModalManager />
                        {children}
                      </Hydrated>
                    </ContactUsProvider>
                    <ToastOverlay />
                  </UnisatProvider>
                </XVerseProvider>
              </UserProvider>
            </AuthenticatedProvider>
          </ChakraProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
