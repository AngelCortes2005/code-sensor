import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { supabase } from "@/lib/supabase/supabaseClient";

const authConfig = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github") {

        const { data: existing, error } = await supabase
          .from("users")
          .select("id")
          .eq("github_id", account.providerAccountId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error finding user in Supabase:", error);
          return false;
        }

        if (!existing) {
          const { error: insertError } = await supabase.from("users").insert({
            github_id: account.providerAccountId,
            name: user.name,
            email: user.email,
            avatar_url: user.image,
          });

          if (insertError) {
            console.error("Error creating user in Supabase:", insertError);
            return false;
          }
        }
      }

      return true;
    },

    async session({session, token}){
        if(session.user && token.sub){
            (session.user as any ).id = token.sub;
        }
        return session;
    }
  },
});

export const { auth, handlers } = authConfig;
export const { GET, POST } = handlers;