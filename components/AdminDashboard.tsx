"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Settings, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import AccountMenu from "./(App)/AccountMenu";

interface SideNavItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface AdminDashboardProps {
  children: React.ReactNode;
  sidebarMenuItems: SideNavItem[];
}

export function AdminDashboard({
  children,
  sidebarMenuItems,
}: AdminDashboardProps) {
  const pathnames = usePathname().split("/").filter(Boolean);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
      } else {
        setSidebarExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside
        className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-slate-950 transition-all duration-300 ${
          sidebarExpanded ? "w-64" : "w-14"
        }`}
      >
        <div className="flex h-[54px] items-center border-b border-slate-700 px-3 justify-evenly">
          {sidebarExpanded && (
            <div className="flex items-center justify-center">
              <img src="/images/logo.png" alt="logo" className="lg:h-8 h-6" />
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-4 p-4 justify-center items-center">
          {sidebarMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors hover:bg-muted hover:text-foreground ${
                sidebarExpanded ? "w-full" : ""
              }`}
            >
              {item.icon}
              {sidebarExpanded && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="flex mt-auto flex-col gap-1 p-4 justify-center items-center">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors hover:bg-muted hover:text-foreground ${
              sidebarExpanded ? "w-full" : ""
            }`}
          >
            <Settings className="h-4 w-4" />
            {sidebarExpanded && <span>Ayarlar</span>}
          </Link>
          <Button
            variant="link"
            size="default"
            className={`flex justify-start items-start gap-3 rounded-lg px-3 py-2 text-white transition-colors hover:bg-muted hover:text-foreground hover:no-underline ${
              sidebarExpanded ? "w-full" : ""
            }`}
            onClick={toggleSidebar}
          >
            {sidebarExpanded ? (
              <div className="flex gap-2">
                <X className="h-5 w-5" />
                <span>Menüyü Küçült</span>
              </div>
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
      </aside>
      <div
        className={`flex flex-col transition-all duration-300 ${
          sidebarExpanded ? "sm:ml-64" : "sm:ml-14"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-slate-950 px-4 sm:h-auto  sm:bg-slate-950 sm:px-6 py-2">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-white hover:text-gray-300"
                >
                  <Link href={`/` + pathnames[0]}>
                    {pathnames[0] === "admin" ? "Admin" : " "}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white" />
              <BreadcrumbItem>
                <BreadcrumbPage className="cursor-default text-white">
                  {pathnames[1] === "courses"
                    ? "Kurslar"
                    : pathnames[1] === "users"
                    ? "Kullanıcılar"
                    : " "}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <AccountMenu />
        </header>
        <main className="w-full h-full">
          {/* İçerik Bölümü */}
          {children}
        </main>
      </div>
    </div>
  );
}
