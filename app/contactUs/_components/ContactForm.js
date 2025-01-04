'use client';

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import Textarea from '@/app/_components/Textarea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import axios from 'axios';
import toast from 'react-hot-toast';

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      description: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/contactUs', data);
      toast.dismiss();
      toast.success('Request Submitted');
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Error in submitting');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="mt-10 md:mt-20 mb-20 border-2 border-primary-900 max-w-lg
     w-full mx-auto rounded-lg"
    >
      <div className="flex items-center flex-col my-10">
        <h1 className="text-4xl mb-8">Contact Us</h1>
        <div className="w-full px-6 md:px-16">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Name"
              id="name"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
              }}
            />
            <Input
              label="Email address"
              id="email"
              type="email"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
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

            <Textarea
              label="Subject"
              id="subject"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <Textarea
              label="Description"
              id="description"
              type="text"
              errors={errors}
              register={register}
              disabled={isLoading}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <div>
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// export default ContactForm;
export default dynamic(() => Promise.resolve(ContactForm), { ssr: false });
