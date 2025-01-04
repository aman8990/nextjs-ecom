'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/app/_components/Spinner';

function CashfreeCheckout() {
  const searchParams = useSearchParams();
  const paymentSessionId = searchParams.get('paymentSessionId');

  useEffect(() => {
    const loadCashfreeSdk = () => {
      return new Promise((resolve, reject) => {
        if (window.Cashfree) {
          resolve(window.Cashfree);
        } else {
          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.async = true;
          script.onload = () => resolve(window.Cashfree);
          script.onerror = () =>
            reject(new Error('Failed to load Cashfree SDK'));
          document.body.appendChild(script);
        }
      });
    };

    const initiateCashfreeCheckout = async () => {
      try {
        const Cashfree = await loadCashfreeSdk();
        if (Cashfree) {
          const cashfreeInstance = Cashfree({
            mode: 'sandbox',
          });

          const checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: '_self',
          };

          cashfreeInstance.checkout(checkoutOptions);
        } else {
          console.error('Cashfree SDK is not available');
        }
      } catch (error) {
        console.error('Error loading or initializing Cashfree SDK:', error);
      }
    };

    if (paymentSessionId) {
      initiateCashfreeCheckout();
    }
  }, [paymentSessionId]);

  return (
    <div>
      <Spinner />
    </div>
  );
}

export default CashfreeCheckout;
