export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/repositories/:path*",
    "/api/analyses/:path*",
    "/api/analytics/:path*",
  ],
};
