import UserInfo from './_components/UserInfo';

function UserLayout({ children }) {
  return (
    <div>
      <UserInfo />
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
}

export default UserLayout;
