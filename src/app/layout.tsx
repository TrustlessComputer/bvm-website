import '@/styles/index.scss';

import { Metadata, Viewport } from 'next';

import { MetadataConfig, ViewportConfig } from '@/config';
import chakraThemes from '@/themes/chakra-themes';
import { HelveticaNeueFontConfig } from '@/themes/font-config';
import { ChakraProvider } from '@chakra-ui/react';

export const metadata: Metadata = MetadataConfig;
export const viewport: Viewport = ViewportConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={HelveticaNeueFontConfig.className}>
        <ChakraProvider theme={chakraThemes}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
