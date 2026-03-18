"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SlotGrid from "../../components/SlotGrid";
import CountdownTimer from "../../components/CountdownTimer";
import { MessageCircle } from "lucide-react";

export default function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [paymentProof, setPaymentProof] = useState("");

  useEffect(() => {
    const g = { id, name: "Elite Monthly Circle", amount: 50000, cycle: "Monthly" };
    setGroup(g);
    setMessages([{ user: "Admin", text: "Group is now LIVE!" }]);
  }, [id]);

  const joinGroup = (slots: number[]) => {
    alert(`You selected seats: ${slots.join(", ")}`);
    const logs = JSON.parse(localStorage.getItem("actionLogs") || "[]");
    logs.push(`Joined group ${id} - seats ${slots}`);
    localStorage.setItem("actionLogs", JSON.stringify(logs));
  };

  const sendMessage = () => {
    if (!chatInput) return;
    setMessages([...messages, { user: "You", text: chatInput }]);
    setChatInput("");
  };

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      {group && (
        <>
          <div className="glass p-10 rounded-3xl mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-5xl font-bold text-gold">{group.name}</h1>
                <p className="text-3xl">₦{group.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-70">Daily Countdown (GMT+1)</p>
                <CountdownTimer />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Slot Grid */}
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl mb-6">Select Your Seats (1-100)</h3>
              <SlotGrid groupId={Number(id)} onJoin={joinGroup} />
            </div>

            {/* Members List + Chat */}
            <div>
              <div className="glass p-8 rounded-3xl mb-8">
                <h3 className="text-2xl mb-6">Members (Payout Order)</h3>
                <div className="space-y-3 text-sm">
                  <div>1. JOHN SMITH</div>
                  <div>2. Sarah Ade</div>
                  <div>3. JOHN SMITH</div>
                  <div>4. Michael Okon</div>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="flex items-center gap-3 text-2xl mb-6"><MessageCircle /> Group Chat</h3>
                <div className="h-80 overflow-auto bg-black/30 p-4 rounded-xl mb-4 space-y-3">
                  {messages.map((m, i) => <div key={i}><strong>{m.user}:</strong> {m.text}</div>)}
                </div>
                <div className="flex gap-3">
                  <input value={chatInput} onChange={e => setChatInput(e.target.value)} className="flex-1 p-4 bg-white/10 rounded-xl" placeholder="Type message..." />
                  <button onClick={sendMessage} className="bg-gold text-black px-8 rounded-xl">Send</button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="glass p-10 rounded-3xl mt-8">
            <h3 className="text-2xl mb-6">Make Payment</h3>
            <input type="file" onChange={(e) => setPaymentProof("uploaded")} className="mb-4" />
            <button onClick={() => alert("Payment proof submitted – awaiting admin approval")} className="bg-green-600 w-full py-4 rounded-2xl">I Have Made Payment</button>
          </div>
        </>
      )}
    </div>
  );
}
