"use client";
import { useState } from "react";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const loginAdmin = () => {
    if (username === "michaelvictor0014" && password === "goodynessy" && passcode === "081205") {
      setLoggedIn(true);
      alert("Admin access granted");
    } else {
      alert("Wrong credentials");
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass p-12 rounded-3xl w-full max-w-md">
          <h2 className="text-4xl font-bold text-gold mb-8 text-center">Admin Panel</h2>
          <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} className="w-full p-4 mb-4 bg-white/10 rounded-xl" />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-4 mb-4 bg-white/10 rounded-xl" />
          <input placeholder="Passcode" value={passcode} onChange={e=>setPasscode(e.target.value)} className="w-full p-4 mb-8 bg-white/10 rounded-xl" />
          <button onClick={loginAdmin} className="w-full bg-red-600 py-5 text-xl font-bold">ENTER ADMIN DASHBOARD</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-10">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl">User Management • Reset Passwords • Edit Trust Score</div>
        <div className="glass p-8 rounded-3xl">Group Management • Edit/Delete Groups • Approve Payments</div>
        <div className="glass p-8 rounded-3xl">Announcements • Create Tagged Posts</div>
        <div className="glass p-8 rounded-3xl">Support Chat • View Uploaded Proofs</div>
      </div>
      <p className="text-center mt-12 text-sm">All features fully interactive in live version</p>
    </div>
  );
}
