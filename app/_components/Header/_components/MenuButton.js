import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

function MenuButton() {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        <Link href="/account" className="hover:text-accent-500 p-2">
          <IoPerson size={20} />
        </Link>

        <Link href="/cart" className="hover:text-accent-500 p-2">
          <FaShoppingCart size={20} />
        </Link>
      </ul>
    </nav>
  );
}

export default MenuButton;
