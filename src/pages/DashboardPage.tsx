import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import StatCard from "@/components/StatCard";
import BarChartSVG from "@/components/BarChartSVG";
import LineChartSVG from "@/components/LineChartSVG";
import { GROWTH_OPTIONS, userGrowthData, userGrowthYear, retentionData } from "@/lib/mock";
import type { GrowthPeriod } from "@/types";

const chartCard = {
  backdropFilter: "blur(16px)",
  background: "rgba(255,255,255,0.7)",
  border: "0.8px solid rgba(255,255,255,0.6)",
  boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05), 0px 16px 20px -4px rgba(0,0,0,0.03)",
};

export default function DashboardPage() {
  const [period, setPeriod]     = useState<GrowthPeriod>("Last 6 Months");
  const [dropOpen, setDropOpen] = useState(false);
  const growthData = period === "Last 6 Months" ? userGrowthData : userGrowthYear;

  return (
    <div className="flex flex-col gap-[19.2px]">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-[12px] lg:gap-[19.2px]">
        <StatCard label="TOTAL USERS"      value="1,284,042" progress={75}  />
        <StatCard label="PREMIUM SUBS"     value="412,800"   progress={50}  />
        <StatCard label="MONTHLY REVENUE"  value="$12.4M"    progress={100} />
        <StatCard label="ACTIVE PLANS"     value="94,201"    progress={67}  />
      </div>

      {/* User Growth Velocity */}
      <div className="w-full rounded-[25.6px]" style={chartCard}>
        <div className="p-[24px] pb-[20px]">
          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="font-semibold text-[#151c27] text-[19.2px] tracking-[-0.192px] font-geist">
              User Growth Velocity
            </h3>

            <div className="relative">
              <button
                onClick={() => setDropOpen((o) => !o)}
                className="flex items-center gap-[5px] px-[10px] py-[5px] rounded-[8px] text-[#4c4546] text-[11.5px] font-bold font-geist border border-[rgba(207,196,197,0.35)] hover:bg-[rgba(220,226,243,0.3)] transition-colors"
              >
                {period}
                <motion.span
                  animate={{ rotate: dropOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex" }}
                >
                  <ChevronDown size={11} strokeWidth={2.5} />
                </motion.span>
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setDropOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-[calc(100%+6px)] w-[148px] bg-white rounded-[10px] border border-[rgba(207,196,197,0.3)] overflow-hidden z-20"
                      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.06)" }}
                    >
                      {GROWTH_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setPeriod(opt); setDropOpen(false); }}
                          className={`w-full text-left px-[14px] py-[10px] text-[12.5px] font-geist transition-colors flex items-center justify-between ${
                            opt === period
                              ? "bg-[rgba(220,226,243,0.45)] text-[#151c27] font-semibold"
                              : "text-[#4c4546] hover:bg-[rgba(220,226,243,0.25)]"
                          }`}
                        >
                          {opt}
                          {opt === period && (
                            <span className="w-[6px] h-[6px] rounded-full bg-[#151c27] shrink-0" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={period}
                className="h-full w-full"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <BarChartSVG data={growthData} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Subscription Retention */}
      <div className="w-full rounded-[25.6px]" style={chartCard}>
        <div className="p-[24px] pb-[20px]">
          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="font-semibold text-[#151c27] text-[19.2px] tracking-[-0.192px] font-geist">
              Subscription Retention
            </h3>
            <div className="flex items-center gap-[14px]">
              <span className="flex items-center gap-[6px] text-[10px] font-bold font-geist text-[#4c4546] tracking-[0.6px] uppercase">
                <span className="w-[10px] h-[2.5px] rounded-full bg-[#151c27] inline-block" />
                Premium
              </span>
              <span className="flex items-center gap-[6px] text-[10px] font-bold font-geist text-[#4c4546] tracking-[0.6px] uppercase">
                <span className="inline-flex gap-[2px] items-center">
                  <span className="w-[4px] h-[2px] rounded-full bg-[#6e8ec9]" />
                  <span className="w-[4px] h-[2px] rounded-full bg-[#6e8ec9]" />
                  <span className="w-[4px] h-[2px] rounded-full bg-[#6e8ec9]" />
                </span>
                Basic
              </span>
            </div>
          </div>
          <div className="h-[160px]">
            <LineChartSVG data={retentionData} />
          </div>
        </div>
      </div>
    </div>
  );
}
