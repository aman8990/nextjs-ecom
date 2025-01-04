'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import axios from 'axios';

export default function SyncCartOnLogin() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      const localCart = JSON.parse(localStorage.getItem('cart')) || {
        cartItems: [],
        totalPrice: 0,
      };

      if (localCart.totalPrice === 0) {
        return;
      } else {
        axios
          .post('/api/cart/sync', {
            cartItems: localCart.cartItems,
            totalPrice: localCart.totalPrice,
          })
          .then(() => {
            localStorage.removeItem('cart');
          })
          .catch((error) => {
            console.error('Error syncing cart:', error);
          });
      }
    }
  }, [status]);

  return null;
}
