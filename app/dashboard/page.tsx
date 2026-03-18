"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setUser(u);
  }, []);

  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold mb-10 text-gold">Welcome back, {user?.username}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-3xl text-center">Active Slots<br /><span className="text-6xl font-bold text-gold">3</span></div>
        <div className="glass p-8 rounded-3xl text-center">Total Paid<br /><span className="text-6xl font-bold text-gold">₦145,000</span></div>
        <div className="glass p-8 rounded-3xl text-center">Upcoming Payout<br /><span className="text-6xl font-bold text-gold">Slot #7</span></div>
      </div>
    </div>
  );
}
