import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
  subItems?: NavItem[];
}

interface SidebarProps {
  className?: string;
  items: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ className, items }) => {
  return (
    <div className={`${className} flex flex-col w-64 text-white`}>
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">Matflix</h1>
      </div>
      <div className="flex-grow">
        <nav className="">
          {items.map((item, index) => (
            <div key={index}>
              <Accordion type="single" collapsible className="w-full" defaultValue={`item-${index}`}>
                <AccordionItem className="border-0" value={`item-${index}`}>
                  <AccordionTrigger className="hover:no-underline hover:text-gray-400">{item.name}</AccordionTrigger>
                  <AccordionContent>
                    {item.subItems && (
                      <div className="ml-6">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.url}
                            className="flex items-center px-4 py-2 text-gray-400 hover:text-white"
                          >
                            <subItem.icon className="h-4 w-4 mr-2" />
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
