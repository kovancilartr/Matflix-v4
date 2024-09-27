import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const adminRoutes = ["/admin"];
const userRoutes = ["/courses"];
const authRoutes = ["/sign-in"];

export default async function middleware(request: NextRequest) {
  {/* Admin sayfalarının kontrolünü yapıyoruz */}
  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAdminRoute) {
    const session = await auth();

    if (!session) {
      const absoluteURL = new URL("/sign-in", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    if ((session.user as any)?.role !== "admin") {
      const absoluteURL = new URL("/sequrity", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  {/* User sayfalarının kontrolünü yapıyoruz */}
  const isUserRoute = userRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isUserRoute) {
    const session = await auth();

    if (!session) {
      const absoluteURL = new URL("/sign-in", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    if ((session.user as any)?.status !== "active") {
      const absoluteURL = new URL("/sequrity", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  {/* Login olmuş bir kullanıcı tekrar login sayfasına yönlendirilmesin */}
  const isAuth = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAuth) {
    const session = await auth();

    if (session) {
      const absoluteURL = new URL("/", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};