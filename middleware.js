export { default } from 'next-auth/middleware';

export const config = {matcher: ["/dashboard", "/fiskerne/:path*", "/min-profil"]};