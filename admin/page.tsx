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

  // User Management
  const updateUser = (id: number, field: string, value: any) => {
    const updated = users.map(u => u.id === id ? { ...u, [field]: value } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const banUser = (id: number) => {
    alert(`User ${id} banned`);
    const updated = users.map(u => u.id === id ? { ...u, isBanned: true } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    addAuditLog(`Banned user ${id}`);
  };

  const promoteToModerator = (id: number) => {
    const updated = users.map(u => u.id === id ? { ...u, role: "Moderator" } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    addAuditLog(`Promoted user ${id} to Moderator`);
    alert("User promoted to Moderator");
  };

  const freezeAccount = (id: number) => {
    const updated = users.map(u => u.id === id ? { ...u, isFrozen: true } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    addAuditLog(`Froze account of user ${id}`);
    alert("Account frozen");
  };

  // Group Management
  const toggleRegistration = (id: number) => {
    alert("Registration toggled for group " + id);
    addAuditLog(`Toggled registration for group ${id}`);
  };

  const deleteGroup = (id: number) => {
    if (confirm("Delete group?")) {
      const updated = groups.filter(g => g.id !== id);
      setGroups(updated);
      localStorage.setItem("groups", JSON.stringify(updated));
      addAuditLog(`Deleted group ${id}`);
    }
  };

  // Payments
  const approvePayment = (id: number) => {
    alert("Payment approved – timer stopped");
    setPayments(p => p.map(pay => pay.id === id ? { ...pay, status: "approved" } : pay));
    addAuditLog(`Approved payment ${id}`);
  };

  // Announcements
  const createAnnouncement = () => {
    const tag = prompt("Tag: PROMOTION / ANNOUNCEMENT / SECURITY ALERT / SERVER UPDATE");
    const text = prompt("Announcement text");
    if (text) {
      const newAnn = { id: Date.now(), tag, text, date: new Date().toLocaleDateString() };
      const updated = [...announcements, newAnn];
      setAnnouncements(updated);
      localStorage.setItem("announcements", JSON.stringify(updated));
      alert("Announcement published to homepage");
      addAuditLog(`Created ${tag} announcement`);
    }
  };

  // Seat Changes
  const approveSeatChange = (requestId: number) => {
    alert("Seat change approved – updated in group");
    setSeatRequests(seatRequests.filter(r => r.id !== requestId));
    addAuditLog(`Approved seat change request #${requestId}`);
  };

  const declineSeatChange = (requestId: number) => {
    const reason = prompt("Decline reason?");
    alert(`Request declined: ${reason}`);
    setSeatRequests(seatRequests.filter(r => r.id !== requestId));
    addAuditLog(`Declined seat change request #${requestId}`);
  };

  // Defaulters
  const applyDefaulterPenalty = (id: number) => {
    alert("Penalty applied – trust score reduced by 20");
    const updatedUsers = users.map(u => u.id === id ? { ...u, trustScore: Math.max(0, (u.trustScore || 50) - 20) } : u);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    addAuditLog(`Applied defaulter penalty to user ${id}`);
  };

  // Maintenance
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
      const newAnn = { id: Date.now(), tag: "SERVER UPDATE", text: msg, date: new Date().toLocaleDateString() };
      const updated = [...announcements, newAnn];
      setAnnouncements(updated);
      localStorage.setItem("announcements", JSON.stringify(updated));
      alert("Server update broadcast to homepage");
      addAuditLog(`Sent Server Update: ${msg}`);
    }
  };

  const scheduleDowntime = () => {
    const duration = prompt("Downtime duration (e.g. 30 minutes):");
    alert(`Downtime scheduled for ${duration}`);
    addAuditLog(`Scheduled downtime for ${duration}`);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass p-12 rounded-3xl max-w-md w-full">
          <h2 className="text-4xl font-bold text-gold text-center mb-8">Admin Login</h2>
          <input placeholder="Username" className="w-full p-4 mb-4 bg-white/10 rounded-xl" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-4 mb-4 bg-white/10 rounded-xl" value={password} onChange={e => setPassword(e.target.value)} />
          <input placeholder="Passcode 081205" className="w-full p-4 mb-8 bg-white/10 rounded-xl" value={passcode} onChange={e => setPasscode(e.target.value)} />
          <button onClick={login} className="w-full bg-red-600 py-5 rounded-2xl text-xl font-bold">ENTER ADMIN DASHBOARD</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-gold mb-8 flex items-center gap-4">
        <Settings className="w-10 h-10" /> Admin Dashboard v1.05 – ALL FEATURES ACTIVE
      </h1>

      <div className="flex flex-wrap gap-3 mb-8 border-b border-gold/30 pb-4">
        {["users", "groups", "payments", "announcements", "support", "seat-requests", "defaulters", "audit-logs", "maintenance"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-t-xl font-medium ${activeTab === tab ? "bg-gold text-black" : "glass hover:bg-white/10"}`}
          >
            {tab === "seat-requests" ? "Seat Changes" : tab === "audit-logs" ? "Audit Logs" : tab === "maintenance" ? "Server Maintenance" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl mb-6">User Management</h3>
          {users.map(u => (
            <div key={u.id} className="glass p-6 mb-4 flex flex-wrap gap-4 items-center">
              <span className="font-bold text-lg">{u.username}</span>
              <input type="number" defaultValue={u.trustScore || 50} className="bg-white/10 w-24 p-2 rounded" onBlur={e => updateUser(u.id, "trustScore", Number(e.target.value))} />
              <label><input type="checkbox" defaultChecked={u.isVIP} onChange={e => updateUser(u.id, "isVIP", e.target.checked)} /> VIP</label>
              <button onClick={() => promoteToModerator(u.id)} className="bg-purple-600 px-5 py-2 rounded">Promote Moderator</button>
              <button onClick={() => freezeAccount(u.id)} className="bg-orange-600 px-5 py-2 rounded">Freeze Account</button>
              <button onClick={() => banUser(u.id)} className="bg-red-600 px-5 py-2 rounded">Ban</button>
            </div>
          ))}
        </div>
      )}

      {/* GROUPS TAB */}
      {activeTab === "groups" && (
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl mb-6">Group Management</h3>
          {groups.map(g => (
            <div key={g.id} className="glass p-6 mb-4 flex justify-between">
              <div>{g.name} – ₦{g.amount}</div>
              <div className="flex gap-3">
                <button onClick={() => toggleRegistration(g.id)} className="bg-green-600 px-4 py-1 rounded">Toggle Reg</button>
                <button onClick={() => deleteGroup(g.id)} className="bg-red-600 px-4 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAYMENTS TAB */}
      {activeTab === "payments" && (
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl mb-6">Payment Approvals</h3>
          {payments.map(p => (
            <div key={p.id} className="glass p-6 mb-4 flex justify-between">
              <div>{p.user} – ₦{p.amount}</div>
              <div>
                <button onClick={() => approvePayment(p.id)} className="bg-green-600 px-6 py-2 rounded mr-3">Approve</button>
                <button className="bg-red-600 px-6 py-2 rounded">Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ANNOUNCEMENTS TAB */}
      {activeTab === "announcements" && (
        <div className="glass p-8 rounded-3xl">
          <button onClick={createAnnouncement} className="bg-gold text-black px-8 py-4 rounded-2xl mb-8">+ Create New Announcement</button>
          {announcements.map(a => (
            <div key={a.id} className="glass p-6 mb-4">
              <strong>{a.tag}</strong>: {a.text}
            </div>
          ))}
        </div>
      )}

      {/* SUPPORT TAB */}
      {activeTab === "support" && (
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl mb-6 flex items-center gap-3"><MessageCircle /> Support Messages</h3>
          {supportMsgs.map(m => (
            <div key={m.id} className="glass p-6 mb-4">
              <strong>{m.user}:</strong> {m.msg}
              <textarea placeholder="Reply here..." className="w-full mt-4 p-4 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* SEAT CHANGES TAB */}
      {activeTab === "seat-requests" && (
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl mb-6 flex items-center gap-3"><Clock /> Pending Seat Change Requests</h3>
          {seatRequests.map(req => (
            <div key={req.id} className="glass p-6 mb-4">
              <p><strong>{req.user}</strong> wants to change from seat {req.oldSeat} → {req.newSeat} in {req.group}</p>
              <p className="text-sm opacity-70 mt-2">Reason: {req.reason}</p>
              <div className="flex gap-4 mt-6">
                <button onClick={() => approveSeatChange(req.id)} className="bg-green-600 px-8 py-3 rounded-xl">Approve</button>
                <button onClick={() => declineSeatChange(req.id)} className="bg-red-600 px-8 py-3 rounded-xl">Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DEFAULTERS TAB */}
      {activeTab === "defaulters" && (
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl mb-6 flex items-center gap-3"><AlertTriangle /> Defaulters</h3>
          {defaulters.map(d => (
            <div key={d.id} className="glass p-6 mb-4 flex justify-between">
              <div>{d.user} – {d.group} ({d.daysLate} days late)</div>
              <button onClick={() => applyDefaulterPenalty(d.id)} className="bg-red-600 px-8 py-3 rounded-xl">Apply Penalty (-20 Trust)</button>
            </div>
          ))}
        </div>
      )}

      {/* AUDIT LOGS TAB */}
      {activeTab === "audit-logs" && (
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl mb-6">Full Audit Logs</h3>
          <div className="max-h-96 overflow-auto space-y-3">
            {auditLogs.length ? auditLogs.map((log, i) => (
              <div key={i} className="glass p-4 text-sm">
                <span className="text-gold">{log.time}</span> – {log.action}
              </div>
            )) : <p>No logs yet – actions will appear here instantly</p>}
          </div>
        </div>
      )}

      {/* SERVER MAINTENANCE TAB */}
      {activeTab === "maintenance" && (
        <div className="glass p-10 rounded-3xl">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-4"><Wrench className="text-gold" /> Server Maintenance Controls</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-2xl">
              <h4 className="text-xl mb-6">Maintenance Mode</h4>
              <button onClick={toggleMaintenance} className={`w-full py-6 text-xl font-bold rounded-2xl mb-4 ${maintenanceMode ? "bg-red-600" : "bg-green-600"}`}>
                {maintenanceMode ? "DISABLE Maintenance Mode" : "ENABLE Maintenance Mode"}
              </button>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h4 className="text-xl mb-6">Quick Actions</h4>
              <button onClick={sendServerUpdate} className="w-full bg-gold text-black py-5 rounded-2xl mb-4">Send Server Update Announcement</button>
              <button onClick={scheduleDowntime} className="w-full bg-amber-600 py-5 rounded-2xl">Schedule Quick Downtime</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
