'use client';

import SpinnerMini from '@/app/_components/SpinnerMini';
import useCart from '@/app/_hooks/useCart';
import { addItemToLocalCart, deleteLocalCartItem } from '@/app/_libs/api';
import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function CartItemsList({ item, cartId }) {
  const [quantity, setQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { refreshCart } = useCart();
  const itemInfo = item.product;
  const itemId = itemInfo.id;
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(
    function () {
      setQuantity(item?.quantity);
    },
    [item?.quantity]
  );

  function handleAdd(e) {
    e.preventDefault();
    setQuantity(quantity + 1);
  }

  function handleSub(e) {
    e.preventDefault();
    if (quantity === 1) return;

    setQuantity(quantity - 1);
  }

  const handleUpdate = async () => {
    if (status === 'unauthenticated') {
      addItemToLocalCart({ product: itemInfo, quantity });
      refreshCart();
    } else {
      setIsUpdating(true);
      try {
        await axios.patch('/api/cart/update', {
          productId: itemId,
          quantity,
          cartId,
        });
        toast.dismiss();
        toast.success('Item updated');
        refreshCart();
      } catch (error) {
        toast.dismiss();
        toast.error('Error in updating quantity');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemove = async () => {
    if (status === 'unauthenticated') {
      await deleteLocalCartItem(itemId);
      refreshCart();
    } else {
      setIsLoading(true);
      try {
        await axios.delete('/api/cart/remove', {
          data: { productId: itemId, cartId },
        });
        toast.dismiss();
        toast.success('Item removed');
        refreshCart();
      } catch (error) {
        toast.dismiss();
        toast.error('Error in removing product from cart');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center sm:border-2 border-primary-300 sm:w-[35rem] md:w-[40rem] w-auto gap-5 rounded-md">
      <div className="flex justify-center items-center bg-white h-20 sm:h-40 w-[20%] sm:w-[30%]">
        <Image
          src={itemInfo.photo}
          alt="item-image"
          height={200}
          width={200}
          className="h-[83.3%] w-[83.3%]"
        />
      </div>

      <div className="w-[70%] space-y-1 sm:mr-5">
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/products/${itemId}`)}
        >
          {itemInfo.name}
        </div>

        <div className="flex gap-2 sm:gap-4 items-center">
          <div>Quantity : {item.quantity}</div>
          <button onClick={handleSub} className="font-extrabold px-1 text-xl">
            &minus;
          </button>
          <h1>{quantity}</h1>
          <button onClick={handleAdd} className="font-extrabold px-1 text-xl">
            &#43;
          </button>
          <h1></h1>
          <button
            onClick={() => handleUpdate()}
            className="flex justify-center items-center bg-accent-600 rounded-md px-1 h-6 w-11"
          >
            {isUpdating ? <SpinnerMini size={20} /> : 'Save'}
          </button>
        </div>

        <div>
          Price : {formatIndianCurrency(itemInfo.price * item.quantity)}
        </div>
        <button
          onClick={handleRemove}
          className="flex justify-center items-center bg-red-700 text-white p-0.5 rounded-md w-16 h-7"
        >
          {isLoading ? <SpinnerMini size={20} /> : 'Remove'}
        </button>
      </div>
    </div>
  );
}

export default CartItemsList;
