import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import alexRiversImg from "@/imports/Frame2136/4e931f8464882c0554a71d344f3a49896cb2c224.png";
import { subsData, paymentHistory } from "@/lib/mock";

export default function SubscriptionDetailPage() {
  const { id }   = useParams<{ id: string }>();
  const navigate  = useNavigate();
  const sub      = subsData.find((s) => s.id === Number(id)) ?? subsData[0];
  const isAlex   = sub.id === 1;

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Breadcrumb + actions */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate("/subscriptions")} className="flex items-center gap-[8px] text-[#4c4546] text-[13px] font-geist hover:text-[#151c27] transition-colors">
          <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-[rgba(220,226,243,0.5)] hover:bg-[rgba(220,226,243,0.8)] transition-colors">
            <ArrowLeft size={14} color="#4c4546" />
          </div>
        </button>
        <div className="flex items-center gap-[10px]">
          <button className="px-[20px] py-[8px] rounded-[8px] text-[13px] font-geist font-medium text-[#4c4546] border border-[rgba(207,196,197,0.4)] hover:bg-[rgba(220,226,243,0.3)] transition-colors">
            Refund
          </button>
          <button className="px-[20px] py-[8px] rounded-[8px] text-[13px] font-geist font-medium text-[#c0392b] border border-[rgba(192,57,43,0.3)] bg-[rgba(255,240,240,0.6)] hover:bg-[rgba(255,220,220,0.6)] transition-colors">
            Cancel Subscription
          </button>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-[#151c27] text-[32px] tracking-[-0.8px] font-geist leading-[40px]">Subscription Details</h1>
        <p className="text-[#4c4546] text-[13px] font-geist leading-[20px] mt-[2px]">Manage billing and tier access for user {sub.name}.</p>
      </div>

      <div>
        <button className="px-[28px] py-[12px] rounded-[8px] bg-[#151c27] text-white text-[14px] font-geist font-semibold hover:bg-[#1e2a38] transition-colors flex items-center gap-[8px]">
          Upgrade Plan
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
        {/* User card */}
        <div
          className="rounded-[16px] p-[28px]"
          style={{
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(16px)",
            border: "0.8px solid rgba(255,255,255,0.6)",
            boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex items-center gap-[20px]">
            <div className="w-[72px] h-[72px] rounded-[12px] overflow-hidden shrink-0">
              {isAlex
                ? <img src={alexRiversImg} alt={sub.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-[#4c4546] font-bold text-[24px]" style={{ background: sub.color }}>{sub.initials}</div>
              }
            </div>
            <div>
              <h2 className="font-bold text-[#151c27] text-[22px] font-geist tracking-[-0.4px]">{sub.name}</h2>
              <p className="text-[#4c4546] text-[12px] font-geist mt-[2px] opacity-80">ID: USR_98234102</p>
            </div>
          </div>
          <div className="mt-[24px]">
            <p className="text-[10px] font-bold font-geist text-[#4c4546] uppercase tracking-[1px]">EMAIL ADDRESS</p>
            <p className="text-[14px] font-geist text-[#151c27] mt-[6px]">{sub.email.includes("@") ? sub.email : `${sub.name.toLowerCase().replace(" ", ".")}@example.com`}</p>
          </div>
        </div>

        {/* Plan card */}
        <div
          className="rounded-[16px] p-[28px]"
          style={{
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(16px)",
            border: "0.8px solid rgba(255,255,255,0.6)",
            boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex items-center gap-[40px]">
            <div>
              <p className="text-[10px] font-bold font-geist text-[#4c4546] uppercase tracking-[1px]">CURRENT PLAN</p>
              <div className="mt-[6px] flex items-center gap-[10px]">
                <span className="inline-block px-[8px] py-[3px] rounded-[4px] bg-[#151c27] text-white text-[10px] font-bold font-geist tracking-[0.8px] uppercase">ELITE</span>
              </div>
              <div className="mt-[6px]">
                <span className="text-[#151c27] text-[40px] font-geist font-bold leading-[44px]">$99.00</span>
                <span className="text-[#4c4546] text-[16px] font-geist">/mo</span>
              </div>
              <p className="text-[#4c4546] text-[12px] font-geist mt-[4px]">Next invoice: Dec 14, 2024</p>
            </div>
            <div className="flex flex-col gap-[16px]">
              <div>
                <p className="text-[10px] font-bold font-geist text-[#4c4546] uppercase tracking-[1px]">STATUS</p>
                <div className="mt-[6px] flex items-center gap-[6px]">
                  <span className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                  <span className="text-[14px] font-geist text-[#151c27] font-medium">Active</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold font-geist text-[#4c4546] uppercase tracking-[1px]">SINCE</p>
                <p className="text-[14px] font-geist text-[#151c27] mt-[6px]">Jan 12, 2023</p>
              </div>
            </div>
          </div>

          <div className="mt-[20px]">
            <p className="text-[10px] font-bold font-geist text-[#4c4546] uppercase tracking-[1px]">INCLUDED FEATURES</p>
            <div className="mt-[10px] flex flex-col gap-[8px]">
              {["Voice Personalization", "Dating Tips and Coaching", "Second Date Ideas"].map((f) => (
                <div key={f} className="flex items-center gap-[8px]">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#d4f0dc] flex items-center justify-center shrink-0">
                    <Check size={10} color="#22c55e" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-geist text-[#151c27]">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div
        className="rounded-[16px] p-[28px]"
        style={{
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(16px)",
          border: "0.8px solid rgba(255,255,255,0.6)",
          boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05)",
        }}
      >
        <h3 className="font-bold text-[#151c27] text-[20px] font-geist tracking-[-0.3px]">Payment History</h3>
        <div className="mt-[20px]">
          <div className="grid grid-cols-4 gap-x-[12px] md:gap-x-[24px] pb-[10px] border-b border-[rgba(207,196,197,0.2)]">
            {["INVOICE", "DATE", "AMOUNT", "STATUS"].map((col) => (
              <span key={col} className="text-[10px] font-bold font-geist text-[#4c4546] uppercase tracking-[1.2px]">{col}</span>
            ))}
          </div>
          {paymentHistory.map((p, i) => (
            <div key={i} className="grid grid-cols-4 gap-x-[12px] md:gap-x-[24px] py-[16px] border-b border-[rgba(207,196,197,0.1)] items-center">
              <span className="text-[13px] font-geist text-[#151c27]">{p.invoice}</span>
              <span className="text-[13px] font-geist text-[#4c4546]" style={{ color: "#4a90d9" }}>{p.date}</span>
              <span className="text-[13px] font-geist text-[#151c27] font-semibold">{p.amount}</span>
              <span className="text-[11px] font-bold font-geist text-[#4c4546] tracking-[0.8px]">{p.status}</span>
            </div>
          ))}
          <div className="pt-[16px] text-center">
            <button className="text-[11px] font-bold font-geist text-[#4c4546] uppercase tracking-[1px] hover:text-[#151c27] transition-colors">
              LOAD MORE HISTORY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
