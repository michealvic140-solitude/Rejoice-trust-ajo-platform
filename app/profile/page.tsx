"use client";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setUser(u);
    const savedLogs = JSON.parse(localStorage.getItem("actionLogs") || "[]");
    setLogs(savedLogs);
  }, []);

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <div className="glass p-10 rounded-3xl">
        <h2 className="text-4xl font-bold mb-8">My Profile</h2>
        {user && (
          <div className="space-y-6">
            <p><strong>Name:</strong> {user.firstName} {user.middleName} {user.lastName}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Trust Score:</strong> {user.trustScore}</p>
          </div>
        )}
        <h3 className="text-2xl mt-12 mb-4">Action Logs</h3>
        <div className="glass p-6 max-h-96 overflow-auto">
          {logs.length ? logs.map((log, i) => <p key={i} className="py-1">• {log}</p>) : <p>No logs yet</p>}
        </div>
      </div>
    </div>
  );
}
