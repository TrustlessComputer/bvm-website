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
import { ContactUsProvider } from '@/Providers/ContactUsProvider';
import { NakaConnectProvider } from '@/Providers/NakaConnectProvider';
import { Web3AuthProvider } from '@/Providers/Web3Auth_vs2/Web3AuthProvider';
import WagmiConfigProvider from '@components/WagmiConnector/WagmiConfigProvider';
import WagmiProvider from '@components/WagmiConnector/WagmiProvider';

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
          src="https://www.googletagmanager.com/gtag/js?id=G-YYP2P7BNWB"
        ></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YYP2P7BNWB');`}
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
            <Web3AuthProvider>
              <WagmiConfigProvider>
                <WagmiProvider>
                  <UserProvider>
                    <XVerseProvider>
                      <UnisatProvider>
                        <NakaConnectProvider>
                          <ContactUsProvider>
                            <ModalManager />
                            {children}
                          </ContactUsProvider>
                        </NakaConnectProvider>
                        <ToastOverlay />
                      </UnisatProvider>
                    </XVerseProvider>
                  </UserProvider>
                </WagmiProvider>
              </WagmiConfigProvider>
            </Web3AuthProvider>
          </ChakraProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
