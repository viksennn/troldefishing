import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectMongo } from '@/app/data/mongodb';
import { FishingModel } from '@/app/data/mongoFishingModel';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { navn, password }: any = credentials;
                try {
                    await connectMongo();
                    const user = await FishingModel.findOne({ navn });

                    if (!user) {
                        throw new Error("Brugeren findes ikke");
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.error(error);
                    return null;
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
            if (user) {
                token.id = user._id;
                token.name = user.navn;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user.id = token.id;
            session.user.navn = token.name;
            return session;
        },
    },
};
