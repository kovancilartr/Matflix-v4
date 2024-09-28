"use client";
import Navbar from "@/components/(Global)/Navbar";
import React from "react";

export default function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabMenuItems = [
    {
      name: "Ana Sayfa",
      url: "/",
    },
    {
      name: "Kurslar",
      url: "/courses",
    },
    {
      name: "Admin Paneli",
      url: "/admin",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar className="bg-black" items={tabMenuItems} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
