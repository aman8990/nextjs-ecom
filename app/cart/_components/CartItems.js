'use client';

import Spinner from '@/app/_components/Spinner';
import CartItemsList from './CartItemsList';
import useCart from '@/app/_hooks/useCart';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Button from '@/app/_components/Button';
import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import { useState } from 'react';
import SpinnerMini from '@/app/_components/SpinnerMini';

function CartItems({ currentUser }) {
  const { cart, isLoading, error } = useCart();
  const [isCheckingout, setIsCheckingout] = useState(false);
  const cartItems = cart?.cartItems;
  const router = useRouter();

  const handleCheckout = async () => {
    if (!currentUser) {
      toast.dismiss();
      toast.error('Please login first');
      return router.push('/login?cart=true');
    }

    if (!currentUser.phone) {
      toast.dismiss();
      toast.error('Please add your phone number');
      if (!currentUser.address) {
        return router.push('/account/updateUserInfo?address=true');
      } else {
        return router.push('/account/updateUserInfo?cart=true');
      }
    }

    if (!currentUser.address) {
      toast.dismiss();
      toast.error('Please add your address');
      return router.push('/account/updateAddress?cart=true');
    }

    try {
      setIsCheckingout(true);
      const response = await axios.get('/api/createOrder');
      const paymentSessionId = response.data.payment_session_id;

      if (paymentSessionId) {
        router.push(`/cashfreeCheckout?paymentSessionId=${paymentSessionId}`);
      } else {
        toast.error('Failed to create order or retrieve payment session');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during checkout');
    } finally {
      setIsCheckingout(false);
    }
  };

  if (isLoading) return <Spinner />;

  if (error?.response === 'Error in fetching cart') {
    return (
      <div className="flex justify-center items-center mt-40 text-3xl">
        Error in fetching cart
      </div>
    );
  }

  if (cartItems?.length === 0)
    return (
      <div className="flex justify-center items-center mt-40 text-3xl">
        <FaShoppingCart size={40} /> &nbsp; Cart is Empty
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center md:my-10 mt-10 mb-32">
      <h1 className="text-4xl mb-10 underline">Cart</h1>
      <div className="flex flex-col sm:items-center gap-10 sm:gap-5 mx-2">
        {cartItems.map((item) => (
          <CartItemsList
            item={item}
            key={item.id || item.product.id}
            cartId={cart.id}
          />
        ))}
      </div>

      <div className="text-xl font-semibold mt-10">
        Total Price : {formatIndianCurrency(cart.totalPrice)}
      </div>
      <div className="w-32 mt-2">
        <Button onClick={handleCheckout}>
          {isCheckingout ? <SpinnerMini /> : 'Checkout'}
        </Button>
      </div>
    </div>
  );
}

export default CartItems;
