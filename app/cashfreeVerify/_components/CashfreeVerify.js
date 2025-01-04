'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '@/app/_components/Spinner';
import OrderDetails from './OrderDetails';

function CashfreeVerify() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const cashfreeOrderId = searchParams.get('cashfreeOrderId');
  const userOrderId = searchParams.get('userOrderId');

  useEffect(() => {
    const verifyOrder = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post('/api/verifyOrder', {
          cashfreeOrderId,
          userOrderId,
        });
        setOrder(response.data);
        toast.dismiss();

        if (response.status === 201) {
          toast.error('Payment Failed');
        } else if (response.status === 200) {
          toast.success('Order Placed');
        }
      } catch (error) {
        setError(error);
        toast.dismiss();
        toast.error('Error in verifying payment');
      }
      setIsLoading(false);
    };

    verifyOrder();
  }, [cashfreeOrderId, userOrderId]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center flex-col">
        <div>
          <Spinner />
        </div>
        <h1>Verifying your order</h1>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center text-3xl mt-20">
        Error in verifying payment
      </div>
    );

  return (
    <div>
      <OrderDetails order={order} />
    </div>
  );
}

export default CashfreeVerify;
