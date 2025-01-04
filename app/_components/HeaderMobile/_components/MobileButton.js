import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { AiFillProduct } from 'react-icons/ai';
import { IoMdHome } from 'react-icons/io';
import { TbMessageFilled } from 'react-icons/tb';
import { usePathname } from 'next/navigation';

function MobileButton() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <nav>
      <ul className="flex md:hidden justify-between">
        <li className="p-2">
          <Link href="/">
            <IoMdHome
              size={30}
              className={isActive('/') ? 'text-accent-400' : ''}
            />
          </Link>
        </li>
        <li className="p-2">
          <Link href="/products">
            <AiFillProduct
              size={30}
              className={isActive('/products') ? 'text-accent-400' : ''}
            />
          </Link>
        </li>
        <li className="p-2">
          <Link href="/contactUs">
            <TbMessageFilled
              size={30}
              className={isActive('/contactUs') ? 'text-accent-400' : ''}
            />
          </Link>
        </li>
        <li className="p-2">
          <Link href="/cart">
            <FaShoppingCart
              size={30}
              className={isActive('/cart') ? 'text-accent-400' : ''}
            />
          </Link>
        </li>
        <li className="p-2">
          <Link href="/account">
            <IoPerson
              size={30}
              className={isActive('/account') ? 'text-accent-400' : ''}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MobileButton;
