import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-center w-screen h-screen bg-pink-50">
        <div className="w-full max-w-[600px] mx-auto">
          <h1 className="my-4 text-giant text-pink-950">Welcome to Lunatime</h1>
          <p className="my-4 text-xl text-gray-800">
            Easily track and predict your cycles with the convenience you need.
          </p>
          <div>
            <Link href="/dashboard">
              <button className="px-4 py-2 my-4 rounded-xl bg-pink-950 text-pink-50">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
