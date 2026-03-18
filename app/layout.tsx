import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const maintenance = typeof window !== "undefined" ? localStorage.getItem("maintenanceMode") === "true" : false;
  const message = typeof window !== "undefined" ? localStorage.getItem("maintenanceMessage") || "" : "";

  return (
    <html lang="en">
      <body className="min-h-screen bg-obsidian relative">
        <Navbar />
        {maintenance && (
          <div className="bg-red-600 text-white text-center py-3 font-bold fixed top-[72px] left-0 right-0 z-40">
            {message || "Server Maintenance in progress – please check back soon"}
          </div>
        )}
        {children}
        <footer className="glass fixed bottom-0 w-full py-3 text-center text-xs border-t border-gold/30">
          REJOICE TRUST AJO PLATFORM v1.05 • Support: Email | WhatsApp | SMS | Call (Admin editable)
        </footer>
      </body>
    </html>
  );
}
