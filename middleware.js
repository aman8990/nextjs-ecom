import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
  async redirect({ url, baseUrl }) {
    return baseUrl + '/account';
  },
});

export const config = {
  matcher: ['/account/:path*'],
};
