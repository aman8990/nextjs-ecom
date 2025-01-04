'use client';

import Logo from './_components/Logo';
import MenuButton from './_components/MenuButton';
import MenuList from './_components/MenuList';

function Header() {
  return (
    <div className="flex justify-center md:justify-between items-center py-1 md:py-4 pl-8 pr-10 text-xl border-b border-primary-900">
      <Logo />
      <MenuList />
      <MenuButton />
    </div>
  );
}

export default Header;

// 'use client';

// import { useEffect, useState } from 'react';
// import Logo from './_components/Logo';
// import MenuButton from './_components/MenuButton';
// import MenuList from './_components/MenuList';

// function Header() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const controlHeader = () => {
//       if (window.scrollY > lastScrollY) {
//         setIsVisible(false);
//       } else {
//         setIsVisible(true);
//       }
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener('scroll', controlHeader);

//     return () => {
//       window.removeEventListener('scroll', controlHeader);
//     };
//   }, [lastScrollY]);

//   return (
//     <div className="mb-24 md:mb-32">
//       <div
//         className={`${
//           isVisible ? 'translate-y-0' : '-translate-y-full'
//         } transition-transform duration-300 fixed top-0 left-0 w-full bg-primary-950 shadow-md z-50`}
//       >
//         <div className="flex justify-center md:justify-between items-center py-1 md:py-4 pl-8 pr-10 text-xl border-b border-primary-900">
//           <Logo />
//           <MenuList />
//           <MenuButton />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
