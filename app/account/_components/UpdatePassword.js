'use client';

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    axios
      .post('/api/updatePassword', data)
      .then(() => {
        toast.dismiss();
        toast.success('Password updated');
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
        <h1 className="text-4xl mb-8">Update Password</h1>
        <div className="w-full px-6 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Current Password"
              id="password"
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
              label="Password"
              id="newPassword"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
                validate: (value) =>
                  value.trim() !== '' || '* This feild cannot be empty spaces',
                minLength: {
                  value: 8,
                  message: '* Password needs a minimum of 8 characters',
                },
              }}
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
                validate: (value) =>
                  value === getValues('newPassword') ||
                  '* Passwords do not match',
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

// export default UpdatePassword;
export default dynamic(() => Promise.resolve(UpdatePassword), { ssr: false });
