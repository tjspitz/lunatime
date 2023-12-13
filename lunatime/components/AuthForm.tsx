'use client';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { signIn, signUp } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import Button from './Button';
import Input from './Input';

const signUpContent = {
  header: 'Create a New Account',
  subheader: 'It only takes about 3 minutes',
  buttonText: 'Register',
  linkUrl: '/sign-in',
  linkText: 'Already have an account?',
};

const signInContent = {
  header: 'Welcome Back',
  subheader: 'Sign in with your Lunatime credentials',
  buttonText: 'Sign In',
  linkUrl: '/sign-up',
  linkText: 'New to Lunatime?',
};

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const AuthForm = ({ mode }: { mode: string }) => {
  const [form, setForm] = useState({ ...initialState });
  const [hidePwd, setHidePWd] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (mode === 'register') {
          await signUp(form);
          router.replace('/new-user'); // force first cycle creation
        } else {
          await signIn(form);
          router.replace('/home');
        }
      } catch (error) {
        setError(`Could not ${mode}...`);
        console.error(error);
      } finally {
        setForm({ ...initialState });
      }
    },
    [mode, form, router]
  );

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, firstName: e.target.value }));
  };
  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, lastName: e.target.value }));
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, email: e.target.value }));
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, password: e.target.value }));
  };
  const handleShowPwdClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHidePWd(!hidePwd);
  };

  const content = mode === 'register' ? signUpContent : signInContent;

  return (
    <main className="w-3/4 mx-auto mt-4">
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-xl">{content.header}</h2>
          <p className="text-lg italic text-black/25">{content.subheader}</p>
        </div>
        <form
          className="w-full py-10 ml-4"
          onSubmit={handleSubmit}
        >
          {mode === 'register' && (
            <div className="flex justify-between mb-8">
              <div className="pr-2">
                <div className="mb-4 ml-2 text-lg underline text-black/50">
                  First Name
                </div>
                <Input
                  intent="primary"
                  size="medium"
                  required
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="pl-2">
                <div className="mb-4 ml-2 text-lg underline text-black/50">
                  Last Name
                </div>
                <Input
                  intent="primary"
                  size="medium"
                  required
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>
          )}
          <div className="flex justify-between mb-8">
            <div className="mb-8">
              <div className="mb-4 ml-2 text-lg underline text-black/50">
                Email
              </div>
              <Input
                intent="primary"
                size="medium"
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-8">
              <div className="mb-4 ml-2 text-lg underline text-black/50">
                Password
              </div>
              <Button
                intent="primary"
                size="small"
                type="button"
                onClick={handleShowPwdClick}
              >
                {hidePwd ? 'Show' : 'Hide'}
              </Button>
              <Input
                intent="primary"
                size="medium"
                required
                type={hidePwd ? 'password' : 'text'}
                placeholder="Password"
                value={form.password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <span>
                <Link
                  href={content.linkUrl}
                  className="font-bold text-blue-600"
                >
                  {content.linkText}
                </Link>
              </span>
              <div>
                <Button
                  type="submit"
                  intent="secondary"
                >
                  {content.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AuthForm;
