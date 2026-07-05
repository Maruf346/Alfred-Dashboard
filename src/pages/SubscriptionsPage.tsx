import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { MoreVertical, Users2, CreditCard } from "lucide-react";
import Avatar from "@/components/Avatar";
import PlanBadge from "@/components/PlanBadge";
import StatusDot from "@/components/StatusDot";
import Pagination from "@/components/Pagination";
import { subsData, filterTabs, matchFilter, SUBS_PER_PAGE } from "@/lib/mock";

export default function SubscriptionsPage() {
  const navigate      = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered   = subsData.filter((s) => matchFilter(activeFilter, s));
  const total      = filtered.length;
  const totalPages = Math.ceil(total / SUBS_PER_PAGE);
  const start      = (page - 1) * SUBS_PER_PAGE;
  const pageRows   = filtered.slice(start, start + SUBS_PER_PAGE);

  const handleFilter = (tab: string) => { setActiveFilter(tab); setPage(1); };

  const premiumCount = subsData.filter((s) => s.planStyle === "black").length;

  const tableCard = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(16px)",
    border: "0.8px solid rgba(255,255,255,0.6)",
    boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05)",
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <h1 className="font-bold text-[#151c27] text-[32px] tracking-[-0.8px] font-geist leading-[40px]">Subscription Management</h1>
        <p className="text-[#4c4546] text-[14px] font-geist leading-[20px] mt-[4px]">
          Oversee revenue, user tiers, and retention metrics across the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
        {[
          { label: "PREMIUM USERS",    value: premiumCount.toLocaleString(), icon: Users2,     iconBg: "#dce2f3" },
          { label: "MONTHLY REVENUE",  value: "$412,940",                    icon: CreditCard, iconBg: "#d4f0dc" },
          { label: "ANNUAL REVENUE",   value: "$4.85M",                      icon: CreditCard, iconBg: "#f0dce2" },
        ].map(({ label, value, icon: Icon, iconBg }) => (
          <div key={label} className="rounded-[16px] p-[20px] flex items-center gap-[16px]" style={tableCard}>
            <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0" style={{ background: iconBg }}>
              <Icon size={20} color="#4c4546" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-[10px] font-bold font-geist text-[#4c4546] uppercase tracking-[1px]">{label}</div>
              <div className="text-[22px] font-geist text-[#151c27] leading-[28px] font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-[8px]">
        <div className="flex gap-[4px] flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilter(tab)}
              className={`px-[14px] py-[6px] rounded-full text-[13px] font-geist font-medium transition-all duration-200 ${
                activeFilter === tab ? "bg-[#151c27] text-white" : "text-[#4c4546] hover:bg-[rgba(220,226,243,0.5)]"
              }`}
            >
              {tab}
              {tab !== "All" && (
                <span className={`ml-[6px] text-[10px] font-bold ${activeFilter === tab ? "opacity-60" : "opacity-40"}`}>
                  {subsData.filter((s) => matchFilter(tab, s)).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <span className="text-[12px] font-geist text-[#4c4546] opacity-70">{total} result{total !== 1 ? "s" : ""}</span>
      </div>

      <div className="w-full rounded-[16px] overflow-hidden" style={tableCard}>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-[24px] px-[24px] py-[12px] border-b border-[rgba(207,196,197,0.2)] min-w-[580px]">
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist">USER</span>
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist w-[100px] text-center">PLAN</span>
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist w-[140px]">BILLING</span>
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist w-[80px] text-center">STATUS</span>
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist w-[72px] text-center">ACTIONS</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${page}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {pageRows.length === 0 ? (
                <div className="px-[24px] py-[40px] text-center text-[14px] font-geist text-[#4c4546] opacity-50 min-w-[580px]">
                  No subscriptions match this filter.
                </div>
              ) : pageRows.map((sub, i) => (
                <div
                  key={sub.id}
                  className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-[24px] px-[24px] py-[15px] items-center cursor-pointer transition-colors duration-150 hover:bg-[rgba(220,226,243,0.2)] min-w-[580px] ${i < pageRows.length - 1 ? "border-b border-[rgba(207,196,197,0.12)]" : ""}`}
                  onClick={() => navigate(`/subscriptions/${sub.id}`)}
                >
                  <div className="flex items-center gap-[12px]">
                    <Avatar initials={sub.initials} color={sub.color} size={36} />
                    <div>
                      <p className="font-semibold text-[#151c27] text-[14px] font-geist">{sub.name}</p>
                      <p className="text-[#4c4546] text-[12px] font-geist opacity-60">{sub.email}</p>
                    </div>
                  </div>
                  <div className="w-[100px] flex justify-center">
                    <PlanBadge plan={sub.plan} style={sub.planStyle} />
                  </div>
                  <div className="w-[140px]">
                    <p className="text-[13px] font-geist text-[#151c27] font-semibold">{sub.billing}</p>
                    <p className="text-[11px] font-geist text-[#4c4546] opacity-60">{sub.billingDate}</p>
                  </div>
                  <div className="w-[80px] flex justify-center">
                    <StatusDot status={sub.status} />
                  </div>
                  <div className="w-[72px] flex justify-center" onClick={(e) => e.stopPropagation()}>
                    <button className="p-[6px] rounded-[6px] hover:bg-[rgba(220,226,243,0.5)] transition-colors">
                      <MoreVertical size={16} color="#4c4546" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-[24px] py-[13px] flex items-center justify-between border-t border-[rgba(207,196,197,0.2)]">
          <span className="text-[12px] font-geist text-[#4c4546]">
            {total === 0
              ? "No results"
              : `Showing ${start + 1}–${Math.min(start + SUBS_PER_PAGE, total)} of ${total}`}
          </span>
          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}
