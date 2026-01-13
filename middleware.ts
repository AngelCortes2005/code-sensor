import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/repositories/:path*",
    "/api/analyses/:path*",
    "/api/analytics/:path*",
  ],
};
