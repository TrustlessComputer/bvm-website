import '@/styles/index.scss';

import { Metadata, Viewport } from 'next';

import { MetadataConfig, ViewportConfig } from '@/config';
import chakraThemes, { ChakraFontsFace } from '@/themes/chakra-themes';
import { HelveticaNeueFontConfig } from '@/themes/font-config';
import { ChakraProvider } from '@chakra-ui/react';
import Hydrated from '@/components/Hydrated';

export const metadata: Metadata = MetadataConfig;
export const viewport: Viewport = ViewportConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={chakraThemes}>
          <ChakraFontsFace />
          <Hydrated>{children}</Hydrated>
          {/* {children} */}
        </ChakraProvider>
      </body>
    </html>
  );
}
