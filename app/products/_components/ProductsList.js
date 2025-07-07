'use client';

import Button from '@/app/_components/Button';
import Image from 'next/image';
import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useCart from '@/app/_hooks/useCart';
import { useState } from 'react';
import SpinnerMini from '@/app/_components/SpinnerMini';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { addItemToLocalCart } from '@/app/_actions/data-service';

function ProductsList({ product }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const productId = product.id;
  const { refreshCart } = useCart();
  const { data: session, status } = useSession();

  const handleAddToCart = async () => {
    if (status === 'unauthenticated') {
      addItemToLocalCart({ product });
      toast.dismiss();
      toast.success('Item added to local cart');
    } else {
      setIsLoading(true);
      try {
        await axios.post('/api/cart/add', { productId });
        refreshCart();
        toast.dismiss();
        toast.success('Item added to cart');
      } catch (error) {
        toast.dismiss();
        toast.error('Error in adding product to cart');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="sm:max-w-[13rem] max-w-72 flex flex-col justify-between gap-1">
        <div
          className="sm:h-44 sm:w-52 h-44 w-72 bg-white flex justify-center items-center rounded-xl cursor-pointer"
          onClick={() => router.push(`/products/${product.id}`)}
        >
          <Image
            src={product.photo || '/grey.jpg'}
            alt="product-image"
            width={200}
            height={200}
            className="h-[90%] w-[90%] md:h-[83.3%] md:w-[83.3%]"
          />
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => router.push(`/products/${product.id}`)}
        >
          {product.name}
        </div>
        <div className="text-lg px-1">
          Price - {formatIndianCurrency(product.price)}
        </div>
        <Button onClick={() => handleAddToCart()}>
          {isLoading ? <SpinnerMini /> : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
}

export default ProductsList;
