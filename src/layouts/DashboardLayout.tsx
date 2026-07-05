import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, X } from "lucide-react";
import Sidebar, { SIDEBAR_EXPANDED, SIDEBAR_COLLAPSED } from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate  = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileOpen, setMobileOpen]           = useState(false);

  const sidebarW = sidebarExpanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;
  const isDetail = location.pathname.startsWith("/subscriptions/");

  const topNavContent = isDetail ? (
    <div className="text-[11px] font-geist text-[#4c4546] flex items-center gap-[6px]">
      <span
        className="hover:text-[#151c27] cursor-pointer transition-colors"
        onClick={() => navigate("/subscriptions")}
      >
        Subscriptions
      </span>
      <span className="opacity-40">›</span>
      <span className="text-[#151c27]">Details</span>
    </div>
  ) : null;

  return (
    <div
      className="h-screen w-full flex items-stretch overflow-hidden"
      style={{ background: "#f0f3ff" }}
    >
      {/* Desktop sidebar */}
      <div
        className="relative shrink-0 hidden lg:block transition-all duration-300 ease-in-out"
        style={{ width: sidebarW }}
      >
        <Sidebar
          isExpanded={sidebarExpanded}
          onToggle={() => setSidebarExpanded((v) => !v)}
        />
        <button
          onClick={() => setSidebarExpanded((v) => !v)}
          aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          className="absolute top-[22px] -right-[12px] z-30 w-[24px] h-[24px] rounded-full bg-white border border-[rgba(0,0,0,0.1)] shadow-[0_2px_8px_rgba(0,0,0,0.14)] flex items-center justify-center hover:bg-[#f0f3ff] hover:border-[rgba(0,0,0,0.2)] transition-all duration-150"
        >
          <motion.span
            animate={{ rotate: sidebarExpanded ? 0 : 180 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ChevronLeft size={12} color="#4c4546" strokeWidth={2.5} />
          </motion.span>
        </button>
      </div>

      {/* Mobile sidebar drawer + backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: -SIDEBAR_EXPANDED }} animate={{ x: 0 }} exit={{ x: -SIDEBAR_EXPANDED }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
              style={{ width: SIDEBAR_EXPANDED }}
            >
              <Sidebar isExpanded={true} onToggle={() => setMobileOpen(false)} closeMobile={() => setMobileOpen(false)} />
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-[22px] right-[-16px] z-20 w-[32px] h-[32px] rounded-full bg-white border border-[rgba(0,0,0,0.1)] shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center hover:bg-[#f0f3ff] transition-colors"
              >
                <X size={14} color="#4c4546" strokeWidth={2} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-[12px] min-w-0 p-[12px] lg:p-[16px] lg:pl-[16px]">
        <TopNav onMobileMenuOpen={() => setMobileOpen(true)}>
          {topNavContent}
        </TopNav>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pb-[24px]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
