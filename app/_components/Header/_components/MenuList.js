import Link from 'next/link';

function MenuList() {
  return (
    <nav className="hidden md:block">
      <ul className="flex top-[2px] relative ml-9 space-x-10">
        <Link href="/" className="hover:text-accent-400 p-2">
          Home
        </Link>

        <Link href="/products" className="hover:text-accent-400 p-2">
          Products
        </Link>

        <Link href="/contactUs" className="hover:text-accent-400 p-2">
          Contact Us
        </Link>
      </ul>
    </nav>
  );
}

export default MenuList;
