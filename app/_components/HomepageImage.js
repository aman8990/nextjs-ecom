'use client';

import { useRouter } from 'next/navigation';
import img1 from '@/public/img1.jpg';
import img5 from '@/public/img5.jpg';
import '@/app/animation.css';
import Image from 'next/image';

function HomepageImage() {
  const router = useRouter();

  function handleClick(id) {
    router.push(`/products/${id}`);
  }

  return (
    <div className="mx-2">
      <div className="mt-10 rounded-md mb-12 h-[10rem] sm:h-[15rem] md:h-[18rem] lg:h-[22rem] max-w-4xl border-4 border-accent-400 mx-auto">
        <div className="relative w-full h-full overflow-hidden cursor-pointer">
          <Image
            src={img1}
            alt="First Image"
            className="absolute w-full h-full object-fill animate-slide"
            onClick={() => handleClick('669965381b4c2e33e5606d3a')}
          />
          <Image
            src={img5}
            alt="Second Image"
            className="absolute w-full h-full object-fill animate-slide animation-delay-3000"
            onClick={() => handleClick('667998c1c897ebfd00eb2398')}
          />
        </div>
      </div>
    </div>
  );
}

export default HomepageImage;
