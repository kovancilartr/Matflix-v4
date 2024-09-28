import React from "react";
import { AdminDashboard } from "@/components/(Global)/GlobalDashboard";
import { Home, Package, Users2 } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const navItems = [
    { name: "Ana Sayfa", url: "/admin", icon: <Home className="h-5 w-5" />},
    { name: "Kurslar", url: "/admin/courses", icon: <Package className="h-5 w-5" /> },
    { name: "Kullanıcılar", url: "/admin/users", icon: <Users2 className="h-5 w-5" /> },
  ];


  return (
    <div className="w-full h-screen flex flex-col">
      <AdminDashboard children={children} sidebarMenuItems={navItems} />
    </div>
  );
}
