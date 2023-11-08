import Link from 'next/link';
import Button from '@/components/Button';
import Logout from '@/components/Logout';

const Home = () => {
  return (
    <main className="flex items-center justify-center w-full h-full rounded-2xl bg-pink-50">
      <div className="w-full max-w-[600px] mx-auto">
        <Logout />
        <h1 className="my-4 text-giant text-pink-950">Welcome to Lunatime</h1>
        <p className="my-4 text-xl text-gray-800">
          Easily track and predict your cycles with the convenience you need.
        </p>
        <p> This is just proof of sign-in and proper redirect for now...</p>
        <div>
          <Link href="/profile">
            <Button
              intent="primary"
              size="medium"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
