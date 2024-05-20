// next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth';

// Extend the Session interface
declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;
            navn?: string;
        } & DefaultSession['user'];
    }
}
