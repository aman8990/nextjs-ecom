'use client';

import { use, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '@/app/_components/Spinner';
import OrderDetail from './_components/OrderDetail';
import NotFound from '@/app/not-found';

function Page({ params }) {
  const { orderId } = use(params);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || {};

    if (storedOrders[orderId]) {
      setOrder(storedOrders[orderId]);
      setIsLoading(false);

      delete storedOrders[orderId];

      setTimeout(() => {
        localStorage.setItem('orders', JSON.stringify(storedOrders));
      }, [2000]);
    } else {
      axios
        .post('/api/order', { orderId })
        .then((response) => {
          setOrder(response.data[0]);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [params.id, orderId]);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      // <div className="text-xl flex justify-center mt-10">
      //   Error in finding Order
      // </div>
      <div>
        <NotFound />
      </div>
    );

  return (
    <div className="">
      <OrderDetail order={order} />
    </div>
  );
}

export default Page;
