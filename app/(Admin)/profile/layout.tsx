"use client";
import { AdminDashboard } from "@/components/(Global)/GlobalDashboard";
import { FileChartColumnIncreasingIcon, NotebookTabsIcon, Package, Settings, User, Users2 } from "lucide-react";
import React from "react";

export default function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: "Kurslar", url: "/courses", icon: <Package className="h-5 w-5" /> },
    { name: "Kullanıcılar", url: "/users", icon: <Users2 className="h-5 w-5" /> },
    { name: "Profil", url: "/profile", icon: <User className="h-5 w-5" /> },
    { name: "Admin", url: "/admin", icon: <Settings className="h-5 w-5" /> },
  ];

  const tabNavItems = [
    { name: "Favoriler", url: "/profile/favorites", icon: <Package className="h-5 w-5" /> },
    { name: "Kurslarım", url: "/profile/my-courses", icon: <FileChartColumnIncreasingIcon className="h-5 w-5" /> },
    { name: "Bildirimler", url: "/profile/notifications", icon: <NotebookTabsIcon className="h-5 w-5" /> },
    { name: "Profil", url: "/profile", icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      <AdminDashboard children={children} sidebarMenuItems={navItems} tabMenuItems={tabNavItems}/>
    </div>
  );
}
