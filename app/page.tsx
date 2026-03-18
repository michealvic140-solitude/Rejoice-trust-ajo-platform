"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Megaphone } from "lucide-react";

export default function Home() {
  const [leaderboard] = useState([
    { nickname: "AishaB", trust: 98, points: 1240 },
    { nickname: "JohnOkon", trust: 95, points: 980 },
    { nickname: "SarahAde", trust: 92, points: 870 },
  ]);

  const [groups] = useState([
    { id: 1, name: "Elite Monthly Circle", amount: 50000, cycle: "Monthly", slotsLeft: 12 },
  ]);

  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("announcements") || "[]");
    setAnnouncements(
      saved.length
        ? saved
        : [
            {
              tag: "ANNOUNCEMENT",
              date: "3/18/2026",
              title: "Welcome to REJOICE TRUST AJO",
              text: "We are excited to launch our new rotating savings platform. Start saving today!",
            },
            {
              tag: "PROMOTION",
              date: "3/18/2026",
              title: "New Group Available",
              text: "Join our new Platinum Monthly Club and save big! Limited slots available.",
            },
            {
              tag: "SERVER UPDATE",
              date: "3/18/2026",
              title: "System Maintenance",
              text: "Scheduled maintenance on Sunday 2AM - 4AM. Platform may be unavailable.",
            },
          ]
    );
  }, []);

  const getCardStyle = (tag: string) => {
    switch (tag) {
      case "PROMOTION":
        return "bg-gradient-to-br from-purple-950/80 to-purple-900/60 border-purple-500/50 shadow-purple-500/20";
      case "SERVER UPDATE":
        return "bg-gradient-to-br from-amber-950/80 to-amber-900/60 border-amber-600/50 shadow-amber-500/20";
      default:
        return "bg-gradient-to-br from-emerald-950/80 to-emerald-900/60 border-emerald-500/50 shadow-emerald-500/20";
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Floating coins & ₦ */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="coin absolute text-3xl opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        >
          ₦
        </div>
      ))}

      {/* Hero */}
      <div className="text-center py-20">
        <div className="flex items-center justify-center gap-5 mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-br from-gold to-amber-500 rounded-2xl flex items-center justify-center text-black font-black text-5xl shadow-2xl shadow-gold/50">
            RTA
          </div>
          <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent tracking-tight animate-gradient">
            REJOICE TRUST AJO PLATFORM
          </h1>
        </div>
        <p className="text-2xl md:text-3xl max-w-4xl mx-auto text-white/90 animate-fade-in-up delay-200">
          Join trusted savings circles and build financial discipline through structured rotating contributions.
        </p>
      </div>

      {/* Leaderboard – top 3 only */}
      <div className="glass p-12 rounded-3xl mb-16 animate-fade-in-up delay-300">
        <h2 className="text-5xl font-bold flex items-center justify-center gap-5 mb-10">
          <Trophy className="text-gold w-12 h-12" /> Top Trusted Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaderboard.map((u: any, i) => (
            <div
              key={i}
              className="glass p-10 rounded-3xl text-center transform hover:scale-105 transition-all duration-300 shadow-xl shadow-gold/10"
            >
              <div className="text-8xl mb-4">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
              <div className="text-4xl font-bold text-gold mb-3">{u.nickname}</div>
              <div className="text-xl">Trust Score: {u.trust} • Points: {u.points}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements – exact match to your uploaded image style */}
      <div className="mb-20 animate-fade-in-up delay-500">
        <h2 className="text-5xl font-bold flex items-center justify-center gap-5 mb-12">
          <Megaphone className="text-gold w-12 h-12" /> Announcements
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {announcements.map((ann, index) => (
            <div
              key={index}
              className={`glass p-10 rounded-3xl border-l-8 ${getCardStyle(ann.tag)} shadow-2xl transform hover:scale-[1.03] transition-all duration-300`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm uppercase font-extrabold tracking-widest px-5 py-2 rounded-full border border-gold/40 bg-black/30">
                  {ann.tag}
                </span>
                <span className="text-sm opacity-70 font-medium">{ann.date}</span>
              </div>
              <h3 className="text-3xl font-bold mb-5 text-white/95">{ann.title}</h3>
              <p className="text-base opacity-90 leading-relaxed">{ann.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Groups */}
      <h2 className="text-4xl font-bold text-center mb-12">Active Circles</h2>
      <div className="grid md:grid-cols-2 gap-10">
        {groups.map((g: any) => (
          <Link
            href={`/groups/${g.id}`}
            key={g.id}
            className="glass p-12 rounded-3xl glow-gold block transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="text-4xl font-bold mb-4 text-white">{g.name}</div>
            <div className="text-6xl font-extrabold text-gold mb-6">₦{g.amount.toLocaleString()}</div>
            <div className="flex justify-between text-2xl">
              <span>{g.cycle}</span>
              <span className="text-green-400">{g.slotsLeft} slots remaining</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
