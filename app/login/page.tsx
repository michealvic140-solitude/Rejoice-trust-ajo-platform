"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => (u.email === email || u.username === email) && u.password === password);
    
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful!");
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="glass p-10 rounded-3xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8 text-gold">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="text" placeholder="Email or Username" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 bg-white/10 rounded-xl border border-gold/30" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-white/10 rounded-xl border border-gold/30" required />
          <button type="submit" className="w-full bg-gold text-black py-4 rounded-2xl font-bold text-lg glow-gold">Login</button>
        </form>
        <p className="text-center mt-6 text-sm">Forgot password? Admin will reset it.</p>
      </div>
    </div>
  );
}
