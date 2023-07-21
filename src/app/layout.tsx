import type { Metadata } from 'next';
import Link from 'next/link';
import { Nunito } from 'next/font/google';
import { styles } from '@/utils/styles';
import './globals.css';

const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + styles.primaryBg}>
        {children}
        <NavBar />
      </body>
    </html>
  );
}

export function NavBar() {
  return (
    <div className="flex text-med items-center justify-between mx-12">
      <Link
        className={styles.button + styles.hoverSm}
        href="./"
      >
        Logout
      </Link>
      <Link
        className={styles.button + styles.hoverSm}
        href="./calendar"
      >
        Calendar
      </Link>
      <Link
        className={styles.button + styles.hoverSm}
        href="./profile"
      >
        Profile
      </Link>
      <Link
        className={styles.button + styles.hoverSm}
        href="./stats"
      >
        Stats
      </Link>
    </div>
  );
}
