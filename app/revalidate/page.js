'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import dynamic from 'next/dynamic';
import Spinner from '../_components/Spinner';

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
    } else if (session.user.role !== 'admin') {
      router.push('/');
    }
  }, [session, status, router]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      path: '',
      apiKey: '',
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    axios
      .post('/api/revalidate', data)
      .then((res) => {
        toast.dismiss();
        toast.success(res.data || 'Revalidate Successful');
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data || 'Error in submitting details');
      })
      .finally(() => setIsLoading(false));
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div
      className="mt-10 md:mt-20 mb-20 border-2 border-primary-900 max-w-lg
     w-full mx-auto rounded-lg"
    >
      <div className="flex items-center flex-col my-10">
        <h1 className="text-3xl md:text-4xl mb-8">Revalidate Path</h1>
        <div className="w-full px-6 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Path"
              id="path"
              type="text"
              errors={errors}
              placeholder="/products"
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <Input
              label="Secret Key"
              id="apiKey"
              type="password"
              errors={errors}
              placeholder="xxxxxxxxxxxx"
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <div>
              <Button disabled={isLoading} type="submit">
                {isLoading ? <SpinnerMini /> : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// export default Page;
export default dynamic(() => Promise.resolve(Page), { ssr: false });
