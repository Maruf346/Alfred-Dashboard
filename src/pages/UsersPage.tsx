import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreVertical, Users2 } from "lucide-react";
import Avatar from "@/components/Avatar";
import PlanBadge from "@/components/PlanBadge";
import StatusDot from "@/components/StatusDot";
import Pagination from "@/components/Pagination";
import { usersData, USERS_PER_PAGE } from "@/lib/mock";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const total = usersData.length;
  const totalPages = Math.ceil(total / USERS_PER_PAGE);
  const start = (page - 1) * USERS_PER_PAGE;
  const pageRows = usersData.slice(start, start + USERS_PER_PAGE);
  const activeCount = usersData.filter((u) => u.status === "Active").length;

  const tableCard = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(16px)",
    border: "0.8px solid rgba(255,255,255,0.6)",
    boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05), 0px 16px 20px -4px rgba(0,0,0,0.03)",
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <h1 className="font-bold text-[#151c27] text-[32px] tracking-[-0.8px] font-geist leading-[40px]">User Management</h1>
        <p className="text-[#4c4546] text-[14px] font-geist leading-[20px] mt-[4px]">
          Directory of {total.toLocaleString()} members with system access.
        </p>
      </div>

      <div className="w-full rounded-[16px] overflow-hidden" style={tableCard}>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-[24px] px-[24px] py-[12px] border-b border-[rgba(207,196,197,0.2)] min-w-[480px]">
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist">USER</span>
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist w-[80px] text-center">STATUS</span>
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist w-[120px] text-center">PLAN</span>
            <span className="font-bold text-[#4c4546] text-[10px] tracking-[1.2px] uppercase font-geist w-[72px] text-center">ACTIONS</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {pageRows.map((user, i) => (
                <div
                  key={user.id}
                  className={`grid grid-cols-[1fr_auto_auto_auto] gap-x-[24px] px-[24px] py-[15px] items-center transition-colors duration-150 hover:bg-[rgba(220,226,243,0.2)] min-w-[480px] ${i < pageRows.length - 1 ? "border-b border-[rgba(207,196,197,0.12)]" : ""}`}
                >
                  <div className="flex items-center gap-[12px]">
                    <Avatar initials={user.initials} color={user.color} size={36} />
                    <div>
                      <p className="font-semibold text-[#151c27] text-[14px] font-geist leading-[20px]">{user.name}</p>
                      <p className="text-[#4c4546] text-[12px] font-geist leading-[16px] opacity-60">{user.email}</p>
                    </div>
                  </div>
                  <div className="w-[80px] flex justify-center"><StatusDot status={user.status} /></div>
                  <div className="w-[120px] flex justify-center"><PlanBadge plan={user.plan} style={user.planStyle} /></div>
                  <div className="w-[72px] flex justify-center">
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
            Showing {start + 1}–{Math.min(start + USERS_PER_PAGE, total)} of {total} users
          </span>
          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
        {[
          {
            value: total,
            label: "TOTAL USERS",
            badge: "↑12% vs last month",
            iconBg: "#dce2f3",
            icon: <Users2 size={18} color="#4c4546" strokeWidth={1.5} />,
          },
          {
            value: activeCount,
            label: "ACTIVE TODAY",
            badge: "↑ online now",
            iconBg: "#d4f0dc",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            ),
          },
        ].map(({ value, label, badge, iconBg, icon }) => (
          <div
            key={label}
            className="rounded-[20px] p-[24px]"
            style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", border: "0.8px solid rgba(255,255,255,0.6)", boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[28px] font-geist text-[#151c27] leading-[36px] mt-[8px]">{value.toLocaleString()}</div>
                <div className="text-[11px] font-geist text-[#4c4546] uppercase tracking-[0.8px] mt-[4px] font-bold">{label}</div>
              </div>
              <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0" style={{ background: iconBg }}>{icon}</div>
            </div>
            <div className="mt-[8px]">
              <span className="text-[#22c55e] text-[12px] font-bold font-geist">{badge.split(" ")[0]}</span>
              <span className="text-[#4c4546] text-[11px] font-geist ml-[4px]">{badge.split(" ").slice(1).join(" ")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
