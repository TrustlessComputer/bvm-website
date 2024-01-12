import '@/styles/index.scss';

import { Metadata, Viewport } from 'next';

import { MetadataConfig, ViewportConfig } from '@/config';
import chakraThemes from '@/themes/chakra-themes';
import { ChakraProvider } from '@chakra-ui/react';
import Hydrated from '@/components/Hydrated';
import dynamic from 'next/dynamic';
import StoreProvider from '@/Providers/StoreProvider';

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
          <Hydrated>{children}</Hydrated>
          {/* {children} */}
        </ChakraProvider>
      </StoreProvider>
      </body>
    </html>
  );
}
