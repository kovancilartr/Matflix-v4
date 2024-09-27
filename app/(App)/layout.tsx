"use client";
import Navbar from "@/components/(App)/Navbar";
import { useParams } from "next/navigation";
import React from "react";

export default function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: "Kurslar", url: "/courses" },
    { name: "Kullanıcılar", url: "/users" },
    { name: "Profil", url: "/profile" },
    { name: "Admin", url: "/admin" },
  ];
  const { topicId, lessonId } = useParams();

  return (
    <>
      {!lessonId && !topicId && (
        <Navbar className="bg-foreground" items={navItems} />
      )}
      <div className={`${!lessonId && !topicId ? "h-[calc(100vh-71px)]" : "h-screen"}`}>
        {children}
      </div>
    </>
  );
}
