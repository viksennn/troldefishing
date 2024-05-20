import { FishingModel } from '@/app/data/mongoFishingModel';
import { connectMongo } from '@/app/data/mongodb';
import NextAuth, { AuthOptions, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials) {
                const {navn, password}: any = credentials;

                try {
                    await connectMongo();
                    const user = await FishingModel.findOne({navn});

                    if(!user) {
                        throw new Error("Brugeren findes ikke");
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    
                }
            },
        }),
    ],
    session: {  
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            // Add user ID to the token right after signing in
            if (user) {
                token.id = await user._id;
                token.name = await user.navn;
            }
            return token;
        },
        async session({ session, token }: any) {
            // Add user ID to the session object
            session.user.id = token.id;
            session.user.navn = token.name;
            return session;
        },
    },
} satisfies AuthOptions;

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};