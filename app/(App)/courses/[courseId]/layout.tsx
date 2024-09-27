"use client";
import Sidebar from "@/components/(App)/Sidebar";
import React from "react";
import { FaBook, FaUser, FaHeart, FaBell, FaCog } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function CourseDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: "Profil Bilgileri", url: "/profile", icon: FaUser },
    { name: "Kurslarım", url: "/profile/my-courses", icon: FaBook },
    { name: "Favori Kurslarım", url: "/profile/favorites", icon: FaHeart },
    { name: "Bildirimler", url: "/profile/notifications", icon: FaBell },
    { name: "Ayarlar", url: "/profile/settings", icon: FaCog },
  ];
  const { topicId, lessonId } = useParams();
  return (
    <div className="flex flex-row h-full">
      <div className="flex-grow">{children}</div>
      {!lessonId && !topicId && (
        <Sidebar
          className="bg-foreground hidden sm:block transition-all duration-300"
          items={navItems}
        />
      )}
    </div>
  );
}
