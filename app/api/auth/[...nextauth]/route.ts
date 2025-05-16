import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth";
import { type User } from "next-auth";
import { NextResponse } from "next/server";

// Force dynamic rendering to ensure request context is available
export const dynamic = "force-dynamic";

interface CustomUser extends User {
  role?: string;
}

export const authOptions: NextAuthOptions = {
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
        return {
          ...token,
          role: (user as CustomUser).role,
          email: user.email
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          email: token.email
        }
      };
    }
  }
};

const handler = NextAuth(authOptions);

// Ensure proper response handling for both GET and POST requests
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