import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@alfred.ai");
  const [password, setPassword] = useState("••••••••");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse at 0% 0%, rgba(242,242,242,1) 0%, rgba(242,242,242,0) 50%)",
          "radial-gradient(ellipse at 50% 0%, rgba(250,250,250,1) 0%, rgba(250,250,250,0) 50%)",
          "radial-gradient(ellipse at 100% 0%, rgba(245,245,245,1) 0%, rgba(245,245,245,0) 50%)",
          "linear-gradient(90deg, rgb(251,251,251) 0%, rgb(251,251,251) 100%)",
        ].join(", "),
      }}
    >
      <div className="h-[44px] shrink-0 w-full border-b border-[rgba(207,196,197,0.3)]" />

      <div className="flex-1 flex items-center justify-center px-[16px] py-[20px] min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px] px-[40px] py-[32px] rounded-[4px] flex flex-col gap-[20px] items-center relative"
          style={{
            backdropFilter: "blur(2px)",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(207,196,197,0.4)",
            boxShadow: "0px 20px 50px 0px rgba(0,0,0,0.04), 0px 4px 12px 0px rgba(0,0,0,0.02)",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center w-full">
            <div className="relative w-[64px] h-[64px]">
              <div className="absolute inset-[-6px] rounded-full border border-black/8" />
              <div className="w-full h-full rounded-full border border-[rgba(207,196,197,0.5)] flex items-center justify-center bg-white">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="31" stroke="rgba(207,196,197,0.5)" strokeWidth="0.8" fill="white" />
                  <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fill="#151c27" fontSize="22" fontFamily="Geist, Inter, sans-serif" fontWeight="400">A</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center gap-[6px] w-full">
            <h1
              className="text-[28px] text-black text-center tracking-[-0.7px] leading-[36px]"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Welcome Back
            </h1>
            <p
              className="text-[#585f6c] text-[13px] text-center leading-[18px]"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
            >
              Sign in to manage your Alfred AI platform.
            </p>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-[16px] w-full pt-[4px]">
            {/* Email */}
            <div className="flex flex-col gap-[7px]">
              <label
                className="text-[#4c4546] text-[11px] uppercase tracking-[1.2px]"
                style={{ fontFamily: "Geist, sans-serif", fontWeight: 600 }}
              >
                EMAIL ADDRESS
              </label>
              <div
                className="w-full rounded-[2px] bg-white"
                style={{ border: "1px solid rgba(207,196,197,0.6)" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-[14px] py-[11px] bg-transparent outline-none text-[14px] text-[#7e7576]/80"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  placeholder="admin@alfred.ai"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[7px]">
              <div className="flex items-center justify-between">
                <label
                  className="text-[#4c4546] text-[11px] uppercase tracking-[1.2px]"
                  style={{ fontFamily: "Geist, sans-serif", fontWeight: 600 }}
                >
                  PASSWORD
                </label>
                <button
                  className="text-[11px] tracking-[0.5px]"
                  style={{ fontFamily: "Geist, sans-serif", fontWeight: 500, color: "rgba(88,95,108,0.7)" }}
                >
                  Forgot?
                </button>
              </div>
              <div
                className="w-full rounded-[2px] bg-white flex items-center"
                style={{ border: "1px solid rgba(207,196,197,0.6)" }}
              >
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-[14px] py-[11px] bg-transparent outline-none text-[14px] text-[#7e7576]/80"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  onClick={() => setShowPw(!showPw)}
                  className="pr-[14px] text-[#585f6c]/40 hover:text-[#585f6c]/70 transition-colors"
                >
                  {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-[8px]">
              <button
                onClick={() => setRemember(!remember)}
                className="w-[15px] h-[15px] rounded-[2px] bg-white border border-[#cfc4c5] flex items-center justify-center shrink-0 transition-all"
                style={remember ? { background: "#151c27", borderColor: "#151c27" } : {}}
              >
                {remember && <Check size={9} color="white" strokeWidth={3} />}
              </button>
              <span
                className="text-[#585f6c] text-[13px] leading-[18px]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              >
                Remember this device
              </span>
            </div>

            {/* Sign In */}
            <button
              onClick={handleLogin}
              className="w-full py-[13px] rounded-[2px] bg-black flex items-center justify-center gap-[8px] hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors"
              style={{ border: "1px solid black" }}
            >
              <span
                className="text-white text-[15px] text-center leading-[22px]"
                style={{ fontFamily: "Geist, sans-serif", fontWeight: 600 }}
              >
                Sign In
              </span>
              <ArrowRight size={12} color="white" />
            </button>
          </div>

          <div className="w-full border-t border-[rgba(207,196,197,0.3)] pt-[4px]" />
        </motion.div>
      </div>

      <div className="shrink-0 border-t border-[rgba(207,196,197,0.3)] px-[40px] py-[14px]">
        <span
          className="text-[11px] tracking-[0.5px]"
          style={{ fontFamily: "Geist, sans-serif", fontWeight: 500, color: "rgba(88,95,108,0.6)" }}
        >
          © 2026 Alfred AI. All rights reserved.
        </span>
      </div>
    </div>
  );
}
