import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Container from '@/components/Container';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const AuthRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={inter.variable}
    >
      <head />
      <body className='w-screen h-screen p-6'>
        <Container className='flex items-center justify-center w-full h-full'>
          {children}
        </Container>
      </body>
    </html>
  );
};

export default AuthRootLayout;
