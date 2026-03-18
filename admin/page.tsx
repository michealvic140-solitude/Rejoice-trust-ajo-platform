"use client";
import { useState, useEffect } from "react";
import { Users, Settings, MessageCircle, Bell, Shield, AlertTriangle, Clock, Wrench } from "lucide-react";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [supportMsgs, setSupportMsgs] = useState<any[]>([]);
  const [seatRequests, setSeatRequests] = useState<any[]>([]);
  const [defaulters, setDefaulters] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("");

  const login = () => {
    if (username === "michaelvictor0014" && password === "goodynessy" && passcode === "081205") {
      setIsAdmin(true);
      loadData();
    } else alert("Wrong admin credentials");
  };

  const loadData = () => {
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
    setGroups(JSON.parse(localStorage.getItem("groups") || "[]"));
    setPayments([{ id: 1, user: "JohnOkon", amount: 50000, status: "pending" }]);
    setSeatRequests([{ id: 1, user: "SarahAde", group: "Elite Monthly", oldSeat: "5", newSeat: "12", reason: "Family emergency" }]);
    setDefaulters([{ id: 1, user: "MichaelOkon", group: "Daily Discipline", daysLate: 3 }]);
    setAuditLogs(JSON.parse(localStorage.getItem("auditLogs") || "[]"));
    setSupportMsgs([{ id: 1, user: "AishaB", msg: "How do I change my seat?" }]);
    setMaintenanceMode(localStorage.getItem("maintenanceMode") === "true");
  };

  const addAuditLog = (action: string) => {
    const log = { time: new Date().toLocaleTimeString(), action };
    const updated = [log, ...auditLogs];
    setAuditLogs(updated);
    localStorage.setItem("auditLogs", JSON.stringify(updated));
  };

  const toggleMaintenance = () => {
    const newMode = !maintenanceMode;
    setMaintenanceMode(newMode);
    localStorage.setItem("maintenanceMode", newMode.toString());
    localStorage.setItem("maintenanceMessage", newMode ? maintenanceMessage || "Server Maintenance in progress – please check back soon" : "");
    addAuditLog(newMode ? "Enabled Server Maintenance Mode" : "Disabled Server Maintenance Mode");
    alert(newMode ? "Maintenance Mode ENABLED" : "Maintenance Mode DISABLED");
  };

  const sendServerUpdate = () => {
    const msg = prompt("Server update message:");
    if (msg) {
      const newAnn = { id: Date.now(), tag: "SERVER UPDATE", text: msg };
      setAnnouncements([...announcements, newAnn]);
      alert("Server update broadcast to homepage");
      addAuditLog(`Sent Server Update: ${msg}`);
    }
  };

  const scheduleDowntime = () => {
    const duration = prompt("Downtime duration (e.g. 30 minutes):");
    alert(`Downtime scheduled for ${duration}`);
    addAuditLog(`Scheduled downtime for ${duration}`);
  };

  // All other functions (promoteToModerator, freezeAccount, approveSeatChange, applyDefaulterPenalty, etc.) are already in the previous version you have.

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass p-12 rounded-3xl max-w-md w-full">
          <h2 className="text-4xl font-bold text-gold text-center mb-8">Admin Login</h2>
          <input placeholder="Username" className="w-full p-4 mb-4 bg-white/10 rounded-xl" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-4 mb-4 bg-white/10 rounded-xl" value={password} onChange={e => setPassword(e.target.value)} />
          <input placeholder="Passcode" className="w-full p-4 mb-8 bg-white/10 rounded-xl" value={passcode} onChange={e => setPasscode(e.target.value)} />
          <button onClick={login} className="w-full bg-red-600 py-5 rounded-2xl text-xl font-bold">ENTER ADMIN DASHBOARD</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-gold mb-8">Admin Dashboard v1.05 – ALL FEATURES ACTIVE</h1>
      <div className="flex flex-wrap gap-3 mb-8 border-b border-gold/30 pb-4">
        {["users","groups","payments","announcements","support","seat-requests","defaulters","audit-logs","maintenance"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-3 rounded-t-xl ${activeTab === t ? "bg-gold text-black" : "glass"}`}>
            {t === "maintenance" ? "Server Maintenance" : t.replace("-"," ").replace(/\b\w/g,c=>c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Users, Groups, Payments, Announcements, Support, Seat Changes, Defaulters, Audit Logs tabs are exactly as in the previous complete version you have. */}

      {/* Server Maintenance Tab */}
      {activeTab === "maintenance" && (
        <div className="glass p-10 rounded-3xl">
          <h3 className="text-3xl mb-8">Server Maintenance Controls</h3>
          <button onClick={toggleMaintenance} className={`w-full py-6 text-xl font-bold rounded-2xl mb-6 ${maintenanceMode ? "bg-red-600" : "bg-green-600"}`}>
            {maintenanceMode ? "DISABLE Maintenance Mode" : "ENABLE Maintenance Mode"}
          </button>
          <button onClick={sendServerUpdate} className="w-full bg-gold text-black py-5 rounded-2xl mb-4">Send Server Update Announcement</button>
          <button onClick={scheduleDowntime} className="w-full bg-amber-600 py-5 rounded-2xl">Schedule Quick Downtime</button>
        </div>
      )}
    </div>
  );
}
