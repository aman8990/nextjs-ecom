'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

function UserSettings() {
  return (
    <div className="flex flex-col justify-center items-center mt-10 mb-20">
      <h1 className="text-3xl underline mb-10">User Settings</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-10 sm:gap-y-10 text-center text-lg sm:text-xl md:text-3xl">
        <Link
          href="/account/updateUserInfo"
          className="border-2 border-white p-3 hover:bg-accent-600 transition-colors duration-300 ease-in-out rounded-md"
        >
          Update User Info
        </Link>

        <Link
          href="/account/updatePassword"
          className="border-2 border-white p-3 hover:bg-accent-600 rounded-md"
        >
          Update Password
        </Link>

        <Link
          href="/account/updateAddress"
          className="border-2 border-white p-3 hover:bg-accent-600 rounded-md"
        >
          Update Address
        </Link>

        <Link
          href="/account/orders"
          className="border-2 border-white p-3 hover:bg-accent-600 rounded-md"
        >
          Your Orders
        </Link>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-red-700 text-white text-lg p-1 rounded-md mt-10 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default UserSettings;
