"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "", age: "", dob: "", phone: "",
    stateOrigin: "", lga: "", currentState: "", address: "", username: "", email: "", password: ""
  });
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ ...form, id: Date.now(), trustScore: 50, nickname: form.username, profilePic: "" });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-2xl mx-auto glass p-10 rounded-3xl">
        <h2 className="text-4xl font-bold text-gold mb-8 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {Object.keys(form).map(key => (
            <input key={key} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} value={form[key as keyof typeof form]} onChange={(e) => setForm({...form, [key]: e.target.value})} className="p-4 bg-white/10 rounded-xl border border-gold/30" required />
          ))}
          <button type="submit" className="col-span-2 bg-gold text-black py-4 rounded-2xl text-lg font-bold glow-gold">Register Now</button>
        </form>
      </div>
    </div>
  );
}
