import Billboard from "@/components/(App)/Billboard";
import HomeNavbar from "@/components/(App)/HomeNavbar";

export default function Home() {
  const navItems = [
    { name: "Kurslar", url: "/courses" },
    { name: "Kullanıcılar", url: "/users" },
    { name: "Admin", url: "/admin" },
  ];

  return (
    <div>
      <HomeNavbar items={navItems}/>
      <main className="flex flex-col h-full items-center justify-center">
        <Billboard />
      </main>
    </div>
  );
}
