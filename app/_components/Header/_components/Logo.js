import { useRouter } from 'next/navigation';
import { HiSun } from 'react-icons/hi';

function Logo() {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center space-x-1 p-2"
      onClick={() => router.push('/')}
    >
      <span className="flex items-center">
        <HiSun color="orange" size={40} />
      </span>
      <span className="top-[2px] relative">E-Com</span>
    </div>
  );
}

export default Logo;
