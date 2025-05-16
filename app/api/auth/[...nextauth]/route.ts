import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

// Enable dynamic route handling
export const dynamic = "force-dynamic";

interface CustomUser extends User {
  role?: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Create a serializable user object
          const user: CustomUser = {
            id: "1",
            email: credentials.email,
            name: "Demo User",
            role: "lawyer"
          };
          
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as CustomUser).role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as CustomUser).role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});

// Export GET and POST handlers with proper error handling
export async function GET(req: Request) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("NextAuth GET error:", error);
    return NextResponse.json(
      { error: "Authentication error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("NextAuth POST error:", error);
    return NextResponse.json(
      { error: "Authentication error occurred" },
      { status: 500 }
    );
  }
}