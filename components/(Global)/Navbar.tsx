"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavbarProps } from "@/types/types";
import NavItem from "./NavItem";
import AccountMenu from "./AccountMenu";

const Navbar: React.FC<NavbarProps> = ({ items, className }) => {
  const { data: session, status } = useSession();

  useEffect(() => {}, []);

  return (
    <nav
      className={`flex flex-row w-full items-center h-[71px] sticky top-0 z-20 px-4 py-4 transition backdrop-blur shadow-lg ${className}`}
    >
      {/* Logo */}
      <div className="flex flex-row items-center">
        <img src="/images/logo.png" alt="logo" className="lg:h-8 h-6" />
      </div>
      {/* Nav Items */}
      <div className="lg:flex flex-row hidden gap-7 ml-12">
        {items.map((item, index) => (
          <NavItem
            key={index}
            name={item.name}
            url={item.url}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Right Side */}
      <div className="flex flex-row ml-auto gap-7 items-center text-white">
        <div className="flex flex-row relative ml-auto gap-2 items-center">
          {status === "authenticated" ? (
            <AccountMenu />
          ) : (
            <Button className="bg-red-900 hover:bg-red-700">
              <Link href="/sign-in">Giriş Yap</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
