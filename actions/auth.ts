"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCredentials = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await signIn("credentials", {
      ...rawFormData,
      redirect: false, // Otomatik yönlendirmeyi devre dışı bırak
    });
    if (result && result.error) {
      return { error: "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin." };
    }
    // Başarılı girişten sonra sayfayı yeniden yükle
    window.location.href = "/21321"; // Yönlendirme URL'sine gidin ve sayfayı yeniden yükleyin
    return { success: "Giriş yapıldı" };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin." };
        default:
          return { error: "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin." };
      }
    }
    throw error;
  }

  revalidatePath("/");
};