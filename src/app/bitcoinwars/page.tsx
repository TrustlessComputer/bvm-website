import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Bitcoin Wars',
  description:
    'Prepare your strategy and engage in the battle that will shape the future of Bitcoin. Starting at the Bitcoin 2024 Conference in Nashville.',
  openGraph: {
    images: ['/maga/crypto-war.svg'],
  },
};

export default function Page() {
  return redirect('/bitcoin-wars');
}
