"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function CountdownTimer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTime(`\( {hours.toString().padStart(2,"0")}: \){mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`);
    };
    update();
    const int = setInterval(update, 1000);
    return () => clearInterval(int);
  }, []);

  return <div className="text-6xl font-mono text-gold tracking-widest">{time}</div>;
}
