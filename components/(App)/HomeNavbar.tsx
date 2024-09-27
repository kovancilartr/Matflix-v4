"use client";

import React, { useCallback, useEffect, useState } from "react";
import NavItem from "./NavItem";
import AccountMenu from "./AccountMenu";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

interface NavItem {
  name: string;
  url: string;
}

interface HomeNavbarProps {
  items: NavItem[];
}

const HomeNavbar: React.FC<HomeNavbarProps> = ({ items }) => {
  const [showBack, setShowBack] = useState(false);
  const [accountMenuItem, setAccountMenu] = useState(false);
  const topOffset = 65;


  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= topOffset) {
        setShowBack(true);
      } else {
        setShowBack(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-20 border-b-2 border-gray-800">
      <div
        className={`flex flex-row px-4 py-4 transition ${
          showBack ? "bg-zinc-950 bg-opacity-95" : ""
        }`}
      >
        <img src="/images/logo.png" alt="logo" className="lg:h-8 h-6" />
        <div className="lg:flex flex-row hidden gap-7 ml-12">
          {items.map((item, index) => (
            <NavItem key={index} name={item.name} url={item.url} />
          ))}
        </div>

        <div></div>

        <div className="flex flex-row ml-auto gap-7 items-center text-white">
          <div className="cursor-pointer">
            <h1>Matflix</h1>
          </div>
          <div className="cursor-pointer">
            <h1>Bize Ulaşın</h1>
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row relative ml-auto gap-2 items-center"
          >
            {status === "authenticated" ? (
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg overflow-hidden">
                <img src="/images/default-red.png" alt="profile" className="cursor-pointer" />
                <AccountMenu visible={accountMenuItem} />
              </div>
            ) : (
              <Button className="bg-red-900 hover:bg-red-700">
                <Link href="/sign-in">Giriş Yap</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
