import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

interface CustomUser extends User {
  role?: string;
}

// Define authOptions separately for better organization and reusability
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
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
};

// Export the handler using the new App Router pattern
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };