import '@/styles/globals.css';
import clsx from 'clsx';
import Container from '@/components/Container';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Lunatime',
  description: 'TBD',
};

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={clsx(inter.variable, 'dark')}
    >
      <head />
      <body className="w-screen h-screen p-6">
        <Container className="flex w-full h-full p-6 mx-auto align-center">
          <main className="w-full h-full pl-6">{children}</main>
        </Container>
      </body>
    </html>
  );
};

export default DashboardRootLayout;
