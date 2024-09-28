import Link from "next/link";
import React from "react";
import { TabNavItem } from "@/types/types";

const NavItem: React.FC<TabNavItem> = ({ name, url, icon, active }) => {
  return (
    <Link href={url}>
      <div className="text-white font-bold hover:text-red-special hover:scale-110 transition cursor-pointer">
        {name}
      </div>
    </Link>
  );
};

export default NavItem;
