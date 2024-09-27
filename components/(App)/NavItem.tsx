import Link from "next/link";
import React from "react";

interface itemProps {
  name: string;
  url: string;
  active?: boolean;
}
const NavItem: React.FC<itemProps> = ({ name, url, active }) => {
  
  return (
    <Link href={url}>
      <div
        className="text-white font-bold hover:text-red-special hover:scale-110 transition cursor-pointer"
      >
        {name}
      </div>
    </Link>
  );
};

export default NavItem;
