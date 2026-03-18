"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Megaphone } from "lucide-react";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [groups, setGroups] = useState([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    setLeaderboard([
      { nickname: "AishaB", trust: 98, points: 1240 },
      { nickname: "JohnOkon", trust: 95, points: 980 },
      { nickname: "SarahAde", trust: 92, points: 870 }
    ]);
    setGroups([{ id: 1, name: "Elite Monthly Circle", amount: 50000, cycle: "Monthly", slotsLeft: 12 }]);

    const saved = JSON.parse(localStorage.getItem("announcements") || "[]");
    setAnnouncements(saved.length ? saved : [
      { tag: "ANNOUNCEMENT", date: "3/18/2026", title: "Welcome to REJOICE TRUST AJO", text: "We are excited to launch our new rotating savings platform. Start saving today!" },
      { tag: "PROMOTION", date: "3/18/2026", title: "New Group Available", text: "Join our new Platinum Monthly Club and save big! Limited slots available." },
      { tag: "SERVER UPDATE", date: "3/18/2026", title: "System Maintenance", text: "Scheduled maintenance on Sunday 2AM - 4AM. Platform may be unavailable." }
    ]);
  }, []);

  const getStyle = (tag: string) => {
    if (tag === "PROMOTION") return "border-l-purple-500 bg-purple-950/80";
    if (tag === "SERVER UPDATE") return "border-l-amber-600 bg-amber-950/80";
    return "border-l-emerald-500 bg-emerald-950/80";
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto relative">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="coin" style={{ left: `\( {Math.random() * 100}%`, top: ` \){Math.random() * 40}%`, animationDelay: `${i * 0.4}s` }}>₦</div>
      ))}

      <div className="text-center py-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-black font-bold text-4xl">RTA</div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent tracking-tight">REJOICE TRUST AJO PLATFORM</h1>
        </div>
        <p className="text-2xl">Join trusted savings circles and build financial discipline through structured rotating contributions.</p>
      </div>

      {/* Leaderboard */}
      <div className="glass p-10 rounded-3xl mb-12">
        <h2 className="text-4xl font-bold flex items-center gap-4 mb-8"><Trophy className="text-gold" /> Top Trusted Members</h2>
        {/* (same leaderboard cards as previous version) */}
      </div>

      {/* ANNOUNCEMENTS – EXACT MATCH TO YOUR UPLOADED IMAGE */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8"><Megaphone className="text-gold" /> Announcements</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {announcements.map((ann, i) => (
            <div key={i} className={`glass p-8 rounded-3xl border-l-4 ${getStyle(ann.tag)}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs uppercase font-bold tracking-widest px-4 py-1 rounded border border-gold/50">{ann.tag}</span>
                <span className="text-xs opacity-70">{ann.date}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{ann.title}</h3>
              <p className="text-sm opacity-90">{ann.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Groups */}
      <h2 className="text-3xl mb-6">Active Circles</h2>
      {/* (same group cards as previous version) */}
    </div>
  );
}
