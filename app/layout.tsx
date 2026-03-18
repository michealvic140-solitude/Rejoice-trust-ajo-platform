import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-obsidian relative">
        <Navbar />
        {children}
        <footer className="glass fixed bottom-0 left-0 right-0 py-3 text-center text-xs border-t border-gold/30">
          REJOICE TRUST AJO PLATFORM v1.05 • Support: Email | WhatsApp | SMS | Call (Admin editable)
        </footer>
      </body>
    </html>
  );
}
