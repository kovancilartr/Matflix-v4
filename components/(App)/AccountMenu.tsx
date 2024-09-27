import React, { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LogOutIcon, Settings, UserIcon } from "lucide-react";

const AccountMenu = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
    window.location.reload();
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      
    }
  }, [session]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src="/images/default-blue.png"
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-950 text-white p-2" align="end">
        <div className="flex flex-col items-center cursor-default">
          <div className="flex flex-row gap-x-1">
            <span>{session?.user?.name}</span>
            <span>{session?.user?.surname}</span>
          </div>
          <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
          <div className="flex flex-row gap-x-2">
            <DropdownMenuLabel
              className={`font-bold border-2 border-gray-200 rounded-xl ${
                session?.user?.role === "admin"
                  ? "text-red-500"
                  : "text-orange-500"
              }`}
            >
              {session?.user?.role === "admin" ? "Admin" : "Öğrenci"}
            </DropdownMenuLabel>
            <DropdownMenuLabel
              className={`font-bold border-2 border-gray-200 rounded-xl ${
                session?.user?.status === "active"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {session?.user?.status === "active" ? "Aktif" : "Pasif"}
            </DropdownMenuLabel>
          </div>
        </div>

        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem className="flex items-center justify-center w-full cursor-pointer">
            <UserIcon className="h-4 w-4 mr-2" />
            Profil Ayarları
          </DropdownMenuItem>
        </Link>
        {session?.user?.role === "admin" && (
          <Link href="/admin">
            <DropdownMenuItem className="flex items-center justify-center w-full cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              Admin Paneli
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center justify-center w-full cursor-pointer"
          onClick={handleLogout}
        >
          <LogOutIcon className="h-4 w-4 mr-2" />
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
