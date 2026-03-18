"use client";

import { useState, useEffect } from "react";

export default function SlotGrid({ groupId, onJoin }: { groupId: number; onJoin: (slots: number[]) => void }) {
  const [slots, setSlots] = useState(Array(100).fill("available"));
  const [locked, setLocked] = useState<number | null>(null);
  const [timer, setTimer] = useState(600);

  useEffect(() => {
    if (locked !== null) {
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            setLocked(null);
            return 600;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [locked]);

  const toggleSlot = (i: number) => {
    if (slots[i] === "taken") return;
    if (locked === i) {
      setLocked(null);
      setTimer(600);
    } else {
      setLocked(i);
      setTimer(600);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-10 gap-2 mb-6">
        {slots.map((status, i) => (
          <button
            key={i}
            onClick={() => toggleSlot(i)}
            className={`h-12 rounded-xl text-xs font-bold transition-all ${
              status === "taken" ? "bg-red-600" :
              locked === i ? "bg-yellow-400 animate-pulse" :
              "bg-green-600 hover:bg-green-500"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {locked !== null && <p className="text-gold text-center">Slot locked for {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</p>}
      <button onClick={() => onJoin(locked !== null ? [locked] : [])} className="w-full bg-gold text-black py-4 rounded-2xl mt-6 font-bold">
        Confirm Selected Slots
      </button>
    </div>
  );
}
