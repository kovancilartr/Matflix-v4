// matflix-v4/auth.ts
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { saltAndHashPassword } from "./utils/helper";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    // Github Giriş İşlemleri
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    // Local Giriş İşlemleri
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password);

        const user: any = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        } else {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
          );

          if (!isMatch) {
            throw new Error("Incorrect Password");
          }
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = (user as any).id;
      if (user) token.surname = (user as any).surname;
      if (user) token.role = (user as any).role;
      if (user) token.status = (user as any).status;
      if (user) token.department = (user as any).department;
      if (user) token.class = (user as any).class;
      return token;
    },
    session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  trustHost: true, // localhost'u güvenilir host olarak ayarlamak için
});