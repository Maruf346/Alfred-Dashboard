import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Menu, CreditCard, Users2, Check, ShieldCheck } from "lucide-react";
import adminAvatarImg from "@/imports/Frame2132/edd8cc13e96c87cf2a63f21804be63e2f16fdaac.png";
import { INITIAL_NOTIFS } from "@/lib/mock";
import type { Notif, NotifKind } from "@/types";

function notifIcon(kind: NotifKind) {
  const base = "w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0";
  switch (kind) {
    case "subscription": return <div className={`${base} bg-[#dce2f3]`}><CreditCard size={14} color="#4c7cc4" strokeWidth={1.8} /></div>;
    case "user":         return <div className={`${base} bg-[#e4f0e8]`}><Users2    size={14} color="#3a8f5c" strokeWidth={1.8} /></div>;
    case "payment":      return <div className={`${base} bg-[#e8f4e8]`}><Check     size={14} color="#3a8f5c" strokeWidth={2.5} /></div>;
    case "system":       return <div className={`${base} bg-[#f0ece8]`}><ShieldCheck size={14} color="#a0784a" strokeWidth={1.8} /></div>;
  }
}

export default function TopNav({ children, onMobileMenuOpen }: { children?: React.ReactNode; onMobileMenuOpen?: () => void }) {
  const [notifs, setNotifs]         = useState<Notif[]>(INITIAL_NOTIFS);
  const [panelOpen, setPanelOpen]   = useState(false);
  const [panelPos, setPanelPos]     = useState({ top: 0, right: 0 });

  const bellBtnRef  = useRef<HTMLButtonElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    if (!panelOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !bellBtnRef.current?.contains(target)
      ) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [panelOpen]);

  const togglePanel = () => {
    if (!bellBtnRef.current) return;
    if (!panelOpen) {
      const rect = bellBtnRef.current.getBoundingClientRect();
      setPanelPos({
        top:   Math.round(rect.bottom + 10),
        right: Math.round(Math.max(12, window.innerWidth - rect.right - 8)),
      });
    }
    setPanelOpen(o => !o);
  };

  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })));
  const clearRead   = () => setNotifs(ns => ns.filter(n => !n.read));
  const markOne     = (id: string) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div
      className="w-full h-[51.2px] rounded-[9.6px] relative flex items-center shrink-0"
      style={{
        backdropFilter: "blur(9.6px)",
        background: "rgba(255,255,255,0.7)",
        border: "0.8px solid rgba(255,255,255,0.2)",
        boxShadow: "0px 8px 12px -2.4px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex items-center justify-between w-full pl-[16px] pr-[25.6px] gap-[12px]">
        {onMobileMenuOpen && (
          <button
            onClick={onMobileMenuOpen}
            className="lg:hidden flex items-center justify-center w-[32px] h-[32px] rounded-[8px] hover:bg-[rgba(220,226,243,0.4)] transition-colors shrink-0"
          >
            <Menu size={16} color="#4c4546" strokeWidth={1.5} />
          </button>
        )}

        <div className="flex-1 min-w-0">{children}</div>

        <div className="flex items-center gap-[14px] shrink-0">
          <div className="relative">
            <button
              ref={bellBtnRef}
              onClick={togglePanel}
              className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full hover:bg-[rgba(220,226,243,0.4)] transition-all"
            >
              <Bell size={16} color="#4c4546" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-[4px] right-[4px] w-[8px] h-[8px] rounded-full bg-[#e55a5a] border-[1.5px] border-white" />
              )}
            </button>

            {createPortal(
              <AnimatePresence>
                {panelOpen && (
                  <motion.div
                    ref={panelRef}
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="w-[320px] rounded-[14px] overflow-hidden"
                    style={{
                      position: "fixed",
                      top: panelPos.top,
                      right: panelPos.right,
                      zIndex: 99999,
                      background: "rgba(255,255,255,0.97)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(207,196,197,0.25)",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.07)",
                    }}
                  >
                    <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-[rgba(207,196,197,0.2)]">
                      <div className="flex items-center gap-[8px]">
                        <span className="font-bold text-[#151c27] text-[14px] font-geist">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-[7px] py-[2px] rounded-full bg-[#151c27] text-white text-[10px] font-bold font-geist">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-[4px]">
                        <button
                          onClick={markAllRead}
                          disabled={unreadCount === 0}
                          className="px-[9px] py-[4px] rounded-[6px] text-[11px] font-geist font-medium text-[#4c4546] hover:bg-[rgba(220,226,243,0.5)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          Mark read
                        </button>
                        <button
                          onClick={clearRead}
                          disabled={notifs.every(n => !n.read)}
                          className="px-[9px] py-[4px] rounded-[6px] text-[11px] font-geist font-medium text-[#c0392b] hover:bg-[rgba(253,232,232,0.6)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          Clear read
                        </button>
                      </div>
                    </div>

                    <div className="max-h-[320px] overflow-y-auto">
                      {notifs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-[40px] gap-[8px]">
                          <Bell size={24} color="rgba(76,69,70,0.25)" strokeWidth={1.5} />
                          <p className="text-[12px] font-geist text-[#4c4546] opacity-40">No notifications</p>
                        </div>
                      ) : (
                        notifs.map((n, idx) => (
                          <button
                            key={n.id}
                            onClick={() => markOne(n.id)}
                            className={`w-full flex items-start gap-[12px] px-[16px] py-[12px] text-left transition-colors hover:bg-[rgba(220,226,243,0.2)] ${
                              idx < notifs.length - 1 ? "border-b border-[rgba(207,196,197,0.12)]" : ""
                            }`}
                          >
                            {notifIcon(n.kind)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-[6px]">
                                <span className={`font-geist text-[12.5px] leading-[17px] truncate ${n.read ? "font-normal text-[#4c4546]" : "font-semibold text-[#151c27]"}`}>
                                  {n.title}
                                </span>
                                {!n.read && (
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#4c7cc4] shrink-0" />
                                )}
                              </div>
                              <p className="font-geist text-[11px] text-[#4c4546] opacity-60 leading-[15px] mt-[2px] truncate">
                                {n.body}
                              </p>
                              <p className="font-geist text-[10px] text-[#4c4546] opacity-40 mt-[3px]">{n.time}</p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body
            )}
          </div>

          <div className="w-[0.8px] h-[25.6px] bg-[rgba(207,196,197,0.3)]" />

          <div className="flex items-center gap-[9.6px]">
            <span className="hidden sm:block font-bold text-[#151c27] text-[11.2px] font-geist">Admin Alex</span>
            <div
              className="w-[32px] h-[32px] rounded-full overflow-hidden border-[1.6px] border-white shrink-0"
              style={{ boxShadow: "0px 0.8px 1.6px 0px rgba(0,0,0,0.05)" }}
            >
              <img src={adminAvatarImg} alt="Admin Alex" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
