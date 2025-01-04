import useSWR from 'swr';
import fetcher from '../_libs/fetcher';

export default function useCart() {
  const {
    data: serverCart,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/cart/index', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    staleTime: 10 * 60 * 1000,
    dedupingInterval: 60000,
    errorRetryCount: 1,
  });

  const refreshCart = async () => {
    await mutate();
  };

  const getLocalCart = () => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('cart')) || { cartItems: [] };
    }
    return { cartItems: [] };
  };

  const localCart = getLocalCart();

  const cart = serverCart ? serverCart : localCart;

  return { cart, error, isLoading, mutate, refreshCart };
}
