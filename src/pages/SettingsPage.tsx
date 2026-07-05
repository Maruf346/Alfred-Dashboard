import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Eye, EyeOff, X, Save, Pencil, ShieldCheck, KeyRound, ArrowRight } from "lucide-react";
import settingsProfileImg from "@/imports/Frame2140/7fd9cf2dada2c4776e515f2d4a02e0331f06edfe.png";

const cardStyle = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(16px)",
  border: "0.8px solid rgba(255,255,255,0.6)",
  boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05)",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold font-geist text-[#4c4546] uppercase tracking-[1.2px] mb-[8px]">
      {children}
    </span>
  );
}

function FieldValue({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-[14px] py-[10px] rounded-[8px] bg-[rgba(240,243,255,0.5)] border border-[rgba(207,196,197,0.2)] text-[14px] font-geist text-[#151c27] min-h-[42px] flex items-center">
      {children}
    </p>
  );
}

function PwField({
  label, value, onChange, show, onToggleShow, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggleShow: () => void; placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-[14px] py-[11px] pr-[44px] rounded-[8px] bg-white border border-[rgba(207,196,197,0.4)] text-[14px] font-geist text-[#151c27] placeholder-[rgba(76,69,70,0.35)] outline-none focus:border-[rgba(21,28,39,0.4)] transition-colors"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[rgba(88,95,108,0.45)] hover:text-[#151c27] transition-colors"
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex.rivera@alfred-ai.com");
  const [bio, setBio] = useState("Lead architect at Alfred AI. Passionate about glassmorphism and tactile user interfaces.");
  const [draftName, setDraftName] = useState(name);
  const [draftEmail, setDraftEmail] = useState(email);
  const [draftBio, setDraftBio] = useState(bio);

  const startEdit = () => {
    setDraftName(name);
    setDraftEmail(email);
    setDraftBio(bio);
    setEditing(true);
  };
  const cancelEdit = () => setEditing(false);
  const saveEdit = () => {
    setName(draftName);
    setEmail(draftEmail);
    setBio(draftBio);
    setEditing(false);
    toast.success("Profile saved", {
      description: "Your profile information has been updated.",
      duration: 3500,
    });
  };

  const [pwOpen, setPwOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdatePassword = () => {
    if (!currentPw || !newPw || !confirmPw) {
      toast.error("All fields are required", { duration: 3000 });
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("Passwords don't match", { description: "New password and confirm password must match.", duration: 3000 });
      return;
    }
    if (newPw.length < 12) {
      toast.error("Password too short", { description: "Password must be at least 12 characters.", duration: 3000 });
      return;
    }
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setPwOpen(false);
    toast.success("Password updated", {
      description: "Your password has been changed successfully.",
      duration: 4000,
    });
  };

  return (
    <div className="flex flex-col gap-[24px]">

      {/* Profile Information */}
      <div className="rounded-[16px] p-[28px] sm:p-[32px]" style={cardStyle}>
        <div className="flex items-center justify-between mb-[24px]">
          <h2 className="font-bold text-[#151c27] text-[20px] sm:text-[22px] font-geist tracking-[-0.3px]">
            Profile Information
          </h2>
          <AnimatePresence mode="wait">
            {editing ? (
              <motion.div
                key="edit-actions"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-[8px]"
              >
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-[8px] border border-[rgba(207,196,197,0.5)] text-[13px] font-geist font-medium text-[#4c4546] hover:bg-[rgba(220,226,243,0.3)] transition-colors"
                >
                  <X size={13} strokeWidth={2} />
                  Discard
                </button>
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-[8px] bg-[#151c27] text-[13px] font-geist font-semibold text-white hover:bg-[#1e2a38] transition-colors"
                >
                  <Save size={13} strokeWidth={2.5} />
                  Save
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="edit-btn"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                onClick={startEdit}
                className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-[8px] border border-[rgba(207,196,197,0.5)] text-[13px] font-geist font-medium text-[#4c4546] hover:bg-[rgba(220,226,243,0.3)] hover:border-[rgba(21,28,39,0.2)] transition-colors"
              >
                <Pencil size={13} strokeWidth={2} />
                Edit
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-[24px] sm:gap-[32px] items-start">
          <div className="relative shrink-0">
            <div className="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] rounded-[12px] overflow-hidden">
              <img src={settingsProfileImg} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <AnimatePresence>
              {editing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-[-6px] right-[-6px] w-[24px] h-[24px] rounded-full bg-[#151c27] flex items-center justify-center shadow-md hover:bg-[#1e2a38] transition-colors"
                >
                  <Pencil size={10} color="white" strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[20px]">
            <div>
              <FieldLabel>FULL NAME</FieldLabel>
              <AnimatePresence mode="wait">
                {editing ? (
                  <motion.input
                    key="name-input"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    className="w-full px-[14px] py-[10px] rounded-[8px] bg-white border border-[rgba(207,196,197,0.4)] text-[14px] font-geist text-[#151c27] outline-none focus:border-[rgba(21,28,39,0.4)] transition-colors"
                  />
                ) : (
                  <motion.div key="name-val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FieldValue>{name}</FieldValue>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <FieldLabel>EMAIL ADDRESS</FieldLabel>
              <AnimatePresence mode="wait">
                {editing ? (
                  <motion.input
                    key="email-input"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    type="email"
                    value={draftEmail}
                    onChange={(e) => setDraftEmail(e.target.value)}
                    className="w-full px-[14px] py-[10px] rounded-[8px] bg-white border border-[rgba(207,196,197,0.4)] text-[14px] font-geist text-[#151c27] outline-none focus:border-[rgba(21,28,39,0.4)] transition-colors"
                  />
                ) : (
                  <motion.div key="email-val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FieldValue>{email}</FieldValue>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="sm:col-span-2">
              <FieldLabel>BIOGRAPHY</FieldLabel>
              <AnimatePresence mode="wait">
                {editing ? (
                  <motion.textarea
                    key="bio-input"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    value={draftBio}
                    onChange={(e) => setDraftBio(e.target.value)}
                    rows={3}
                    className="w-full px-[14px] py-[10px] rounded-[8px] bg-white border border-[rgba(207,196,197,0.4)] text-[14px] font-geist text-[#151c27] outline-none focus:border-[rgba(21,28,39,0.4)] transition-colors resize-none"
                  />
                ) : (
                  <motion.div key="bio-val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FieldValue>{bio}</FieldValue>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-[16px] p-[28px] sm:p-[32px]" style={cardStyle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#dce2f3] flex items-center justify-center shrink-0">
              <ShieldCheck size={16} color="#4c4546" strokeWidth={1.5} />
            </div>
            <h2 className="font-bold text-[#151c27] text-[20px] sm:text-[22px] font-geist tracking-[-0.3px]">Security</h2>
          </div>

          <AnimatePresence mode="wait">
            {!pwOpen ? (
              <motion.button
                key="open-pw"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                onClick={() => setPwOpen(true)}
                className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-[8px] border border-[rgba(207,196,197,0.5)] text-[13px] font-geist font-medium text-[#4c4546] hover:bg-[rgba(220,226,243,0.3)] hover:border-[rgba(21,28,39,0.2)] transition-colors"
              >
                <KeyRound size={13} strokeWidth={2} />
                Change Password
              </motion.button>
            ) : (
              <motion.button
                key="close-pw"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                onClick={() => { setPwOpen(false); setCurrentPw(""); setNewPw(""); setConfirmPw(""); }}
                className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-[8px] border border-[rgba(207,196,197,0.5)] text-[13px] font-geist font-medium text-[#4c4546] hover:bg-[rgba(220,226,243,0.3)] transition-colors"
              >
                <X size={13} strokeWidth={2} />
                Cancel
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {pwOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-[24px] flex flex-col gap-[16px] max-w-[520px]">
                <PwField
                  label="CURRENT PASSWORD"
                  value={currentPw}
                  onChange={setCurrentPw}
                  show={showCurrent}
                  onToggleShow={() => setShowCurrent((v) => !v)}
                  placeholder="Enter current password"
                />
                <PwField
                  label="NEW PASSWORD"
                  value={newPw}
                  onChange={setNewPw}
                  show={showNew}
                  onToggleShow={() => setShowNew((v) => !v)}
                  placeholder="Min. 12 characters"
                />
                <PwField
                  label="CONFIRM PASSWORD"
                  value={confirmPw}
                  onChange={setConfirmPw}
                  show={showConfirm}
                  onToggleShow={() => setShowConfirm((v) => !v)}
                  placeholder="Re-enter new password"
                />

                <div className="pt-[4px]">
                  <button
                    onClick={handleUpdatePassword}
                    className="w-full py-[13px] rounded-[8px] bg-[#151c27] text-white text-[14px] font-geist font-semibold hover:bg-[#1e2a38] active:scale-[0.99] transition-all flex items-center justify-center gap-[10px]"
                  >
                    Update Password
                    <div className="w-[20px] h-[20px] rounded-full bg-[rgba(255,255,255,0.15)] flex items-center justify-center">
                      <ArrowRight size={11} color="white" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
