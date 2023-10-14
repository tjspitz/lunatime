import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';

const Home = () => {
  return (
    <main>
      <div className="flex items-center justify-center w-full h-full bg-pink-50">
        <div className="w-full max-w-[600px] mx-auto">
          <h1 className="my-4 text-giant text-pink-950">Welcome to Lunatime</h1>
          <p className="my-4 text-xl text-gray-800">
            Easily track and predict your cycles with the convenience you need.
          </p>
          <div>
            <Link href="/sign-in">
              <Button
                intent="primary"
                size="medium"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
