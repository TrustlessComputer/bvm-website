import '@/styles/index.scss';

import { Metadata, Viewport } from 'next';

import { MetadataConfig, ViewportConfig } from '@/config';
import chakraThemes from '@/themes/chakra-themes';
import { ChakraProvider } from '@chakra-ui/react';
import Hydrated from '@/components/Hydrated';
import dynamic from 'next/dynamic';
import StoreProvider from '@/Providers/StoreProvider';
import { XVerseProvider } from '@/Providers/xverse-context';
import { UnisatProvider } from '@/Providers/unisat-context';
import ToastOverlay from '@/components/ToastOverlay';
import { UserProvider } from '@/Providers/user-context';

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
