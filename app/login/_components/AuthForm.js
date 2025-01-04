'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../_components/Input';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import Button from '@/app/_components/Button';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';

function AuthForm() {
  const [variant, setVariant] = useState('LOGIN');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    if (session?.status === 'authenticated') {
      router.push('/');
    }
  }, [router, session?.status]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      otp: '',
    },
  });

  const handleSendOtp = () => {
    const { email } = getValues();
    if (!email) {
      toast.dismiss();
      toast.error('Please provide an email');
      return;
    }

    setIsSendingOtp(true);

    axios
      .post('/api/send-otp', { email })
      .then(() => {
        toast.dismiss();
        toast.success('OTP sent successfully');
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data || 'Error in sending otp');
      })
      .finally(() => setIsSendingOtp(false));
  };

  const onSubmit = (data) => {
    setIsRegistering(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => {
          toast.dismiss();
          toast.success('Email verification successfull. You can login now');
          setVariant('LOGIN');
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data || 'Error in submitting details');
        })
        .finally(() => setIsRegistering(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.dismiss();
            toast.error(callback?.error || 'Error in logging in');
          }

          if (callback?.ok && !callback?.error) {
            toast.dismiss();
            toast.success('Logged In');
            router.push('/');
          }
        })
        .finally(() => setIsRegistering(false));
    }
  };

  const socialAction = (action) => {
    setIsRegistering(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.dismiss();
          toast.error('Invalid credentials');
        }

        if (callback?.ok && !callback?.error) {
          toast.dismiss();
          toast.success('Logged In');
        }
      })
      .finally(() => setIsRegistering(false));
  };

  if (!isMounted) return null;

  return (
    <div
      className="mt-10 md:mt-20 mb-20 border-2 border-primary-900 max-w-lg
     w-full mx-auto rounded-lg"
    >
      <div className="flex items-center flex-col my-10">
        <h1 className="text-3xl md:text-4xl mb-8">
          {variant === 'LOGIN'
            ? 'Sign In to your account'
            : 'Register new account'}
        </h1>
        <div className="w-full px-6 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {variant === 'REGISTER' && (
              <Input
                label="Name"
                id="name"
                type="text"
                errors={errors}
                register={register}
                disabled={isSendingOtp || isRegistering}
                validationRules={{
                  required: '* This field is required',
                }}
              />
            )}

            <Input
              label="Email address"
              id="email"
              type="email"
              errors={errors}
              register={register}
              disabled={isSendingOtp || isRegistering}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              errors={errors}
              register={register}
              disabled={isSendingOtp || isRegistering}
              validationRules={{
                required: '* This field is required',
              }}
            />

            {variant === 'REGISTER' && (
              <>
                <div
                  className={`flex justify-center bg-accent-600 rounded-md p-1 text-lg text-white hover:bg-accent-500 w-full cursor-pointer ${
                    isSendingOtp || isRegistering ? 'cursor-no-drop' : ''
                  }`}
                  onClick={
                    isSendingOtp || isRegistering ? null : () => handleSendOtp()
                  }
                >
                  {isSendingOtp ? <SpinnerMini /> : 'Send OTP'}
                </div>

                <div>
                  <Input
                    label="OTP"
                    id="otp"
                    type="number"
                    errors={errors}
                    register={register}
                    disabled={isSendingOtp || isRegistering}
                    validationRules={{
                      required: '* This field is required',
                    }}
                  />
                </div>
              </>
            )}

            <div>
              <Button disabled={isSendingOtp || isRegistering} type="submit">
                {isRegistering ? (
                  <SpinnerMini />
                ) : variant === 'LOGIN' ? (
                  'Sign In'
                ) : (
                  'Register'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-5">
            <div className="flex items-center justify-center w-full gap-x-2">
              <div className="border-t border-gray-300 flex-grow"></div>
              <h1 className="text-sm text-gray-300">or continue with</h1>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            <div className="mt-3 flex gap-2">
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction('google')}
              />
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction('github')}
              />
            </div>
          </div>
        </div>

        <div className="flex mt-5 gap-2 text-md">
          <div>
            {variant === 'LOGIN'
              ? 'New to E-Com? - '
              : 'Already have an account - '}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>

        <div
          className="cursor-pointer mt-2 p-0.5"
          onClick={() => router.push('/forgotPassword')}
        >
          Forgot your Password
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
