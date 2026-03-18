"use client";
import Link from "next/link";
import { Bell, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [logged, setLogged] = useState(false);
  useEffect(() => setLogged(!!localStorage.getItem("currentUser")), []);

  return (
    <nav className="glass fixed top-0 z-50 w-full px-8 py-4 flex items-center justify-between border-b border-gold/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black font-bold text-3xl">RTA</div>
        <div className="text-3xl font-bold tracking-tight text-gold">REJOICE TRUST AJO PLATFORM</div>
      </div>
      <div className="flex items-center gap-8 text-sm">
        <Link href="/" className="hover:text-gold">Home</Link>
        <Link href="/groups" className="hover:text-gold">Groups</Link>
        {logged ? (
          <>
            <Link href="/dashboard" className="hover:text-gold">Dashboard</Link>
            <Link href="/admin" className="hover:text-gold font-medium">Admin</Link>
            <Bell className="w-5 h-5" />
            <Link href="/profile"><User className="w-5 h-5" /></Link>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }}><LogOut className="w-5 h-5 text-red-400" /></button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register" className="bg-gold text-black px-6 py-2 rounded-full">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
