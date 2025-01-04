'use client';

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function ForgotForm() {
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    setIsMounted(true);

    if (session?.status === 'authenticated') {
      router.push('/');
    }
  }, [router, session?.status]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
      .post('/api/send-forgot-otp', { email })
      .then(() => {
        setShowMore(true);
        toast.dismiss();
        toast.success('OTP sent successfully');
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data || 'Error in sending otp');
      })
      .finally(() => {
        setIsSendingOtp(false);
      });
  };

  const onSubmit = (data) => {
    setIsRegistering(true);

    axios
      .post('/api/forgotPassword', data)
      .then(() => {
        toast.dismiss();
        toast.success('Password Changed Successfully. You can login now');
        router.push('/login');
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data || 'Error in submitting details');
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
        <h1 className="text-2xl md:text-4xl mb-7">Forgot Password</h1>
        <div className="w-full px-6 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {showMore && (
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
              )}
            </>

            {showMore && (
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
            )}

            {showMore && (
              <div>
                <Button disabled={isSendingOtp || isRegistering} type="submit">
                  {isRegistering ? <SpinnerMini /> : 'Submit'}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotForm;
