'use client';

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

function UpdateUserInfo() {
  const searchParama = useSearchParams();
  const routeNeeded = searchParama.get('address');
  const routeNeededCart = searchParama.get('cart');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    axios
      .post('/api/updateUserInfo', data)
      .then(() => {
        toast.dismiss();
        toast.success('User updated');

        if (routeNeeded) {
          setTimeout(() => {
            toast.dismiss();
            toast.error('Please add your address, Redirecting...');
            router.push('/account/updateAddress?cart=true');
          }, 500);
        }

        if (routeNeededCart) {
          setTimeout(() => {
            toast.dismiss();
            toast.success('Redirecting you to cart...');
            router.push('/cart');
          }, 500);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="mt-10 md:mt-20 mb-20 border-2 border-primary-900 max-w-lg
     w-full mx-auto rounded-lg"
    >
      <div className="flex items-center flex-col my-10">
        <h1 className="text-4xl mb-8">Update User</h1>
        <div className="w-full px-6 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Name"
              id="name"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
                validate: (value) =>
                  value.trim() !== '' || '* Name cannot be empty spaces',
              }}
            />
            <Input
              label="Phone No."
              id="phone"
              type="number"
              errors={errors}
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

// export default UpdateUserInfo;
export default dynamic(() => Promise.resolve(UpdateUserInfo), { ssr: false });
