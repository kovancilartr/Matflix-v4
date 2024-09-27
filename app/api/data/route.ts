import { auth } from "@/auth";
// auth fonksiyonunu içe aktarır. Bu fonksiyon, API isteklerini doğrulamak için kullanılır.

import { NextResponse } from "next/server";
// Next.js'in sunucu tarafında kullanılacak yanıt (response) nesnesini içe aktarır. Bu, API yanıtlarını oluşturmak için kullanılır.

export const GET = auth(function GET (req) {
    // GET isteğini ele alan bir API route'u tanımlar. auth fonksiyonu ile sarılmıştır, bu da isteği doğrulamayı sağlar.

    if (req.auth) return NextResponse.json(req.auth);
    // Eğer istek doğrulanmışsa (req.auth varsa), kullanıcının kimlik doğrulama bilgilerini JSON formatında döner.

    return NextResponse.json( {message: "Giriş Yapılmadı"}, {status: 401});
    // Eğer istek doğrulanmamışsa (req.auth yoksa), "Giriş Yapılmadı" mesajını ve 401 (Yetkisiz) durum kodunu JSON formatında döner.
});
