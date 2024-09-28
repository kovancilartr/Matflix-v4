import Billboard from "@/components/(Global)/Billboard";
import HomeNavbar from "@/components/(Global)/HomeNavbar";

export default function Home() {
  const navItems = [
    { name: "Kurslar", url: "/courses" },
    { name: "Profil Bilgileri", url: "/profile" },
    { name: "Admin", url: "/admin" },
  ];

  return (
    <div>
      <HomeNavbar items={navItems} />
      <main className="flex flex-col h-full items-center justify-center">
        <Billboard />
      </main>
    </div>
  );
}
