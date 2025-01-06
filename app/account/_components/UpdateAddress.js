'use client';

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import SpinnerMini from '@/app/_components/SpinnerMini';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

function UpdateAddress() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const routeNeeded = searchParams.get('cart');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      locality: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    axios
      .post('/api/updateAddress', data)
      .then(() => {
        toast.dismiss();
        toast.success('Address updated');

        if (routeNeeded) {
          setTimeout(() => {
            toast.dismiss();
            toast.success('Redirecting you to cart...');
            router.push('/cart');
          }, 500);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="mt-10 md:mt-20 mb-20 border-2 border-primary-900 max-w-lg
     w-full mx-auto rounded-lg"
    >
      <div className="flex items-center flex-col my-10">
        <h1 className="text-4xl mb-8">Update Address</h1>
        <div className="w-full px-6 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Locality"
              id="locality"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
                validate: (value) =>
                  value.trim() !== '' || '* This feild cannot be empty spaces',
              }}
            />
            <Input
              label="City"
              id="city"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
                validate: (value) =>
                  value.trim() !== '' || '* This feild cannot be empty spaces',
              }}
            />
            <Input
              label="District"
              id="district"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
                validate: (value) =>
                  value.trim() !== '' || '* This feild cannot be empty spaces',
              }}
            />
            <Input
              label="State"
              id="state"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
                validate: (value) =>
                  value.trim() !== '' || '* This feild cannot be empty spaces',
              }}
            />
            <Input
              label="Pincode"
              id="pincode"
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

// export default UpdateAddress;
export default dynamic(() => Promise.resolve(UpdateAddress), { ssr: false });
