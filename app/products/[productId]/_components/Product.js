'use client';

import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import Image from 'next/image';
import ProductInfo from './ProductInfo';
import axios from 'axios';
import useCart from '@/app/_hooks/useCart';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { useSession } from 'next-auth/react';
import { addItemToLocalCart } from '@/app/_libs/api';

function Product({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const productId = product.id;
  const { refreshCart } = useCart();
  const { data: session, status } = useSession();
  const [currentImage, setCurrentImage] = useState(
    product?.photo || '/grey.jpg'
  );

  const images = product?.images || [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg',
  ];

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

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
    <div className="flex flex-col items-center max-w-[80rem] gap-4">
      {/* <div className="h-40 w-40 md:h-52 md:w-72 bg-white flex justify-center items-center rounded-md">
        <Image
          src={product?.photo || '/grey.jpg'}
          alt="product-image"
          height={200}
          width={200}
          className="h-[83.3%] w-[83.3%] transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div> */}

      <div className="flex flex-col items-center">
        <div className="h-52 w-72 md:h-72 md:w-96 bg-white flex justify-center items-center rounded-md overflow-hidden cursor-pointer">
          <Image
            src={currentImage}
            alt="product-image"
            height={500}
            width={500}
            className="h-[90%] w-[90%] transition-transform duration-300 ease-in-out hover:scale-110 object-contain rounded-md"
          />
        </div>

        <div className="flex mt-4 space-x-2 mb-3">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(image)}
              className="cursor-pointer border-2 border-gray-300 rounded-md hover:border-blue-500"
            >
              <Image
                src={image}
                alt={`thumbnail-${index}`}
                height={200}
                width={200}
                className="h-10 w-10 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-xl font-bold text-center">{product?.name}</div>
      <div className="text-center text-xs md:text-lg">
        {product.description}
      </div>
      <div className="flex gap-5 items-center text-sm md:text-lg">
        <div className="top-[2px] relative">
          Price : {formatIndianCurrency(product?.price)}
        </div>
        <button
          onClick={() => handleAddToCart()}
          className="flex justify-center items-center bg-accent-600 hover:bg-accent-500 p-2 rounded-md w-28 h-12"
        >
          {isLoading ? <SpinnerMini size={30} /> : 'Add to cart'}
        </button>
      </div>
      <div className="text-center underline text-4xl mt-10 mb-2">
        Product Info
      </div>
      <div className="border-2 border-white rounded-md">
        <ProductInfo
          fullDescription={product?.fullDescription}
          images={product?.images}
        />
      </div>
    </div>
  );
}

export default Product;
