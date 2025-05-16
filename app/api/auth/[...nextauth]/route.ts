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

// Export GET and POST handlers with proper request handling
export async function GET(request: Request) {
  try {
    // Create a new URL object from the request URL
    const url = new URL(request.url);
    // Pass the pathname to NextAuth
    return await handler(request, { params: { nextauth: url.pathname.split('/').slice(4) } });
  } catch (error) {
    console.error("NextAuth GET error:", error);
    return NextResponse.json(
      { error: "Authentication error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Create a new URL object from the request URL
    const url = new URL(request.url);
    // Pass the pathname to NextAuth
    return await handler(request, { params: { nextauth: url.pathname.split('/').slice(4) } });
  } catch (error) {
    console.error("NextAuth POST error:", error);
    return NextResponse.json(
      { error: "Authentication error occurred" },
      { status: 500 }
    );
  }
}