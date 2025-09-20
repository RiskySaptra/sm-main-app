import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-6 sm:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}