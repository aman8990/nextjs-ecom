import { Josefin_Sans } from 'next/font/google';
import Header from './_components/Header/Header';
import './globals.css';
import FooterMobile from './_components/HeaderMobile/FooterMobile';
import AuthContext from './_context/AuthContext';
import ToasterContext from './_context/ToasterContext';
import SyncCartOnLogin from './_components/syncCartOnLogin';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'E-Com',
  description: 'Ecommerce',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen`}
      >
        <AuthContext>
          <ToasterContext />
          <Header />
          <SyncCartOnLogin />
          <div>{children}</div>
          <FooterMobile />
        </AuthContext>
      </body>
    </html>
  );
}
