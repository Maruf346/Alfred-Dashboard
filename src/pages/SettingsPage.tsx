import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Eye, EyeOff, X, Save, Pencil, ShieldCheck, KeyRound, ArrowRight, Loader2, Camera } from "lucide-react";
import { getAdminProfile, updateAdminProfile, updateAdminProfileMultipart, changePassword } from "@/lib/api";
import { useAuth } from "@/lib/authContext";

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

function FieldValueReadonly({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div>
      {label && <FieldLabel>{label}</FieldLabel>}
      <p className="px-[14px] py-[10px] rounded-[8px] bg-[rgba(240,243,255,0.3)] border border-[rgba(207,196,197,0.15)] text-[14px] font-geist text-[#4c4546] min-h-[42px] flex items-center cursor-not-allowed select-none">
        {children}
      </p>
      <p className="text-[10px] font-geist text-[#4c4546] opacity-40 mt-[4px] px-[2px]">Email cannot be changed.</p>
    </div>
  );
}

/** Skeleton shimmer block */
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-[8px] bg-gradient-to-r from-[rgba(220,226,243,0.4)] to-[rgba(207,196,197,0.2)] animate-pulse ${className ?? ""}`}
    />
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

/** Initials avatar fallback */
function InitialsAvatar({ name, size }: { name: string; size: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div
      className="rounded-[12px] bg-[#151c27] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span className="text-white font-geist font-bold" style={{ fontSize: size * 0.27 }}>
        {initials}
      </span>
    </div>
  );
}

export default function SettingsPage() {
  const { refreshUser } = useAuth();

  // ── Profile state ──────────────────────────────────────────────────────────
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [editing, setEditing]       = useState(false);
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [bio, setBio]               = useState("");
  const [picture, setPicture]       = useState(""); // existing URL from API
  const [memberSince, setMemberSince] = useState("");

  // Draft state (only committed on save)
  const [draftName, setDraftName]   = useState("");
  const [draftBio, setDraftBio]     = useState("");
  // Staged file chosen by the user (not yet saved)
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  // Local object URL for preview (revoked on cleanup)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Security state ─────────────────────────────────────────────────────────
  const [pwOpen, setPwOpen]           = useState(false);
  const [updatingPw, setUpdatingPw]   = useState(false);
  const [currentPw, setCurrentPw]     = useState("");
  const [newPw, setNewPw]             = useState("");
  const [confirmPw, setConfirmPw]     = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Fetch profile on mount ─────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    getAdminProfile()
      .then((res) => {
        const d = res.data;
        setName(d.full_name);
        setEmail(d.email);
        setBio(d.bio ?? "");
        setPicture(d.profile_picture ?? "");
        setMemberSince(
          d.member_since
            ? new Date(d.member_since).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })
            : ""
        );
      })
      .catch(() => {
        toast.error("Failed to load profile", {
          description: "Could not fetch your profile from the server.",
          duration: 4000,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Edit handlers ──────────────────────────────────────────────────────────
  const startEdit = () => {
    setDraftName(name);
    setDraftBio(bio);
    setStagedFile(null);
    setPreviewUrl(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    // Revoke any object URL we created to free memory
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setStagedFile(null);
    setPreviewUrl(null);
    setEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Revoke previous preview
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setStagedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    // Reset the input so choosing the same file again triggers onChange
    e.target.value = "";
  };

  const clearStagedFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setStagedFile(null);
    setPreviewUrl(null);
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      let res;
      if (stagedFile) {
        // Send as multipart/form-data when a file is staged
        res = await updateAdminProfileMultipart({
          full_name: draftName,
          bio: draftBio,
          profile_picture: stagedFile,
        });
      } else {
        // No new picture — plain JSON patch
        res = await updateAdminProfile({
          full_name: draftName,
          bio: draftBio,
        });
      }
      const d = res.data;
      setName(d.full_name);
      setBio(d.bio ?? "");
      setPicture(d.profile_picture ?? "");
      // Clean up staged file
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setStagedFile(null);
      setPreviewUrl(null);
      setEditing(false);
      await refreshUser(); // sync TopNav
      toast.success("Profile saved", {
        description: "Your profile information has been updated.",
        duration: 3500,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save profile.";
      toast.error("Save failed", { description: msg, duration: 4000 });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
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

    setUpdatingPw(true);
    try {
      const res = await changePassword({
        old_password: currentPw,
        new_password: newPw,
        confirm_new_password: confirmPw,
      });

      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      setPwOpen(false);
      toast.success("Password updated", {
        description: res.message || "Your password has been changed successfully.",
        duration: 4000,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to change password.";
      toast.error("Update failed", { description: msg, duration: 4000 });
    } finally {
      setUpdatingPw(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-[24px]">

      {/* Profile Information */}
      <div className="rounded-[16px] p-[28px] sm:p-[32px]" style={cardStyle}>
        <div className="flex items-center justify-between mb-[24px]">
          <h2 className="font-bold text-[#151c27] text-[20px] sm:text-[22px] font-geist tracking-[-0.3px]">
            Profile Information
          </h2>
          {!loading && (
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
                    disabled={saving}
                    className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-[8px] border border-[rgba(207,196,197,0.5)] text-[13px] font-geist font-medium text-[#4c4546] hover:bg-[rgba(220,226,243,0.3)] transition-colors disabled:opacity-50"
                  >
                    <X size={13} strokeWidth={2} />
                    Discard
                  </button>
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-[8px] bg-[#151c27] text-[13px] font-geist font-semibold text-white hover:bg-[#1e2a38] transition-colors disabled:opacity-60"
                  >
                    {saving ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Save size={13} strokeWidth={2.5} />
                    )}
                    {saving ? "Saving…" : "Save"}
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
          )}
        </div>

        {loading ? (
          /* Skeleton */
          <div className="flex gap-[24px] sm:gap-[32px] items-start">
            <Skeleton className="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] shrink-0" />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[20px]">
              <div><Skeleton className="h-[14px] w-[60px] mb-[8px]" /><Skeleton className="h-[42px]" /></div>
              <div><Skeleton className="h-[14px] w-[80px] mb-[8px]" /><Skeleton className="h-[42px]" /></div>
              <div className="sm:col-span-2"><Skeleton className="h-[14px] w-[60px] mb-[8px]" /><Skeleton className="h-[64px]" /></div>
            </div>
          </div>
        ) : (
          <div className="flex gap-[24px] sm:gap-[32px] items-start">
            {/* Avatar with upload trigger */}
            <div className="relative shrink-0">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] rounded-[12px] overflow-hidden">
                {/* Show preview > existing picture > initials */}
                {(previewUrl ?? picture) ? (
                  <img
                    src={previewUrl ?? picture}
                    alt={draftName || name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <InitialsAvatar name={editing ? draftName || name : name} size={88} />
                )}
              </div>

              {/* Upload / change button — only in edit mode */}
              <AnimatePresence>
                {editing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 rounded-[12px] flex items-center justify-center cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                    title="Click to upload a new photo"
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-[12px] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 w-[32px] h-[32px] rounded-full bg-white/90 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={14} color="#151c27" strokeWidth={2} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fields */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[20px]">
              {/* Full Name */}
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

              {/* Email — always read-only */}
              <div>
                <AnimatePresence mode="wait">
                  {editing ? (
                    <motion.div key="email-readonly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FieldValueReadonly label="EMAIL ADDRESS">{email}</FieldValueReadonly>
                    </motion.div>
                  ) : (
                    <motion.div key="email-val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FieldLabel>EMAIL ADDRESS</FieldLabel>
                      <FieldValue>{email}</FieldValue>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Biography */}
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
                      placeholder="Tell us a bit about yourself…"
                      className="w-full px-[14px] py-[10px] rounded-[8px] bg-white border border-[rgba(207,196,197,0.4)] text-[14px] font-geist text-[#151c27] outline-none focus:border-[rgba(21,28,39,0.4)] transition-colors resize-none placeholder-[rgba(76,69,70,0.35)]"
                    />
                  ) : (
                    <motion.div key="bio-val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FieldValue>{bio || <span className="opacity-40">No biography set.</span>}</FieldValue>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Picture URL (only in edit mode)
              <AnimatePresence>
                {editing && (
                  <motion.div
                    className="sm:col-span-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {stagedFile ? (
                      <div className="flex items-center gap-[10px] px-[14px] py-[10px] rounded-[8px] bg-[rgba(220,240,220,0.4)] border border-[rgba(58,143,92,0.2)]">
                        <Camera size={13} color="#3a8f5c" strokeWidth={2} />
                        <span className="text-[13px] font-geist text-[#3a8f5c] flex-1 truncate">{stagedFile.name}</span>
                        <button onClick={clearStagedFile} className="text-[#4c4546]/50 hover:text-[#e55a5a] transition-colors">
                          <X size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-[10px] px-[14px] py-[10px] rounded-[8px] border border-dashed border-[rgba(207,196,197,0.6)] hover:border-[rgba(21,28,39,0.3)] hover:bg-[rgba(220,226,243,0.15)] transition-all text-[13px] font-geist text-[#4c4546]"
                      >
                        <Camera size={14} color="#4c4546" strokeWidth={1.8} />
                        <span>Click avatar or here to upload a new photo</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence> */}

              {/* Member Since (view only) */}
              {!editing && memberSince && (
                <div className="sm:col-span-2">
                  <FieldLabel>MEMBER SINCE</FieldLabel>
                  <FieldValue>{memberSince}</FieldValue>
                </div>
              )}
            </div>
          </div>
        )}
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
                    disabled={updatingPw}
                    className="w-full py-[13px] rounded-[8px] bg-[#151c27] text-white text-[14px] font-geist font-semibold hover:bg-[#1e2a38] active:scale-[0.99] transition-all flex items-center justify-center gap-[10px] disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {updatingPw ? (
                      <Loader2 size={16} color="white" className="animate-spin" />
                    ) : (
                      <>
                        Update Password
                        <div className="w-[20px] h-[20px] rounded-full bg-[rgba(255,255,255,0.15)] flex items-center justify-center">
                          <ArrowRight size={11} color="white" />
                        </div>
                      </>
                    )}
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
