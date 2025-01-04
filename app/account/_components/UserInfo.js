import getCurrentUser from '@/app/_actions/getCurrentUser';
import Image from 'next/image';

async function UserInfo() {
  const user = await getCurrentUser();
  const address = user?.address;
  const fullAddress = `${address?.locality} , ${address?.city} , ${address?.district} , ${address?.state} , ${address?.pincode}`;

  if (!user) {
    return <div className="text-center mt-3">User not found.</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div>
        <Image
          src="/default.jpg"
          alt="user-photo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="text-center mt-3 text-md md:text-lg">
        <div className="uppercase">{user.name}</div>
        <div>Email : {user.email}</div>
        {user.phone && <div>Phone No : {user.phone}</div>}
        {address && <div>Address : {fullAddress}</div>}
      </div>
    </div>
  );
}

export default UserInfo;
