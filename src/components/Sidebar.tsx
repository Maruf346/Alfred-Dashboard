import { useNavigate, useLocation } from "react-router";
import sidebarSvg from "@/imports/AsideSideNavBarPredictedComponent/svg-m1x0hxxkxj";
import { logout } from "@/lib/auth";

export const SIDEBAR_EXPANDED = 256;
export const SIDEBAR_COLLAPSED = 72;

export interface NavItemDef {
  path: string;
  label: string;
  iconPath: string;
  iconW: number;
  iconH: number;
  iconViewBox: string;
}

export const navItemDefs: NavItemDef[] = [
  { path: "/dashboard",     label: "Dashboard",    iconPath: sidebarSvg.p191dcc80,  iconW: 18,     iconH: 18,     iconViewBox: "0 0 18 18" },
  { path: "/users",         label: "User",         iconPath: sidebarSvg.p39955c80,  iconW: 22,     iconH: 16,     iconViewBox: "0 0 22 16" },
  { path: "/subscriptions", label: "Subscription", iconPath: sidebarSvg.p141460c0,  iconW: 20.167, iconH: 14.667, iconViewBox: "0 0 20.1667 14.6667" },
  { path: "/settings",      label: "Settings",     iconPath: sidebarSvg.p3cdadd00,  iconW: 20.1,   iconH: 20,     iconViewBox: "0 0 20.1 20" },
];

function NavIcon({ path, width, height, viewBox, fill }: {
  path: string; width: number; height: number; viewBox: string; fill: string;
}) {
  return (
    <svg
      style={{ width, height, minWidth: width, display: "block" }}
      fill="none"
      preserveAspectRatio="none"
      viewBox={viewBox}
    >
      <path d={path} fill={fill} />
    </svg>
  );
}

export default function Sidebar({
  isExpanded,
  onToggle,
  closeMobile,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  closeMobile?: () => void;
}) {
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    closeMobile?.();
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
    closeMobile?.();
  };

  const isActive = (path: string) =>
    path === "/subscriptions"
      ? location.pathname.startsWith("/subscriptions")
      : location.pathname === path;

  return (
    <aside
      className="flex flex-col size-full relative select-none"
      style={{
        backdropFilter: "blur(32px)",
        background: "white",
        boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.05), 0px 4px 6px -1px rgba(0,0,0,0.1)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none border-r border-[rgba(0,0,0,0.06)]" />

      <div className="flex flex-col flex-1 py-[24px] overflow-hidden min-h-0">

        {/* Logo row */}
        <div className={`flex items-center shrink-0 mb-[32px] ${isExpanded ? "pl-[16px] pr-[25px]" : "justify-center px-0"}`}>
          <div
            className="flex items-center justify-center w-[40px] h-[40px] rounded-[8px] bg-black shrink-0 cursor-pointer"
            style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}
            onClick={onToggle}
          >
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none">
              <path d={sidebarSvg.p24855620} fill="white" />
            </svg>
          </div>

          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ width: isExpanded ? 110 : 0, opacity: isExpanded ? 1 : 0 }}
          >
            <div className="pl-[12px] flex flex-col whitespace-nowrap">
              <span className="font-bold text-[#151c27] text-[24px] tracking-[-0.6px] leading-[24px] font-geist">Alfred AI</span>
              <span className="font-bold text-[#4c4546] text-[10px] tracking-[1px] uppercase leading-[15px] font-geist">ADMIN SUITE</span>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-[4px] flex-1 overflow-y-auto overflow-x-hidden px-[8px]">
          {navItemDefs.map(({ path, label, iconPath, iconW, iconH, iconViewBox }) => {
            const active   = isActive(path);
            const iconFill = active ? "black" : "#4C4546";
            return (
              <button
                key={path}
                onClick={() => handleNav(path)}
                title={!isExpanded ? label : undefined}
                className={`flex items-center rounded-[8px] text-left transition-colors duration-150
                  ${isExpanded ? "px-[8px] py-[12px] w-full" : "justify-center p-[12px] w-full"}
                  ${active ? "bg-[rgba(220,226,243,0.5)]" : "hover:bg-[rgba(220,226,243,0.3)]"}`}
              >
                <span className="shrink-0 flex items-center justify-center" style={{ width: 22, height: 22 }}>
                  <NavIcon path={iconPath} width={iconW} height={iconH} viewBox={iconViewBox} fill={iconFill} />
                </span>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap"
                  style={{ width: isExpanded ? 160 : 0, opacity: isExpanded ? 1 : 0 }}
                >
                  <span className={`pl-[10px] font-geist text-[16px] leading-[24px] ${active ? "font-bold text-black" : "font-normal text-[#4c4546]"}`}>
                    {label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="shrink-0 px-[8px]">
          <div className="pt-[16px] relative">
            <div className="absolute top-0 left-0 right-0 border-t border-[rgba(0,0,0,0.06)]" />
            <button
              onClick={handleSignOut}
              title={!isExpanded ? "Sign Out" : undefined}
              className={`flex items-center rounded-[8px] hover:bg-[rgba(220,226,243,0.3)] transition-colors duration-150 mt-[16px]
                ${isExpanded ? "px-[8px] py-[12px] w-full" : "justify-center p-[12px] w-full"}`}
            >
              <span className="shrink-0 flex items-center justify-center" style={{ width: 22, height: 22 }}>
                <NavIcon path={sidebarSvg.p3e9df400} width={18} height={18} viewBox="0 0 18 18" fill="#4C4546" />
              </span>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap"
                style={{ width: isExpanded ? 160 : 0, opacity: isExpanded ? 1 : 0 }}
              >
                <span className="pl-[10px] font-geist text-[16px] leading-[24px] font-normal text-[#4c4546]">Sign Out</span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}
