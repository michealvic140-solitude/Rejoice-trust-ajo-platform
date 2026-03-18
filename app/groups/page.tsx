"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Groups() {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("groups") || '[{"id":1,"name":"Elite Monthly Circle","amount":50000,"cycle":"Monthly","slotsLeft":12},{"id":2,"name":"Daily Discipline","amount":5000,"cycle":"Daily","slotsLeft":3}]');
    setGroups(saved);
  }, []);

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 text-center">All Savings Circles</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {groups.map(g => (
          <Link href={`/groups/${g.id}`} key={g.id} className="glass p-10 rounded-3xl glow-gold block">
            <div className="text-3xl font-bold">{g.name}</div>
            <div className="text-6xl font-bold text-gold my-4">₦{g.amount.toLocaleString()}</div>
            <div className="flex justify-between text-xl"><span>{g.cycle}</span><span>{g.slotsLeft} slots remaining</span></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
