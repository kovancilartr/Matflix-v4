import { NextResponse } from "next/server";
import { db } from "@/db"; // Prisma Client'i içe aktarır
import { auth } from "@/auth"; // auth fonksiyonunu içe aktarır

export const GET = auth(async function GET(req) {
  if (req.auth) {
    try {
      const users = await db.user.findMany(); // Prisma Client ile tüm kullanıcıları alır

      return NextResponse.json(users);
    } catch (error) {
      console.error("Veritabanı hatası:", error);
      return NextResponse.json(
        { message: "Veritabanı hatası" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Bu API'den veri almak için giriş yapılmalıdır" }, { status: 401 });
});
