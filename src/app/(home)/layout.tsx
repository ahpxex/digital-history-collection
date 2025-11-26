import { HomeNavbar } from "@/features/home/components/HomeNavbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HomeNavbar />
      <main className="flex-grow flex flex-col">{children}</main>
    </div>
  );
}
