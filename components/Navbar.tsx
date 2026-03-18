"use client";
import Link from "next/link";
import { Bell, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("currentUser"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gold/30 px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-black/40">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-gradient-to-br from-gold to-amber-600 rounded-full flex items-center justify-center text-black font-black text-3xl shadow-lg shadow-gold/40">
          RTA
        </div>
        <div className="text-3xl font-extrabold bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent tracking-tight animate-pulse">
          REJOICE TRUST AJO PLATFORM
        </div>
      </div>

      <div className="flex items-center gap-10 text-base font-medium">
        <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
        <Link href="/groups" className="hover:text-gold transition-colors duration-300">Groups</Link>

        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="hover:text-gold transition-colors duration-300">Dashboard</Link>
            <Link href="/admin" className="hover:text-gold transition-colors duration-300 font-semibold">Admin</Link>
            <Bell className="w-6 h-6 cursor-pointer hover:text-gold transition-colors" />
            <Link href="/profile">
              <User className="w-6 h-6 hover:text-gold transition-colors" />
            </Link>
            <button onClick={handleLogout}>
              <LogOut className="w-6 h-6 text-red-400 hover:text-red-300 transition-colors" />
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gold transition-colors">Login</Link>
            <Link href="/register" className="bg-gradient-to-r from-gold to-amber-500 text-black px-8 py-3 rounded-full font-bold hover:from-amber-400 hover:to-gold transition-all shadow-lg shadow-gold/30">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
