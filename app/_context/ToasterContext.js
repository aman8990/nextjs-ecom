'use client';

import { Toaster } from 'react-hot-toast';

function ToasterContext() {
  return (
    <div>
      <Toaster toastOptions={{ className: 'custom-toast' }} />
    </div>
  );
}

export default ToasterContext;
