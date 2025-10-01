import Sidebar from "@/componentes/Sidebar";
import NavBar from "@/componentes/NavBar";

export default function JovenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <NavBar />
            <main className="flex-1 p-6 bg-base-200 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      );
    }
