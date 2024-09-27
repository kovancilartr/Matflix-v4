import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Sequrity = async () => {
  return (
    <main className="flex h-full items-center justify-center flex-col gap-2">
      <h1 className="text-3xl">Erişim Hatası</h1>
      <p className="text-lg">Maalesef erişmek istediğiniz sayfaya yetkiniz bulunmamaktadır.</p>
    </main>
  );
};

export default Sequrity;
