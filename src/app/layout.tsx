import '@/styles/index.scss';

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
      </head>
      <body>
        <StoreProvider>
          <ChakraProvider theme={chakraThemes}>
            <ChakraFontsFace />
            <UserProvider>
              <XVerseProvider>
                <UnisatProvider>
                  <Hydrated>{children}</Hydrated>
                  <ToastOverlay />
                </UnisatProvider>
              </XVerseProvider>
            </UserProvider>
          </ChakraProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
