import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Bitcoin Wars',
  description:
    'Gear up for an epic adventure and strategize your way to victory in Bitcoin Wars, an incredibly fun onchain game on Bitcoin.',
  openGraph: {
    images: ['/maga/crypto-war-seo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Wars',
    description:
      'Gear up for an epic adventure and strategize your way to victory in Bitcoin Wars, an incredibly fun onchain game on Bitcoin.',
    images: '/maga/crypto-war-seo.png',
  },
};

export default function Page() {
  return redirect('/bitcoin-wars');
}
